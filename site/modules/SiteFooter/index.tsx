import { Typography } from '@components/ui'
import Link from 'next/link'
import Image from 'next/image'
import {
  PhoneIcon,
  EnvelopeIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { LogoWhite } from '@components/assets/icons/LogoWhite'
import {
  AppStoreLogo,
  Playstore,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@components/assets/icons/footer'
import EmojiAnnouncement from '@components/assets/icons/footer/emoji_announce.gif'

import ImportantNoticeData from '../ImportantNotices/importantNoticeData'
import { useState } from 'react'

const itemsHorizontal = [
  {
    icon: FacebookIcon,
    url: 'https://www.facebook.com/physicswallah',
    alt: 'Facebook',
  },
  {
    icon: InstagramIcon,
    url: 'https://www.instagram.com/physicswallah/',
    alt: 'Instagram',
  },
  {
    icon: YoutubeIcon,
    url: 'https://www.youtube.com/c/PhysicsWallah',
    alt: 'Youtube',
  },
  {
    icon: TwitterIcon,
    url: 'https://twitter.com/physicswallahap?lang=en',
    alt: 'Twitter',
  },
  {
    icon: TelegramIcon,
    url: 'https://t.me/Physics_Wallah_Official_Channel',
    alt: 'Telegram',
  },
  {
    icon: LinkedinIcon,
    url: 'https://www.linkedin.com/company/physicswallah/',
    alt: 'LinkedIn',
  },
]

// This function will scroll the window to the top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // for smoothly scrolling
  })
}

const Footer = () => {
  const handleItemClick = (url: string) => {
    window.open(url, '_blank')
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
      <div className="z-20 max-w-6xl  p-0 mx-auto sm:block hidden sticky bottom-0 text-right h-[52px] ">
        <div className="pr-3">
          <div className=" justify-around w-[284px] h-[52px]  border-[1px] border-yellow-600  border-b-0   bg-[#FFF6E5] inline-flex items-center rounded-t-xl text-lg shadow-all-round-strong overflow-hidden">
            <img
              src={EmojiAnnouncement.src}
              alt="Emoji Announcement"
              width={52}
              className="rounded-t-xl pt-1"
            />
            <Typography weight={600} variant="subHeading">
              Important Notices
            </Typography>

            <button
              className="w-[52px] flex justify-center "
              onClick={showDataModal}
              type="button"
            >
              <ChevronUpIcon width={20} height={20} onClick={showDataModal} />
            </button>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <button
          onClick={scrollToTop}
          className="h-[46px] w-[46px] bg-[#F1EFFF] shadow-xl fixed bottom-5 right-5 text-[32px] cursor-pointer rounded-full border-none"
        >
          <Image
            className=""
            src="/back-to-top.svg"
            alt=""
            width={27}
            height={27}
          />
        </button>
      </div>
      <div className="hidden md:block">
        <div className="flex justify-center flex-row items-center  py-4 gap-6 h-[72px] w-100 bg-[#F8F8F8] z-30 sticky ">
          <span>
            <ChevronUpIcon width={20} height={20} />
          </span>
          <button onClick={scrollToTop} className="">
            <Typography weight={600} variant="heading3">
              Back to top
            </Typography>
          </button>
        </div>
      </div>
      <div
        className="bg-[#1B2124] py-4 px-[16px] md:px-4 lg:px-0 static"
        id="contact"
      >
        <div className="max-w-6xl py-3 px-0 lg:px-3 grid grid-cols-12 gap-5 mx-auto">
          <div className="col-span-12 lg:col-span-4 md:col-span-12 space-y-2 flex md:justify-start justify-center sm:hidden border-[#ffffff7d] border-b-[1px] pb-6">
            <div className="md:w-80 w-full h-[84px]  border-[1px] border-[#5E6166] rounded-lg grid content-between p-2">
              <div className=" text-white flex justify-center">
                <Typography weight={600} variant="heading4">
                  Contact for support
                </Typography>
              </div>
              <div className="flex flex-inline justify-center gap-6  ">
                <span className=" text-[#B5BBC5] flex flex-inline gap-2 items-center">
                  <PhoneIcon className="w-4 h-4" />
                  <Typography weight={600} variant="small">
                    08069453538
                  </Typography>
                </span>
                <span className=" text-[#B5BBC5] flex flex-inline gap-2 items-center">
                  <EnvelopeIcon className="w-4 h-4" />
                  <Typography weight={600} variant="small">
                    marvel@pw.live
                  </Typography>
                </span>
              </div>
            </div>
          </div>
          <div className="lg:grid lg:content-between col-span-12 md:col-span-4 space-y-2  ">
            <div className="flex items-center space-x-2 text-white md:pb-0 pb-4">
              <Link href="/">
                <>
                  <img src={LogoWhite.src} className="w-[37px]" />
                  <span className="whitespace-nowrap">
                    <Typography weight={700}>Physics Wallah</Typography>
                  </span>
                </>
              </Link>
            </div>
            <div className={'flex d-md-items-end gap-5'}>
              <a
                href={`privacy-policy`}
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                <Typography weight={600} variant="small">
                  Privacy Policy
                </Typography>
              </a>

              <a
                href="terms-and-conditions"
                rel="noreferrer"
                className="text-white"
              >
                <Typography weight={600} variant="small">
                  Terms & Conditions
                </Typography>
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4  space-y-2 sm:flex lg:justify-center hidden">
            <div className="w-[344px] h-[84px] border-[1px] border-[#5E6166] rounded-lg grid content-between p-2">
              <div className=" text-white flex justify-center">
                <Typography weight={600} variant="heading4">
                  Contact for support
                </Typography>
              </div>
              <div className="flex flex-inline justify-center gap-6  ">
                <span className=" text-[#B5BBC5] flex flex-inline gap-2 items-center">
                  <PhoneIcon className="w-4 h-4" />
                  <Typography weight={600} variant="small">
                    08069453538
                  </Typography>
                </span>
                <span className=" text-[#B5BBC5] flex flex-inline gap-2 items-center">
                  <EnvelopeIcon className="w-4 h-4" />
                  <Typography weight={600} variant="small">
                    marvel@pw.live
                  </Typography>
                </span>
              </div>
            </div>
          </div>
          <div className="grid content-between md:justify-end col-span-12 md:col-span-4 space-y-2">
            <div className="whitespace-nowrap text-[#989DA5] md:block hidden">
              <Typography weight={600} variant="heading4">
                Get the PW App now
              </Typography>
            </div>
            <div className={'flex d-md-items-end gap-5'}>
              <a
                href={`https://play.google.com/store/apps/details?id=xyz.penpencil.physicswala`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={Playstore.src}
                  alt="logo"
                  className="w-full object-contain max-w-[300px]"
                  draggable={false}
                />
              </a>

              <a
                href={`https://apps.apple.com/in/app/physics-wallah/id1641443555`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={AppStoreLogo.src} alt="" />
              </a>
            </div>
          </div>

          <div></div>
        </div>
        <div className="max-w-6xl md:py-6 py-2 px-0 lg:px-3 grid grid-cols-12 gap-5 mx-auto md:border-t-[1px] md:border-[#ffffff7d] md:mt-0 -mt-4">
          <div className="flex flex-col col-span-12 sm:col-span-5 space-y-2">
            <div className="flex items-center ">
              <span className="text-sm md:text-sm  text-white font-semibold">
                Follow Us:
              </span>

              <div className="flex items-center justify-start flex-1 ml-3 gap-x-3">
                {itemsHorizontal.map((item: any, i: any) => (
                  <a
                    key={'j_' + i}
                    href={item.url}
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <img
                      src={item.icon.src}
                      alt={item.alt}
                      draggable={false}
                      className="md:mr-1"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex sm:justify-end col-span-12 sm:col-span-7 space-y-2 border-[#ffffff7d] border-t-[1px] md:border-none md:pt-0 pt-3">
            <span className="text-xs md:text-sm text-white font-semibold">
              Copyright © 2023 Physics Wallah Pvt. Ltd. All rights reserved.
            </span>
          </div>
        </div>
        {/* <div className="lg:block hidden max-w-6xl ">
          <div className="z-20 fixed bottom-0  right-[11.5%] justify-around w-[284px] h-[52px]  border-[1px] border-yellow-600  border-b-0   bg-[#FFF6E5] inline-flex items-center rounded-t-xl text-lg shadow-all-round-strong">
            <img
              src={EmojiAnnouncement.src}
              alt="Emoji Announcement"
              width={52}
              className="rounded-t-xl pt-1"
            />
            <Typography weight={600} variant="subHeading">
              Important Notices
            </Typography>

            <button
              className="w-[52px] flex justify-center "
              onClick={() => setShowModal(true)}
              type="button"
            >
              <ChevronUpIcon width={20} height={20} />
            </button>
          </div>
        </div> */}
        {showModal === true ? (
          <ImportantNoticeData closeModal={showDataModal} />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Footer
