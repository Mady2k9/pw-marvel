import { useEffect, useState } from 'react'
import { Alert, Button } from '@components/ui'
import { useAuth } from '@lib/hooks/useAuth'
import { isNameValid, isPhoneValid } from '@lib/validations'
import { TextInput } from '@components/ui/Input'
import { useRouter } from 'next/router'
import s from '@modules/Screens/components.module.css' // TODO - Changes module to tailwind
//import { Layout } from '@modules/screens/Login/Layout'
import { Layout } from './Layout'
import { LogoMarvels } from '@components/assets/icons/LogoMarvels'
import Link from 'next/link'

const Login = ({ onOTPGet }: { onOTPGet: any }) => {
  // Form State
  const [fullName, setFullName] = useState('')
  const { handleGenerateOTP, handleRegister, otpSent, error, loading } =
    useAuth()
  const [username, setUsername] = useState('')
  const [shouldRegister, setShouldRegister] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setUsername(localStorage.getItem('username') as string)
    localStorage.removeItem('fullName')
    localStorage.removeItem('shouldRegister')
  }, [])

  const [agree, setAgree] = useState(false)
  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (shouldRegister) {
      await handleRegister({
        firstName: localStorage.getItem('fullName')?.split(' ')?.[0],
        lastName: localStorage.getItem('fullName')?.split(' ')?.[1] || '',
        mobile: username,
      })
    } else {
      const response = await handleGenerateOTP(username)
      if (!response) {
        setShouldRegister(true)
        localStorage.setItem('shouldRegister', 'true')
      }
    }
  }

  useEffect(() => {
    if (otpSent) {
      onOTPGet(shouldRegister)
    }
  }, [onOTPGet, otpSent, shouldRegister])

  useEffect(() => {
    setShouldRegister(false)
    localStorage.removeItem('fullName')
    localStorage.removeItem('shouldRegister')
  }, [username])

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
        <form
          onSubmit={handleSubmit}
          className="lg:px-0 lg:w-7/12  sm:w-full mx-auto w-full px-5  sm:px-4"
        >
          <div className="">
            <div className={s.login_right_heading}>Login</div>
            <div className={s.login_right_subheading}>
              Registered Mobile Number
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="mb-8">
              <TextInput
                invalid={!isPhoneValid(username)}
                maxLength={10}
                onChange={(e: any) => {
                  setUsername(e)
                  localStorage.setItem('username', e)
                }}
                variant={'outlined'}
                placeholder={'Enter your Registered Mobile Number'}
              />

              {
                <div
                  className={` animated fadeIn flex gap-2 my-2  ${
                    shouldRegister ? '' : 'hidden'
                  }`}
                >
                  <img src="/warning.svg" alt="warning" height="12px" />
                  <span className={s.warning}>
                    This number is not registerd, please register it first.
                  </span>
                </div>
              }
            </div>
            {error && <Alert message={error} type="error" />}
            <Button
              type="submit"
              loading={loading}
              disabled={
                !isPhoneValid(username) ||
                ((!agree || !isNameValid(fullName)) && shouldRegister)
              }
              className="w-full md:w-[432px] md:h-14 h-12  font-bold "
            >
              Get OTP
            </Button>
            <div className="flex mx-auto pt-[25px] gap-8">
              <div className={s.have_acount}>Don’t have an account?</div>
              <a href="/register" className={s.register_now}>
                Register Now
              </a>
            </div>
          </div>
        </form>
      </Layout>
    </>
  )
}

export default Login
