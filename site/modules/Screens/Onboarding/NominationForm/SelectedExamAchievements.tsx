import React, { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import downArrow from 'public/downArrow.svg'
import { Select } from '@components/ui'
import { AchievementBEType } from '.'
import cn from 'clsx'

type SelectedExamAchievementsProps = {
  achievements: any
  onValueSelect: (val: AchievementBEType) => void
  onDeselectValue: (val: AchievementBEType) => void
  selectedValues: any
  year: {
    year: number
    title: string
  }
  isEditEnabled: boolean
}

function SelectedExamAchievements({
  achievements,
  onValueSelect,
  onDeselectValue,
  selectedValues,
  year,
  isEditEnabled,
}: SelectedExamAchievementsProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const achievementsData = (achievements && achievements?.['Group']) || []
  const isMultiSelectEnabled = useMemo(() => {
    return achievements?.isMultiSelect
  }, [achievements])

  const onSelectCriteria = (
    examGroup: string,
    val: string,
    achievementName: string,
    criteria: string,
    examCategory: string
  ) => {
    onValueSelect({
      year: year?.year,
      examGroup,
      achievementName,
      remarks: val,
      criteria,
      examCategory,
    })
  }

  const getSelectedValue = useCallback(
    (
      examGroup: string,
      achievementName: string,
      criteria: string,
      year: number
    ) => {
      /**
       * Write logic if the value is available then it should retuen the value
       */
      const value = selectedValues.find((value: any) => {
        if (
          value.examGroup === examGroup &&
          value.criteria === criteria &&
          value.year == year && // !need to confirm this with BE, WHY !!!
          value?.achievementName == achievementName
        ) {
          return value
        }
      })
      if (value) {
        return value.remarks
      }
    },
    [selectedValues]
  )

  const unselectAcievement = (
    isChecked: boolean,
    examGroup: string,
    achievementName: string,
    criteria: string,
    val: string
  ) => {
    if (isChecked) {
      return false
    }

    onDeselectValue({
      year: year?.year,
      examGroup,
      achievementName,
      remarks: val,
      criteria,
    })
  }

  if (!achievementsData.length) {
    //TODO fix this
    return null
  }

  const checkForDisable = (
    groupName: string,
    criteria: string,
    competitionName: string,
    examCategory: string,
    year: number
  ) => {
    if (isMultiSelectEnabled) {
      return false // Restricted this func to run, If we have multiSelect enabled.
    }
    const isFound = selectedValues?.find(
      (el: any) =>
        el?.examGroup === groupName &&
        el?.examCategory === examCategory &&
        el?.year == year &&
        (el?.criteria !== criteria || el?.achievementName !== competitionName)
    )
    if (isFound) {
      return true
    }
    return false
  }

  return (
    <>
      <div
        className="mt-6 bg-[#F8F8F8] w-full flex justify-between items-center p-4 max-[640px]:mt-3"
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        <div>
          <p className="text-[#757575]">Fill your achievements here for</p>
          <p className="text-[#1B2124] text-base">{year?.title}</p>
        </div>
        <div
          className={`transition-all duration-300 ${
            isAccordionOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <Image src={downArrow} alt="Accordion Icon" />
        </div>
      </div>
      {isAccordionOpen && (
        <div className="text-[#757575] overflow-x-auto lg:max-w-full  sm:max-w-[468px]">
          <div className="text-[#1B2124] font-bold flex py-4 mt-5 border-b-2 min-w-[590px] sm:border-0 border border-[#EFEFEF] rounded-t-lg">
            <div className="w-[10%] p-2">Group</div>
            <div className="w-[90%]">
              <div className="w-full flex border-b last:border-b-0">
                <div className="w-[35%] p-2">Competition Title</div>
                <div className="w-[35%] p-2">Criteria</div>
                <div className="w-[30%] p-2">Select Criteria</div>
              </div>
            </div>
          </div>
          {achievementsData?.map((achievement: any, index: number) => {
            //debugger
            const group = achievement?.groupName
            const competitions = achievement?.competitions
            const examCategory = achievements?.name

            return (
              <div
                key={`${achievement}-${index}`}
                className="flex border-b-2 py-2  min-w-[590px] sm:border-0 border border-[#EFEFEF] border-b-[#ffffff]"
              >
                <div className="w-[10%] p-2">{group}</div>
                <div className="w-[90%]">
                  {competitions.map(
                    (competitionDetails: any, index: number) => {
                      let competitionName = competitionDetails?.achievementName
                      let criteriaName = competitionDetails?.criteria

                      let dropdownArray =
                        competitionDetails?.criteriaDDValuesArr

                      const selectedVal = getSelectedValue(
                        group,
                        competitionName,
                        criteriaName,
                        year?.year
                      )

                      //console.log(Object.keys(competitions[index]))
                      return (
                        <div
                          key={index}
                          className="flex border-b last:border-b-0"
                        >
                          <div className="w-[35%] p-2">{competitionName}</div>
                          <div className="w-[35%] p-2">{criteriaName}</div>
                          <div className="w-[30%] p-2 flex">
                            <Select
                              options={dropdownArray.map((el: string) => ({
                                id: el,
                                name: el,
                              }))}
                              disabled={
                                !isEditEnabled ||
                                checkForDisable(
                                  group,
                                  criteriaName,
                                  competitionName,
                                  examCategory,
                                  year?.year
                                )
                              }
                              placeholder="Select"
                              className={cn('h-[50px] mr-2', {
                                'cursor-not-allowed !bg-gray-100 !border-0':
                                  !isEditEnabled ||
                                  checkForDisable(
                                    group,
                                    criteriaName,
                                    competitionName,
                                    examCategory,
                                    year?.year
                                  ),
                              })}
                              onChange={(val: string) => {
                                if (val === undefined) {
                                  unselectAcievement(
                                    val,
                                    group,
                                    competitionName,
                                    criteriaName,
                                    selectedVal
                                  )
                                } else {
                                  onSelectCriteria(
                                    group,
                                    val,
                                    competitionName,
                                    criteriaName,
                                    achievements?.name
                                  )
                                }
                              }}
                              value={selectedVal || ''}
                            />
                            <input
                              type="checkbox"
                              disabled={!isEditEnabled}
                              className={cn(
                                'appearance-none mt-[12px] checked:bg-[#5A4BDA] w-[24px] h-[24px] rounded-full',
                                { 'cursor-not-allowed': !isEditEnabled }
                              )}
                              onChange={(e) => {
                                unselectAcievement(
                                  e.target.checked,
                                  group,
                                  competitionName,
                                  criteriaName,
                                  selectedVal
                                )
                              }}
                              checked={!!selectedVal}
                            />
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default SelectedExamAchievements
