import React, { useEffect } from 'react'
import s from './content.module.css'
import Image from 'next/image'
import { Button, Typography } from '@components/ui'
import Container from '@components/ui/Container/Container'
import { Select } from '@components/ui'
import { TextInput } from '@components/ui'

export interface contentProps {}

const content: React.FC<contentProps> = (props) => {
  useEffect(() => {
    const user = localStorage.getItem('user')
  }, [])

  return (
    <div className="w-full bg-white overflow-y-scroll">
      <div className=" flex justify-center">
        <div className="md:bg-[#F8F8F8] w-full md:w-[90%] lg:w-[85%] h-fit  rounded-b-xl lg:p-3 items-center relative">
          <div className="p-3 flex my-[7px]">
            <div className={s.left_section_text}>Registration Date:</div>
            <div className={s.right_section_text}>14 May 2023</div>
          </div>
          <div className="w-full  px-3 py-4  flex  lg:rounded-xl bg-[#F8F8F8] md:bg-white items-center ">
            <div className=" text-base md:text-lg font-bold ">
              Personal Information
            </div>
            <div className={s.alert}>&nbsp;(*Mandatory Fields)</div>
          </div>
          <div className="w-full h-fit p-4 flex">
            <div className={s.left_section_text}> Full name of Applicant:</div>
            <div className={s.right_section_text}> John Snow</div>
          </div>

          <div className="w-full h-fit p-4 flex">
            <div className={s.left_section_text}>
              Class<span className={s.alert}>*</span>:
            </div>
            <div className={s.right_section_text}>
              <Select
                className=""
                onChange={function noRefCheck() {}}
                options={[
                  {
                    id: 1,
                    name: 'Class 8th',
                  },
                  {
                    id: 2,
                    name: 'Class 9th',
                  },
                  {
                    id: 3,
                    name: 'Class 10th',
                  },
                  {
                    id: 3,
                    name: 'Class 11th',
                  },
                ]}
                placeholder="Select Class"
                shadow
                withTarget
              />
              <div className="md:p-1 flex md:flex-none">
                <div className="px-1 py-[2px] md:p-1 md:pt-[2px]">
                  <img className="" src="/i.svg" alt="icon" />
                </div>
                <div className="text-[12px] align-middle text-[#3D3D3D]">
                  Class can’t be changed once details are submitted
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-fit p-4 flex">
            <div className={s.left_section_text}> Alternative Mobile No.:</div>
            <div className={s.right_section_text}>
              {' '}
              <div className="w-full rounded-md bg-white">
                <TextInput
                  action={{
                    disabled: true,
                    loading: false,
                    onAction: function noRefCheck() {},
                    text: '',
                  }}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="  w-[328px] h-[48px] bg-white"
                  id="text-input-1"
                  label="Mobile Number"
                  onChange={function noRefCheck() {}}
                  placeholder="Enter Text"
                  preElement={
                    <div className="text-[16px] font-semibold bg-white  p-2 m-auto">
                      <select className=" border-none bg-transparent">
                        <option value="india">IN +91</option>
                      </select>
                    </div>
                  }
                  setRef={function noRefCheck() {}}
                  spellCheck="false"
                  variant="flat"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-fit p-4 flex">
            <div className={s.left_section_text}> Email address:</div>
            <div className={s.right_section_text}>
              {' '}
              <div className=" w-full bg-white rounded-md ">
                <TextInput
                  action={{
                    disabled: true,

                    loading: false,
                    onAction: function noRefCheck() {},
                    text: '',
                  }}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className=""
                  id="text-input-1"
                  label="Email id"
                  variant="flat"
                  onChange={function noRefCheck() {}}
                  placeholder="Enter Text"
                  preElement={[]}
                  setRef={function noRefCheck() {}}
                  spellCheck="false"
                />
              </div>
            </div>
          </div>

          <div className="w-full p-4 fixed bottom-0 md:hidden">
            <Button
              Component="PW"
              postIcon={[]}
              preIcon={[]}
              variant="primary"
              type="submit"
              className="w-full h-full "
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default content
