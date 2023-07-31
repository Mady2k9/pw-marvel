import { useEffect, useState } from 'react'
import { Alert, Button, Typography } from '@components/ui'
import { useUI } from '@components/ui/context'
import { useAuth } from '@lib/hooks/useAuth'
import { isOTPValid } from '@lib/validations'
import { Layout } from './Layout'
import OtpInput from 'react-otp-input'
import s from '@styles/auth/auth.module.css'
import { useRouter } from 'next/router'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

const ResendOTP = ({ canResend, setCanResend, resendOTP }: any) => {
  const [counter, setCounter] = useState(30)
  const reduceCounter = () => {
    if (counter === 1) {
      setCanResend(true)
    }
    setCounter(counter - 1)
  }
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        reduceCounter()
      }, 1000)
    }
  }, [counter])

  useEffect(() => {
    reduceCounter()
  }, [])
  if (canResend)
    return (
      <Button
        className=" underline"
        type="button"
        variant="naked"
        onClick={() => {
          resendOTP()
          setCounter(30)
          setCanResend(false)
          setTimeout(() => {
            reduceCounter()
          }, 1000)
        }}
      >
        Resend OTP
      </Button>
    )
  return (
    <Typography>
      Resend OTP in{' '}
      <strong className="text-[14px] leading-[22px] text-[#da4b4b]">
        00:{String(counter).padStart(2, '0')}
      </strong>
    </Typography>
  )
}
const RegOtpView = ({ onReset }: { onReset: any }) => {
  const [mobile, setMobile] = useState('')
  const [canResend, setCanResend] = useState(false)
  const [otp, setOtp] = useState('')
  const { resendOTP, reset, handleLogin, error, loading } = useAuth()
  const { user } = useUI()
  const router = useRouter()

  useEffect(() => {
    // TODO - Should come from the query params
    setMobile(localStorage.getItem('username') as string)
  }, [])

  const handleSubmit = async () => {
    //setNavigating(false)
    const success = await handleLogin(otp, mobile)
    if (success) {
      triggerTrackEvent.marvelRegisterSuccess(mobile)

      router.push('profile-details')
    }
  }

  const handleOnChange = (val: string) => {
    setOtp(val)
  }

  return (
    <Layout>
      <div className="bg-white h-[568px] md:w-[445px] sm:w-full mx-auto w-full px-5  sm:px-4 shadow-none md:shadow-lg md:rounded-xl rounded-none ">
        <div className="flex justify-center">
          <img src="/computer-otp.gif" alt="" width={174} />
        </div>
        <div className={'flex justify-center px-3'}>
          <div className="mb-6 text-center">
            <Typography variant="heading4" weight={600}>
              Verification
            </Typography>
            <Typography>Enter the OTP sent on your phone number</Typography>
            <div className="inline-flex items-center gap-2">
              <Typography weight={600}>{`+91 ${mobile}`} </Typography>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  console.log('reset clicked 3')
                  onReset()
                }}
              >
                <img src="/edit.svg" alt="edit-number" />
              </a>
              <div
                onClick={() => {
                  reset()
                  onReset()
                }}
              ></div>
            </div>
            <div
              onClick={() => {
                reset()
                onReset()
              }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col space-b-3">
          <div className=" text-center">
            <Typography variant="tiny"></Typography>
            Please enter the verification code below.
          </div>
          <div className={'flex justify-center'}>
            <OtpInput
              inputStyle={s.inputStyle}
              focusStyle={s.focusStyle}
              shouldAutoFocus
              isInputNum
              value={otp}
              onChange={handleOnChange}
              numInputs={6}
              separator={<span> </span>}
            />
          </div>
          <div className="flex justify-center pb-4">
            {error && (
              <div className="animated fadeIn flex gap-2 my-2">
                <img src="/warning.svg" alt="warning" height="12px" />
                <span className=" text-xs leading-4 font-semibold text-[#c5292a]">
                  {error?.message}
                </span>
              </div>
            )}
          </div>
          <div className={'mb-10 mx-auto '}>
            <ResendOTP
              resendOTP={() => {
                resendOTP()
              }}
              canResend={canResend}
              setCanResend={setCanResend}
            />
          </div>

          <div className="text-center">
            <Button
              type="button"
              onClick={handleSubmit}
              loading={loading}
              disabled={!isOTPValid(otp)}
              size="large"
              className="w-[148px]"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default RegOtpView
