import { useEffect, useState } from 'react'
import { Alert, Button, Typography } from '@components/ui'
import { useAuth } from '@lib/hooks/useAuth'
import { isPhoneValid, isNameValid } from '@lib/validations'
import { Layout } from './Layout'
import { TextInput } from '@components/ui/Input'
import { useRouter } from 'next/router'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

type RegisterViewProps = {
  onOTPGet: (fullName: string, mobile: string) => void
  phone: string
  name: string
}

const Register = ({ onOTPGet, name, phone }: RegisterViewProps) => {
  // Form State
  const { otpSent, error, loading, handleRegister } = useAuth()

  const [mobile, setMobile] = useState(phone)
  const [firstName, setFullName] = useState(name)
  const [username, setUsername] = useState('')

  const router = useRouter()

  useEffect(() => {
    setUsername(localStorage.getItem('username') as string)
    localStorage.removeItem('fullName')
    localStorage.removeItem('shouldRegister')
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    localStorage.setItem('username', mobile)
    e.preventDefault()
    await handleRegister(mobile, firstName)
    triggerTrackEvent.marvelRegisterNumber(mobile)
  }
  const [countryNumber, setCountryNumber] = useState(false)
  const showCountryNumber = () => {
    setCountryNumber(true)
  }

  useEffect(() => {
    if (otpSent) {
      onOTPGet(firstName, mobile)
    }
  }, [onOTPGet, otpSent])

  return (
    <Layout>
      <div className="lg:w-8/12 md:w-10/12 w-12/12  bg-white   shadow-none md:shadow-lg md:rounded-xl rounded-none">
        <form onSubmit={handleSubmit} className=" ">
          <div className=" px-6 md:pt-8 pt-0 ">
            <div className="text-center sm:block hidden">
              <Typography weight={500} variant="heading2">
                Register Now
              </Typography>
            </div>
            <div className=" md:bg-[#f8f8f8] bg-none mt-10 flex-col sm:mt-5 w-full sm:h-56 md:h-44 lg:h-36 p-4 border-[1px] border-[#efefef] rounded-lg">
              <div className="">
                <Typography weight={500} variant="subHeading">
                  Instructions to fill registration form:
                </Typography>
                <Typography weight={500} variant="small">
                  <ul className="list-disc ml-4">
                    <li>
                      Enter your mobile number and an OTP will be sent to your
                      registered mobile number.
                    </li>
                    <li>
                      OTP will be used for verification of mobile number of
                      user.
                    </li>
                    <li>
                      Use your mobile number for logging in and post login, you
                      can fill or edit your nomination form.
                    </li>
                    <li>
                      The last date for registration and nomination is 31
                      December 2023.
                    </li>
                  </ul>
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex w-full flex-col md:flex-row gap-4 p-6 ">
              <div className={'mb-4 w-full'}>
                <Typography>
                  Full Name<span className=" text-red-600 text-xl">*</span>
                </Typography>
                <TextInput
                  invalid={!isNameValid(firstName)}
                  onChange={setFullName}
                  variant={'flatlogin'}
                  placeholder={'Enter your name'}
                  value={firstName}
                />
              </div>
              <div className={'mb-4 w-full'}>
                <Typography>
                  Mobile Number<span className=" text-red-600 text-xl">*</span>
                </Typography>
                <TextInput
                  invalid={!isPhoneValid(mobile)}
                  maxLength={10}
                  onChange={setMobile}
                  variant={'flatlogin'}
                  value={mobile}
                  onClick={showCountryNumber}
                  preElement={
                    <div className="text-[16px] font-semibold bg-white pl-2 ">
                      {countryNumber === true ? (
                        <select className=" border-none bg-transparent select-arrow-mob">
                          <option value="india">IN +91</option>
                        </select>
                      ) : (
                        ''
                      )}
                    </div>
                  }
                  placeholder={'Enter your mobile number'}
                />
                {error && (
                  <div className="animated fadeIn flex gap-2 my-2">
                    <img src="/warning.svg" alt="warning" height="12px" />
                    <span className=" text-xs leading-4 font-semibold text-[#c5292a]">
                      {error?.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" w-full md:mt-20 mt-32  border-t-[1px] border-[#D9DCE1] h-2"></div>
          <div className="flex justify-center pb-5 pt-4">
            <Button
              size="large"
              type="submit"
              loading={loading}
              disabled={!isNameValid(firstName) || !isPhoneValid(mobile)}
              className="w-80 md:h-14 h-12  font-bold "
            >
              <Typography weight={700} variant="heading4">
                Register
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Register
