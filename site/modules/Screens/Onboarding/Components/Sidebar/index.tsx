import React, { useMemo, useState } from 'react'
import s from './sidebar.module.css'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'
import { Cross } from '@components/icons'
import { deleteAllCookies } from '@lib/user-utility'
import { useUI } from '@components/ui'
import { useMarvelContext } from '@modules/MarvelContext'
import cn from 'clsx'

export interface sidebarProps {
  name: string
  phone: string
  email: string
  closeModal: any
  navBarText: string
  isRegistrationEnded: boolean
}

export enum MARVEL_ROUTES {
  PROFILE_DETAILS = '/profile-details',
  NOMINATION_FORM = '/nomination-form',
  UPLOAD_DOCUMENT = '/upload-document',
  NOMINATE_FORM = '/nomination-form',
}

export const REDIRECTION_DATA = [
  {
    buttonText: 'Go to profile details',
    router: MARVEL_ROUTES.PROFILE_DETAILS,
  },
  {
    buttonText: 'Go to Nomination form',
    router: MARVEL_ROUTES.NOMINATE_FORM,
  },
  {
    buttonText: 'Go to Upload details',
    router: MARVEL_ROUTES.UPLOAD_DOCUMENT,
  },
]

const Sidebar: React.FC<sidebarProps> = (props) => {
  const { name, phone, email, closeModal, navBarText, isRegistrationEnded } =
    props
  const router = useRouter()
  const [isRedirectionModalOpen, setIsRedirectionModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [redirectionData, setRedirectionData] = useState(REDIRECTION_DATA[0])
  const { handleUserUpdated } = useUI()
  const { completedStepTill } = useMarvelContext()

  const isProfileDetailsRoute = useMemo(
    () => router.pathname === MARVEL_ROUTES.PROFILE_DETAILS,
    [router]
  )
  const isNominationFormRoute = useMemo(
    () => router.pathname === MARVEL_ROUTES.NOMINATION_FORM,
    [router]
  )
  const isUploadDocRoute = useMemo(
    () => router.pathname === MARVEL_ROUTES.UPLOAD_DOCUMENT,
    [router]
  )

  // const [nominateAgain, setNominateAgain] = useState(false)

  const handleClickNotice = () => {
    closeModal()
  }

  const toggleModal = () => {
    setIsRedirectionModalOpen(false)
    setIsLogoutModalOpen(false)
  }

  const logoutHandler = () => {
    setIsLogoutModalOpen(true)
  }
  const logOutComplete = () => {
    localStorage.clear()
    deleteAllCookies()
    handleUserUpdated()
    setTimeout(() => {
      router.push('/')
    })
    /*  router.push('/') */
  }

  const handleStepsClasses = (step: number, currentActive: boolean) => {
    switch (step) {
      case 1:
        return step <= completedStepTill
          ? s.step_text_complete
          : s.step_text_active
      case 2:
        return step <= completedStepTill
          ? s.step_text_complete
          : currentActive
          ? s.step_text_active
          : s.step_text_disabled
      case 3:
        return step === completedStepTill
          ? s.step_text_complete
          : currentActive
          ? s.step_text_active
          : s.step_text_disabled
    }
  }

  return (
    <>
      <div className="sm:w-[235px] z-40 flex pt-4 sm:justify-center w-full">
        <div className={s.mainContainer}>
          <div className={s.container}>
            <img
              className="mx-auto"
              src="/user_profile.svg"
              alt="user profile"
            />
            <p className="text-[16px] ">{name}</p>
            {email?.length > 0 && (
              <div className="flex justify-center items-center">
                <span className="stroke-black">
                  <img className="mr-2" src="/email.svg" alt="email" />
                </span>

                <p className="text-[12px] text-[#757575]">{email}</p>
              </div>
            )}
            <div className="flex justify-center items-center">
              <span className="stroke-black">
                <img className="mr-2" src="/phone.svg" alt="phone" />
              </span>
              <p className="text-[12px] text-[#757575]">{phone}</p>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-center sm:pb-0 pb-4">
            <div className="flex sm:flex-col flex-row sm:order-2 sm:gap-0 gap-3">
              <div className="mb-2 sm:text-left text-center">
                <span className={handleStepsClasses(1, isProfileDetailsRoute)}>
                  Step 1
                </span>
                <div
                  className={`${s.icon_container} ${
                    isProfileDetailsRoute ? s.icon_container_active : ''
                  }`}
                  onClick={() => {
                    if (
                      isRegistrationEnded ||
                      (completedStepTill === 3 &&
                        (navBarText === 'Edit' || isUploadDocRoute))
                    ) {
                      router.push('/profile-details')
                    } else if (!isProfileDetailsRoute) {
                      setIsRedirectionModalOpen(true)
                      setRedirectionData(REDIRECTION_DATA[0])
                    }
                  }}
                >
                  <img className={s.step_img} src="/step_1c.svg" alt="step1" />
                  <span className={s.step_icon_text}>Profile Details</span>
                </div>
              </div>

              <div className="mb-2 sm:text-left text-center">
                <span className={handleStepsClasses(2, isNominationFormRoute)}>
                  Step 2
                </span>
                <div
                  className={`${s.icon_container} ${
                    isNominationFormRoute
                      ? s.icon_container_active
                      : completedStepTill < 2
                      ? s.icon_container_disabled
                      : ''
                  }`}
                  onClick={() => {
                    if (
                      isRegistrationEnded ||
                      (completedStepTill === 3 &&
                        (navBarText === 'Edit' || isUploadDocRoute))
                    ) {
                      router.push('/nomination-form')
                    } else if (
                      !isNominationFormRoute &&
                      completedStepTill >= 2
                    ) {
                      setRedirectionData(REDIRECTION_DATA[1])
                      setIsRedirectionModalOpen(true)
                    }
                  }}
                >
                  <img
                    className={s.step_img}
                    src={`${
                      completedStepTill < 2 && !isNominationFormRoute
                        ? '/step_2g.svg'
                        : '/step_2c.svg'
                    }`}
                    alt="step2"
                  />
                  <p
                    className={`${s.step_icon_text}  ${
                      completedStepTill < 2 && !isNominationFormRoute
                        ? s.text_disabled
                        : ''
                    }`}
                  >
                    Nomination Form
                  </p>
                </div>
              </div>

              <div className="mb-2 sm:text-left text-center">
                <span
                  className={handleStepsClasses(3, isUploadDocRoute)}
                  onClick={() => {}}
                >
                  Step 3
                </span>
                <div
                  className={`${s.icon_container} ${
                    isUploadDocRoute
                      ? s.icon_container_active
                      : completedStepTill !== 3
                      ? s.icon_container_disabled
                      : ''
                  }`}
                  onClick={() => {
                    if (
                      isRegistrationEnded ||
                      (completedStepTill === 3 && navBarText === 'Edit')
                    ) {
                      router.push('/upload-document')
                    } else if (!isUploadDocRoute && completedStepTill === 3) {
                      setRedirectionData(REDIRECTION_DATA[2])
                      setIsRedirectionModalOpen(true)
                    }
                  }}
                >
                  <img
                    className={s.step_img}
                    src={
                      completedStepTill !== 3 && !isUploadDocRoute
                        ? '/step_3g.svg'
                        : '/step_3c.svg'
                    }
                    alt="step3"
                  />
                  <p
                    className={`${s.step_icon_text} ${
                      completedStepTill !== 3 && !isUploadDocRoute
                        ? s.text_disabled
                        : ''
                    }`}
                  >
                    Upload Documents
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-2 sm:order-1">
              <div className="flex sm:flex-col flex-row items-center">
                <img
                  src={1 <= completedStepTill ? '/dot-d.svg' : '/dot-a.svg'}
                  alt="dot"
                />
                <div
                  className={cn(
                    `sm:w-[2px] sm:h-[60px] h-[2px]  w-[98px] ${
                      1 <= completedStepTill ? 'bg-[#1B7938]' : 'bg-[#C1C6CE]'
                    } inline-block`
                  )}
                ></div>
                <img
                  src={
                    2 <= completedStepTill
                      ? '/dot-d.svg'
                      : router?.pathname === '/nomination-form'
                      ? '/dot-a.svg'
                      : '/dot-g.svg'
                  }
                  alt="dot"
                />
                <div
                  className={cn(
                    `sm:w-[2px] sm:h-[60px] h-[2px]  w-[98px] ${
                      2 <= completedStepTill ? 'bg-[#1B7938]' : 'bg-[#C1C6CE]'
                    } inline-block`
                  )}
                ></div>
                <img
                  src={
                    completedStepTill === 3
                      ? '/dot-d.svg'
                      : router?.pathname === '/upload-document'
                      ? '/dot-a.svg'
                      : '/dot-g.svg'
                  }
                  alt="dot"
                />
              </div>
            </div>
          </div>
          <div className="mt-[20%] w-[235px] sm:block hidden">
            <div className=" ml-8 flex  ">
              <img
                className="w-[48px] "
                src="/profile_ani.gif"
                alt="animated"
              />
              <p
                onClick={handleClickNotice}
                className=" text-[#3D3D3D] self-center cursor-pointer"
              >
                Important Notices
              </p>
            </div>
            <hr className={s.linecss} />
            <div
              className="flex justify-center cursor-pointer"
              onClick={logoutHandler}
            >
              <span className={s.logoutHidden}>
                <img
                  className="mt-1 mr-2 w-[20px]"
                  src="/log_outp.svg"
                  alt="log out"
                />
              </span>
              <p className={s.logout_text}>Log Out</p>
            </div>
          </div>
        </div>

        {isRedirectionModalOpen ? (
          <>
            <div className="opacity-5 fixed inset-0 z-40 bg-[#414347] "></div>
            <Dialog
              className={'relative z-[999999]'}
              open={isRedirectionModalOpen}
              onClose={toggleModal}
            >
              <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
              <div className="fixed inset-0 flex md:items-center items-end justify-center md:p-4 ">
                <Dialog.Panel className="mx-auto w-full md:max-w-[480px] md:max-h-[212px]  md:rounded-xl rounded-t-2xl bg-white ring-0 transition-all p-5 md:pt-5 pt-0 relative">
                  <div
                    className="cursor-pointer absolute md:top-4 -top-10 md:bg-white  bg-slate-100 p-1 rounded-full md:right-4 right-[46%]"
                    onClick={toggleModal}
                  >
                    <span className=" ">
                      <Cross className="h-6 w-6 " />
                    </span>
                  </div>
                  <div className="text-center mx-2 mb-2">
                    <div className="flex justify-center pt-2 pb-4 md:hidden sm:block">
                      <span className=" bg-slate-300 h-1 w-9 rounded-xl"></span>
                    </div>
                    <p className="font-bold text-[20px] ">
                      Going to previous step?
                    </p>
                    <p className="text-[16px] mt-[20px]">
                      Are you sure you want to go back without completing this
                      step?{' '}
                    </p>
                  </div>
                  <div className="flex justify-center mt-6  md:text-base text-[14px] font-[600px]">
                    <button
                      onClick={() => router.push(redirectionData?.router)}
                      className="w-[208px] h-[48px] outline-none border border-[#5A4BDA] rounded-md text-[#5A4BDA]"
                    >
                      {redirectionData?.buttonText}
                    </button>

                    <button
                      onClick={toggleModal}
                      className="w-[208px] h-[48px] border ml-6 bg-[#5A4BDA] text-white rounded-md"
                    >
                      Save it First
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          </>
        ) : (
          ''
        )}
        {isLogoutModalOpen ? (
          <>
            <div className="opacity-25 fixed inset-0 z-40 bg-[#414347] "></div>
            <Dialog
              className={'relative z-[999999]'}
              open={isLogoutModalOpen}
              onClose={toggleModal}
            >
              <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4 ">
                <Dialog.Panel className="mx-auto w-full max-w-[480px] max-h-[212px] rounded-xl bg-white ring-1 transition-all p-5 relative">
                  <div
                    className="cursor-pointer absolute top-4 right-4"
                    onClick={toggleModal}
                  >
                    <Cross className="h-6 w-6" />
                  </div>
                  <div className="text-center m-2">
                    <p className="font-bold text-[20px] ">
                      Are you sure you want to Logout?
                    </p>
                  </div>
                  <div className="flex justify-center mt-6 text-[16px] font-[600px]">
                    <button
                      onClick={logOutComplete}
                      className="w-[208px] h-[48px] border border-[#5A4BDA] rounded-md text-[#5A4BDA]"
                    >
                      Yes
                    </button>

                    <button
                      onClick={toggleModal}
                      className="w-[208px] h-[48px] border ml-6 bg-[#5A4BDA] text-white rounded-md"
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Sidebar
