import React, { useEffect, useState } from 'react'
import SelectedExamAchievements from './SelectedExamAchievements'
import { generateYearArr } from './utils'
import { AchievementFEType } from '.'
import { CheckMarkIcon } from '@assets/images/marvel/checkMark'
import { Button, useUI } from '@components/ui'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

const REGSISTARTION_FORM_INSTRUCTION = [
  'To nominate yourself, please select an exam with mentioned criteria.',
  'Weightage of the title is decreasing from group wise i.e. From Group A to Group C',
  'You can fill multiple awards that will be counted separately. Exact details mentioned in each category.',
  'After selecting the title of your choice, please click on submit button and your form will be saved.',
]

const currentYear = 2023

const yearValueArr = generateYearArr(currentYear)

type NominationFormTypes = {
  onValueSelect: (value: AchievementFEType) => void
  selectedValues: AchievementFEType[]
  nominationsFormat: any
  onDeselectValue: (val: AchievementFEType) => void
  isEditEnabled: boolean
  navBarText: string
  handleSubmitForm?: () => void // TODO - remove optional chaining
  handleEditForm: (navBarText: string) => void
  hideSubmitButton?: boolean
  shouldSubmitDisabled: boolean
}

function NominationForm({
  onValueSelect,
  selectedValues,
  nominationsFormat,
  onDeselectValue,
  isEditEnabled,
  handleSubmitForm,
  handleEditForm,
  hideSubmitButton = false,
  navBarText,
}: NominationFormTypes) {
  // TODO: Writting this code only to meet deadlines, otimize it later

  //let firstSelectedExamCategory = Object.keys(nominationsFormat)[0]

  //let firstSelectedExamCategory = nominationsFormat

  //console.log('firstSelectedExamCategory', firstSelectedExamCategory[0].name)
  const [activeExamCategory, setActiveExamCategory] = useState(
    nominationsFormat[0]?.name
  )

  const [selectedExamFormatData, setselectedExamFormatData] = useState<any>(
    nominationsFormat[0]
  )

  //console.log('nomination Form ::: ', onValueSelect)

  useEffect(() => {
    //setActiveExamCategory(Object.keys(nominationsFormat)[0])
    setActiveExamCategory(nominationsFormat[0]?.name)
    setselectedExamFormatData(nominationsFormat[0])
  }, [nominationsFormat])

  const onExamSelect = (examCategory: string, index: number) => {
    if (activeExamCategory !== examCategory) {
      setActiveExamCategory(examCategory)

      setselectedExamFormatData(nominationsFormat[index])
    }
  }

  useEffect(() => {
    // onExamSelect(activeExamCategory)
  }, [activeExamCategory])

  useEffect(() => {
    setselectedExamFormatData(nominationsFormat[0])
  }, [nominationsFormat])

  const renderLeftCategories = () => {
    return nominationsFormat?.map((nomintaionCategory: any, index: any) => {
      return (
        <div
          className={`text-[#1B2124] flex items-center gap-3 justify-between  bg-[#F8F8F8] p-3 border-[#F8F8F8] cursor-pointer ${
            nomintaionCategory.name === activeExamCategory
              ? 'text-indigo-500 bg-white !border-indigo-500 border-l-2'
              : 'hover:bg-gray-200'
          }`}
          key={nomintaionCategory.name}
          onClick={() => onExamSelect(nomintaionCategory.name, index)}
        >
          {nomintaionCategory.name}
          <div>
            {selectedValues?.find(
              (el) => el?.examCategory === nomintaionCategory?.name
            ) && <CheckMarkIcon />}
          </div>
        </div>
      )
    })
  }

  const renderRightForm = () => {
    return yearValueArr.map((value, index) => {
      return (
        <SelectedExamAchievements
          key={index}
          achievements={selectedExamFormatData}
          onValueSelect={onValueSelect}
          selectedValues={selectedValues}
          year={value}
          onDeselectValue={onDeselectValue}
          isEditEnabled={isEditEnabled}
        />
      )
    })
  }

  useEffect(() => {
    // console.log('button name', navBarText)
    const formVisitData = {
      source: '',
      campaign: '',
      medium: '',
      profile_details: { isEditEnabled } ? 'submitted' : 'not_submitted',
      form_name: 'nomination',
    }
    triggerTrackEvent.marvelFormVisit(formVisitData)
  }, [])

  //console.log('activeExamCategory', activeExamCategory)

  return (
    <div className="w-full bg-white overflow-y-scroll">
      <div className=" flex justify-center">
        <div className="md:bg-[#F8F8F8]  w-[94%] lg:w-[85%] h-fit  rounded-b-xl lg:p-3 items-center relative">
          <div className="">
            <div className="bg-white rounded-md px-[8px] sm:px-[24px] py-[12px] border sm:border-0 border-[#EFEFEF] sm:mt-0 mt-2">
              <div className="text-[16px] font-semibold mb-2">
                Instructions to fill registration form:
              </div>
              <ol className="bg-white list-disc px-[12px]">
                {REGSISTARTION_FORM_INSTRUCTION.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div className="mt-4 bg-white h-full flex lg:flex-row flex-col max-[640px]:h-screen ">
              <div className="xl:w-3/12 lg:w-4/12 rounded-t-lg p-4 w-full max-[640px]:p-0 justify-end">
                <p className="text-[#1B2124] bg-[#E4E7EA] rounded-t-lg p-3 font-bold ">
                  Exam Category
                </p>
                {/* {Object.keys(nominationsFormat)?.map( */}
                {renderLeftCategories()}
              </div>
              <div className="sm:p-4 lg:w-8/12 xl:w-9/12 w-full cursor-pointer sm:pb-0 pb-[80px]">
                <p className="text-[#757575] max-[640px]:mt-8">
                  Selected Exam Category: Profile Based scholarship award
                </p>

                {renderRightForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NominationForm
