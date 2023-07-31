import { useEffect, useState } from 'react'
import { Button, Typography } from '@components/ui'
import { useUI } from '@components/ui/context'
import { useAuth } from '@lib/hooks/useAuth'
import { isOTPValid } from '@lib/validations'
import OtpInput from 'react-otp-input'
import s from '@styles/auth/auth.module.css'
import { useRouter } from 'next/router'
import p from '@modules/Screens/components.module.css' // TODO - Changes module to tailwind
import { Layout } from '@modules/Screens/Login/Layout'
import { LogoMarvels } from '@components/assets/icons/LogoMarvels'
import Link from 'next/link'
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

const OTPView = ({ onReset }: { onReset: any }) => {
  const [navigating, setNavigating] = useState(false)
  const [username, setUsername] = useState('')
  const [canResend, setCanResend] = useState(false)
  const [_otp, _setOtp] = useState('')
  const { resendOTP, reset, handleLogin, error, loading } = useAuth()
  const { user } = useUI()
  const router = useRouter()

  useEffect(() => {
    setUsername(localStorage.getItem('username') as string)
  }, [])

  useEffect(() => {
    if (user) {
      setNavigating(true)

      triggerTrackEvent.marvelLoginSuccess(username)

      router.replace('/profile-details')
    }
  }, [user])

  const handleSubmit = async () => {
    setNavigating(false)
    handleLogin(_otp, username)
  }

  const handleOnChange = (o: string) => {
    _setOtp(o)
  }
  return (
    <>
      <div className="p-2 shadow xl:hidden">
        <nav className="bg-white flex w-full items-center p-1 ">
          <Link href="/">
            <img src={LogoMarvels.src} alt="LogoMarvels" draggable={false} />
          </Link>
        </nav>
      </div>
      <Layout>
        <div className="lg:px-0 lg:w-7/12  sm:w-full mx-auto w-full px-5  sm:px-4">
          <div className={'flex-1 flex flex-col justify-center px-3'}>
            <div className="flex flex-col mb-6">
              <div className={p.login_otp_heading}>
                Please enter your <strong>OTP</strong>
              </div>
              <div className={p.login_otp_subheading}>
                A 6 digit OTP has been sent to{' '}
                <strong>{`+91 ${username}`}</strong>
                <div
                  onClick={() => {
                    reset()
                    onReset()
                  }}
                ></div>
              </div>

              <a className={p.login_otp_change} href="/login">
                Change Number
              </a>
            </div>
          </div>

          <div className="flex flex-col space-b-3">
            <div className={'flex justify-center'}>
              <OtpInput
                inputStyle={s.inputStyle}
                focusStyle={s.focusStyle}
                shouldAutoFocus
                isInputNum
                value={_otp}
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

            <Button
              type="button"
              onClick={handleSubmit}
              loading={loading || navigating}
              disabled={!isOTPValid(_otp)}
              className="w-full md:h-14 h-12  font-bold "
            >
              Login
            </Button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default OTPView
