import { Header } from '@modules/Screens/Onboarding/Components'
import NominationForm from '@modules/Screens/Onboarding/NominationForm/NominationForm'
import { useEffect, useMemo, useState } from 'react'
import { fetchNomationFormat, postMarvelDataAsDraft } from '@modules/auth/lib'
import Layout from '../Layout'
import { Dialog } from '@headlessui/react'
import { Cross } from '@components/icons'
import { Button } from '@components/ui'
import { useRouter } from 'next/router'
import { useGetDraftData } from '@lib/hooks/marvel/useGetDraftData'
import { useMarvelContext } from '@modules/MarvelContext'
import useNotify, { NotificationEnums } from '@lib/useNotify'
import { ActionModal } from '@components/ui/Modal'

export type AchievementFEType = {
  examGroup: string
  remarks: string
  achievementName: string
  criteria: string
  year: number
  examCategory?: string
}

export type AchievementBEType = AchievementFEType & {
  year: number
}

const TERMS_AND_CONDITIONS = [
  'To nominate yourself for PW Marvels, the student must have won at least one award in the listed academic years.',
  'Examination of the same category will be clubbed together and you should fill best among them.',
  'You can fill multiple awards that will be counted separately. Exact details mentioned in each category.',
  'In a particular group, you should only select one title where you have the highest level achievement.',
  'You can fill only one exam for your nomination and marking scheme is almost same for all same-category exams, but there may be a minor variation depending on the exam-conducting body, number of students participating & rank achieved.',
  'You can only fill those forms whose Valid Certificates are available with you. No internet copy will be entertained.',
]

const NominationFormScreen = () => {
  const { showNotification } = useNotify()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<AchievementFEType[]>([])
  const [nominationsFormat, setNominationsFormat] = useState<any>([])
  const [isChecked, setIsChecked] = useState(false)
  const { push } = useRouter()
  const { draftData, isLoadingDraftData } = useGetDraftData()
  const [navBarText, setNavBarText] = useState('Submit')
  const { updateCompletedSteps, completedStepTill } = useMarvelContext()

  useEffect(() => {
    if (draftData) {
      setIsModalOpen(!Boolean(draftData?.isRegistrationEnded))
    }
  }, [draftData])

  useEffect(() => {
    const nominationDocsInfo = draftData?.pwMarvelData?.nominationDocsInfo
    const studentDocsInfo = draftData?.pwMarvelData?.studentDocsInfo
    if (nominationDocsInfo) {
      const step = studentDocsInfo ? 3 : nominationDocsInfo ? 2 : 1
      setSelectedValues(nominationDocsInfo)
      updateCompletedSteps(Math.max(step, completedStepTill))
      setNavBarText('Edit')
    }
  }, [draftData, updateCompletedSteps, completedStepTill])

  useEffect(() => {
    // TODO Check why this is calling twice
    ;(async () => {
      const randomId = localStorage.getItem('randomId') || ''
      const nominationFormatData = await fetchNomationFormat(10, randomId) // TODO class should be dynamic
      setNominationsFormat(nominationFormatData?.data?.data?.['exam_category'])
    })()
  }, [])

  //FUNCTIONS
  const onValueSelect = (value: AchievementFEType) => {
    const values = [...selectedValues]
    const selectedIndex = values?.findIndex((el: any) => {
      return (
        el?.year == value?.year &&
        el?.examGroup == value?.examGroup &&
        el?.achievementName === value?.achievementName &&
        el?.criteria === value?.criteria
      )
    })

    if (selectedIndex !== -1) {
      values[selectedIndex] = value
    } else {
      values.push(value)
    }
    setSelectedValues([...values])
  }

  const onDeselectValue = (value: AchievementFEType) => {
    const filteredArr = selectedValues.filter((arrValue) => {
      return (
        arrValue.achievementName !== value.achievementName ||
        arrValue.criteria !== value.criteria ||
        arrValue.examGroup !== value.examGroup ||
        arrValue.year != value.year ||
        arrValue.remarks !== value.remarks
      )
    })
    setSelectedValues([...filteredArr])
  }

  const onSubmit = () => {
    // Do not submit the form if no value is selected
    if (selectedValues.length === 0) {
      return false
    }
    const randomId = localStorage.getItem('randomId') || ''
    const dataToSend = {
      nominationDocsInfo: selectedValues,
    }

    postMarvelDataAsDraft(dataToSend, randomId)
      .then((res: any) => {
        if (res) {
          push('/upload-document')
        }
      })
      .catch((error: any) => {
        showNotification({
          type: NotificationEnums.ERROR,
          title: error?.message,
        })
      })
  }

  const checkboxButton = () => {
    setIsChecked(!isChecked)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const shouldSubmitDisable = () => {
    return !selectedValues?.length
  }

  const enableEditForm = (navBarText: string) => {
    if (navBarText === 'Edit') {
      setNavBarText('Submit')
    } else {
      setNavBarText('Edit')
    }
  }

  return (
    <Layout
      header={
        <Header
          title="Step 2: Nominate Now"
          hideSubmitButton={draftData?.isRegistrationEnded}
          handleSubmitForm={onSubmit}
          handleEditForm={(navBarText: string) => enableEditForm(navBarText)}
          profileData={undefined}
          isEditEnabled={false}
          navBarText={navBarText}
          shouldDisabled={shouldSubmitDisable()}
        />
      }
      navBarText={navBarText}
      isRegistrationEnded={draftData?.isRegistrationEnded}
    >
      <div className="sticky left-0 h-100vh bg-[#f8f8f8] z-19 sm:flex w-full">
        <NominationForm
          onValueSelect={onValueSelect}
          selectedValues={selectedValues}
          nominationsFormat={nominationsFormat}
          onDeselectValue={onDeselectValue}
          isEditEnabled={navBarText === 'Submit'}
          navBarText={navBarText}
          shouldSubmitDisabled={shouldSubmitDisable()}
          handleEditForm={enableEditForm}
          handleSubmitForm={onSubmit}
          hideSubmitButton={draftData?.isRegistrationEnded}
        />
        <ActionModal
          // className={'relative z-[999999]'}
          open={isModalOpen}
          disableCloseOnOutsideClick
          setOpen={toggleModal}
          wrapperClassName="md:max-w-[900px] w-96"
          // onClose={toggleModal}
        >
          <div className=" sm:m-4">
            <p className="font-semibold text-[18px] mt-2 mb-4 text-center">
              Nomination Terms and Conditions
            </p>
            <ul className="list-disc text-[14px] sm:px-12 text-left p-2">
              {TERMS_AND_CONDITIONS.map((termsConditions, index) => (
                <li key={`terms-conditions-${index}`}>{termsConditions}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center mt-6 items-center">
            <input onClick={checkboxButton} type="checkbox" />
            <span className="ml-3 text-[14px]">I Accept</span>
            <Button
              onClick={toggleModal}
              className="w-[100px] ml-8"
              disabled={!isChecked}
            >
              Continue
            </Button>
          </div>
        </ActionModal>
      </div>
    </Layout>
  )
}

export default NominationFormScreen
