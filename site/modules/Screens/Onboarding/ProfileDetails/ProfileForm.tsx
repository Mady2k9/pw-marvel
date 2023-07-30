import React, { useEffect, useMemo, useState } from 'react'
import s from '@modules/Screens/components.module.css'
import { Button, useUI } from '@components/ui'
import { Select } from '@components/ui'
import { TextInput } from '@components/ui'
import { CLASSES, CLASSES_ARRAY, CLASS_MAP } from '@config/types/classes'
import { StudentDataProps } from './types'
import { addSuffixToNumber } from '@utils/helps'
import cn from 'clsx'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

export interface ProfileFormProps {
  studentData: StudentDataProps
  setProfileData: (val: any) => void
  setSelectedClass: (val: string) => void
  registrationDate: string
  isEditEnabled: boolean
  navBarText: string
  handleSubmitForm?: () => void // TODO - remove optional chaining
  handleEditForm: (navBarText: string) => void
  hideSubmitButton?: boolean
  shouldSubmitDisabled: boolean
  isEmailValid: boolean
  isPhoneValid: boolean
  setIfEmailIsValid: (val: any) => void
  setIfPhoneIsValid: (val: any) => void
}

const Content = ({
  studentData,
  setProfileData,
  setSelectedClass,
  registrationDate,
  isEditEnabled,
  navBarText,
  handleSubmitForm,
  handleEditForm,
  hideSubmitButton = false,
  shouldSubmitDisabled,
  isEmailValid,
  isPhoneValid,
  setIfEmailIsValid,
  setIfPhoneIsValid,
}: ProfileFormProps) => {
  const onClassChange = (classVal: string) => {
    setSelectedClass(classVal)
    // setProfileData({ ...studentData, class: classVal })
  }

  const { user } = useUI()
  const [countryNumber, setCountryNumber] = useState(false)
  const showCountryNumber = () => {
    setCountryNumber(true)
  }

  const shouldDisabled = useMemo(
    () => Boolean(studentData?.class) && !isEditEnabled,
    [isEditEnabled, studentData]
  )
  useEffect(() => {
    // console.log('button name', navBarText)
    const formVisitData = {
      source: '',
      campaign: '',
      medium: '',
      profile_details: '', //navBarText ? 'submitted' : 'not_submitted',
      form_name: 'profile_details',
    }
    triggerTrackEvent.marvelFormVisit(formVisitData)
  }, [])
  return (
    <div className="w-full bg-white overflow-y-scroll z-0">
      <div className=" flex justify-center">
        <div className="md:bg-[#F8F8F8] w-full md:w-[90%] lg:w-[85%] h-fit  rounded-b-xl lg:p-3 items-center relative">
          <div className="p-3 flex my-[7px]">
            <div className={s.left_section_text}>Registration Date:</div>
            <div className={s.right_section_text}>{registrationDate}</div>
          </div>
          <div className="w-full  px-3 py-4 flex lg:rounded-xl bg-[#F8F8F8] md:bg-white items-center ">
            <div className=" text-base md:text-lg font-bold ">
              Personal Information
            </div>
            <div className={s.alert}>&nbsp;(*Mandatory Fields)</div>
          </div>
          <div className="w-full h-fit p-4 flex">
            <div className={s.left_section_text}>Full name of Applicant:</div>
            <div className={s.right_section_text}>{studentData.name}</div>
          </div>
          <div className="w-full h-fit p-4 flex sm:flex-row flex-col">
            <div className={s.left_section_text}>
              Class<span className={s.alert}>*</span>:
            </div>
            <div className={s.right_section_input}>
              {studentData.class ? (
                <>
                  <div className="flex flex-wrap w-[300px]">
                    <div className="mr-3">
                      {CLASS_MAP[studentData?.class as CLASSES]}
                    </div>
                    <div className="flex mt-1">
                      <div className="px-1  pt-1 py-auto md:p-1 md:pt-[2px]">
                        <img className="" src="/i.svg" alt="icon" />
                      </div>
                      <div className="text-[12px] py-auto align-middle text-[#3D3D3D]">
                        {studentData.class
                          ? `Class can't be changed now`
                          : 'Class can’t be changed once details are submitted'}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Select
                    value={studentData?.class}
                    onChange={onClassChange}
                    options={CLASSES_ARRAY}
                    placeholder="Select Class"
                  />
                  <div className="p-1 flex md:flex-none">
                    <div className="pr-1 py-[2px] md:pr-1 md:pt-[2px]">
                      <img
                        className="mt-[2px]"
                        src="/i.svg"
                        alt="icon"
                        width="14px"
                      />
                    </div>
                    <div className="text-[12px] align-middle text-[#3D3D3D] w-[310px]">
                      {studentData.class
                        ? 'Class cant be changed now '
                        : 'Class can’t be changed once details are submitted'}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full h-fit p-4 flex sm:flex-row flex-col">
            <div className={s.left_section_text}>Alternative Mobile No.:</div>
            <div className={s.right_section_input}>
              <div className="w-full rounded-md bg-white">
                <TextInput
                  label={
                    isEditEnabled && studentData.alternateNumber
                      ? 'Mobile Number'
                      : ''
                  }
                  invalid={!isPhoneValid}
                  onChange={(mobileNumber) => {
                    //setIfPhoneIsValid(true)
                    setProfileData({
                      ...studentData,
                      alternateNumber: mobileNumber,
                    })
                  }}
                  disabled={shouldDisabled}
                  value={studentData.alternateNumber}
                  placeholder="Enter number"
                  spellCheck="false"
                  /* preElement={
                    isEditEnabled ? (
                      <div className="text-[16px] font-semibold bg-white  p-2 m-auto">
                        <select className=" border-none bg-transparent">
                          <option value="india">IN +91</option>
                        </select>
                      </div>
                    ) : null
                  } */
                  variant={shouldDisabled ? 'gray' : 'flat'}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-fit p-4 flex sm:flex-row flex-col">
            <div className={s.left_section_text}> Email address:</div>
            <div className={s.right_section_input}>
              <div className={cn('w-full bg-white rounded-md')}>
                <TextInput
                  label={isEditEnabled && studentData.email ? 'Email' : ''}
                  value={studentData.email}
                  disabled={shouldDisabled}
                  onChange={(email) => {
                    //setIfEmailIsValid(true)
                    setProfileData({ ...studentData, email: email })
                  }}
                  invalid={!isEmailValid}
                  placeholder="Email id"
                  spellCheck="false"
                  variant={shouldDisabled ? 'gray' : 'flatlogin'}
                />
              </div>
            </div>
          </div>
          {/* <div className="p-4 md:hidden">
            {
              !hideSubmitButton && (
                <Button
                  onClick={
                    navBarText === 'Edit'
                      ? () => handleEditForm(navBarText)
                      : handleSubmitForm
                  }
                  stretch
                  variant={navBarText === 'Edit' ? 'outline' : 'primary'}
                  preIcon={
                    navBarText === 'Edit' ? (
                      <PencilSquareIcon className="text-primary" width={20} />
                    ) : null
                  }
                  disabled={shouldSubmitDisabled}
                >
                  {navBarText === 'Edit' ? ' Edit Form' : 'Submit'}
                </Button>
              )
            }
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Content
