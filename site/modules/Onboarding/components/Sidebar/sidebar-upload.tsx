import React, { useState } from 'react'
import s from './sidebar.module.css'
import { useRouter } from 'next/router'
import ImportantNoticeData from '@modules/ImportantNotices/importantNoticeData'

export interface sidebarProps {
  name: string
  phone: string
}

const Sidebar: React.FC<sidebarProps> = ({ name, phone }) => {
  const router = useRouter()
  var link = '/nomination-form'
  const [nominatePageAgain, setNominatePageAgain] = useState(false)

  const goToNominatePage = () => {
    setNominatePageAgain(true)
  }
  const areYouSureGoTonominate = () => {
    router.push(link)
  }
  const stayOnThisPage = () => {
    setNominatePageAgain(false)
  }
  const [show, setShow] = useState(false)
  const openImportantNotices = () => {
    setShow(!show)
  }
  const [showModal, setShowModal] = useState(false)
  const showDataModal = () => {
    console.log('show modal fire', showModal)
    setShowModal(!showModal)

    /*  if (showModal) {
      setShowModal(false)
    } */
  }
  return (
    <>
      <div className="sm:w-[235px]  flex pt-4 sm:justify-center w-full">
        <div className={s.mainContainer}>
          <div className={s.container}>
            <img
              className="mx-auto"
              src="/user_profile.svg"
              alt="user profile"
            />
            <p className="text-[16px] ">{name}</p>
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
                <span className={s.step_text_active}>Step 1</span>
                <div className={s.icon_container}>
                  <img className={s.step_img} src="/step_1c.svg" alt="step1" />
                  <span className={s.step_icon_text}>Profile Details</span>
                </div>
              </div>
              <div
                className="mb-2 sm:text-left text-center"
                onClick={goToNominatePage}
              >
                <span className={s.step_text}>Step 2</span>
                <div className={s.icon_container}>
                  <img className={s.step_img} src="/step_2c.svg" alt="step2" />
                  <p className={s.step_icon_text}>Nomination Form</p>
                </div>
              </div>

              <div className="mb-2 sm:text-left text-center">
                <span className={s.step_text}>Step 3</span>
                <div className={s.icon_container}>
                  <img className={s.step_img} src="/step_3c.svg" alt="step3" />
                  <p className={s.step_icon_text}>Upload Documents</p>
                </div>
              </div>
            </div>
            <div className="mx-2 sm:order-1">
              <div className="flex sm:flex-col flex-row items-center">
                <img src="/dot-d.svg" alt="dot" />
                <div className="sm:w-[2px]  sm:h-[60px] h-[2px]  w-[98px] bg-[#1B7938]  inline-block"></div>
                <img src="/dot-d.svg" alt="dot" />
                <div className="sm:w-[2px]  sm:h-[60px] h-[2px]  w-[98px] bg-[#1B7938]  inline-block"></div>
                <img src="/dot-a.svg" alt="dot" />
              </div>
            </div>
          </div>

          <div className="mt-[30%] w-[235px] sm:block hidden">
            <div className=" ml-8 flex  ">
              <img className="w-[48px]" src="/profile_ani.gif" alt="animated" />
              <p
                onClick={openImportantNotices}
                className=" text-[#3D3D3D] self-center"
              >
                Important Notices
              </p>
            </div>
            <hr className={s.linecss} />
            <div className="flex justify-center">
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
        {nominatePageAgain === true ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-[#414347] "></div>
        ) : (
          ''
        )}
        {nominatePageAgain === true ? (
          <div className="absolute bg-[#FFFFFF] w-[480px] h-[212px] rounded-lg top-[30%] left-[40%] z-50 text-center ">
            <div className="flex justify-center flex-col m-4">
              <p className="font-bold text-[20px] mt-2 ">
                Going to previous step?
              </p>
              <p className="text-[16px] font-medium mt-6">
                Are you sure you want to go back without completing this step?{' '}
              </p>
            </div>
            <div className="flex justify-center mt-6 text-[16px] font-semibold">
              <button
                onClick={areYouSureGoTonominate}
                className="w-[208px] h-[48px] border border-[#5A4BDA] rounded text-[#5A4BDA]"
              >
                Go to Nomination Form
              </button>
              <button
                onClick={stayOnThisPage}
                className="w-[208px] h-[48px] ml-6 bg-[#5A4BDA] text-white rounded"
              >
                Save it First
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {show === true ? <ImportantNoticeData closeModal={showDataModal} /> : ''}
    </>
  )
}

export default Sidebar
