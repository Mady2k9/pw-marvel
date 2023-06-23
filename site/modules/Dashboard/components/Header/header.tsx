import React from 'react'
import s from './header.module.css'
import Image from 'next/image'
import { Button, Typography } from '@components/ui'
import Container from '@components/ui/Container/Container'
export interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title } = props
  return (
    <>
      <div className="sticky top-0 sm:h-[80px] h-[60px] items-center bg-white z-20 shadow-lg flex">
        <div className="sm:w-[235px] sm:h-[80px] h-[60px] flex p-4 sm:justify-center sm:border-r">
          <a href="#" className="my-auto">
            <div className="flex items-center">
              <div className="sm:w-[45px] w-[24px] ">
                <img src="/logo.svg" alt="PW Logo" />
              </div>
              <div className="ms-2 sm:ms-0 text-[16px] md:text-[18px] lg:text-[22px] font-[600]">
                Marvels
              </div>
            </div>
          </a>
        </div>

        <div className="w-10/12 ">
          <div className="flex py-4 w-10/12 justify-between mx-auto">
            <div className="text-[24px] font-[600] my-auto leading-[32px] hidden sm:block">
              {title}
            </div>
            <div className="hidden sm:block">
              <button className=" bg-[#D2CCFF] hover:bg-[#5A4BDA] md:h-[40px] text-center text-white rounded-md md:w-[90px] ">
                Submit
              </button>
            </div>
            <div className=" flex w-[142px] h-[32px] m-auto sm:hidden ">
              <button className="w-[66px] h-full bg-white border-[1px] rounded-md text-[12px] font-semibold mx-1">
                Notice
              </button>
              <button className="w-[76px] h-full bg-white border-[1px] rounded-md text-[12px] p-1 font-semibold flex justify-center items-center">
                <div className="mt-1 mx-[2px]">
                  <Image src="" height={11} width={11} />
                </div>
                <p>Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
