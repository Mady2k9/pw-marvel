import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@modules/Screens/Onboarding/Components/Header'
import ProfileForm from '@modules/Screens/Onboarding/ProfileDetails/ProfileForm'
import {
  getAlternateMobile,
  getMyProfile,
  updateUserProfile,
} from '@modules/auth/lib'
import Layout from '../Layout'
import { Dialog } from '@headlessui/react'
import { Cross } from '@components/icons'
import { localStorageHelper } from '@utils/helps'
import { StudentDataProps } from './types'
import { useUI } from '@components/ui'
import { useMarvelContext } from '@modules/MarvelContext'
import { useGetDraftData } from '@lib/hooks/marvel/useGetDraftData'
import { format } from 'date-fns'
import useNotify, { NotificationEnums } from '@lib/useNotify'
import { isEmailValid, isPhoneValid } from './utils'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

const ProfileDetails = () => {
  const { showNotification } = useNotify()
  const [profileData, setProfileData] = useState<StudentDataProps>({
    email: '',
    class: '',
    alternateNumber: '',
    name: '',
  })
  const [selectedClass, setSelectedClass] = useState<string>('')

  const [emailIsValid, setIfEmailIsValid] = useState<boolean>(true)
  const [phoneIsValid, setIfPhoneIsValid] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [navBarText, setNavBarText] = useState('Submit')
  const router = useRouter()
  const { user, handleUserUpdated } = useUI()
  const { draftData, isLoadingDraftData } = useGetDraftData()
  const { completedStepTill, updateCompletedSteps } = useMarvelContext()

  // to fetch and update student data
  useEffect(() => {
    const studentData = localStorageHelper.getItem('user')
    let selectedClass = ''
    async function fetchAlternateNumber() {
      const randomId = localStorage.getItem('randomId') || ''
      const { data } = await getAlternateMobile(randomId, {
        fields: 'alternateNumber,class,email',
      })
      const studentProfile = {
        email: studentData?.email,
        class: data?.data?.class,
        name: studentData?.firstName + ' ' + studentData?.lastName,
        alternateNumber: data.data.alternateNumber || '',
      }
      selectedClass = data?.data?.class
      setProfileData({
        ...profileData,
        ...studentProfile,
      })
      if (studentData?.profileId?.class) {
        const nominationDocsInfo = draftData?.pwMarvelData?.nominationDocsInfo
        const studentDocsInfo = draftData?.pwMarvelData?.studentDocsInfo
        const step = studentDocsInfo ? 3 : nominationDocsInfo ? 2 : 1
        setNavBarText('Edit')
        updateCompletedSteps(Math.max(completedStepTill, step))
        setSelectedClass(selectedClass)
      }
    }
    fetchAlternateNumber()
  }, [user, draftData])

  // onSubmit Function for first time student onboarding
  const onSubmit = async () => {
    let isEmailInvalid, isPhoneInvalid
    if (!isEmailValid(profileData?.email) && !!profileData?.email) {
      isEmailInvalid = true
      setIfEmailIsValid(false)
      showNotification({
        type: NotificationEnums.ERROR,
        title: 'Invalid Email',
      })
    } else {
      setIfEmailIsValid(true)
    }

    if (
      !isPhoneValid(profileData?.alternateNumber) &&
      !!profileData?.alternateNumber
    ) {
      isPhoneInvalid = true
      setIfPhoneIsValid(false)
      showNotification({
        type: NotificationEnums.ERROR,
        title: 'Invalid Mobile No',
      })
    } else {
      setIfPhoneIsValid(true)
    }

    if (isPhoneInvalid || isEmailInvalid) {
      return false
    }

    const dataToSend = {
      email: profileData?.email,
      alternateNumber: profileData?.alternateNumber,
      ...(!user?.profileId?.class && {
        class: selectedClass,
      }),
    }
    const randomId = localStorage.getItem('randomId') ?? ''
    try {
      const res = await updateUserProfile(dataToSend, randomId)
      const userDetails = await getMyProfile(randomId)
      if (userDetails?.data?.data) {
        localStorage.setItem('user', JSON.stringify(userDetails?.data?.data))
        handleUserUpdated()
      }
      if (res) {
        const profileData = {
          std_class: userDetails?.data?.data.profileId.class,
          profile_type: !user?.profileId?.class ? 'fresh' : 'edit',
        }
        triggerTrackEvent.marvelSubmitProfile(profileData)
        router.push('/nomination-form')
      }
    } catch (error: any) {
      showNotification({
        type: NotificationEnums.ERROR,
        title: error?.message,
      })
    }
  }

  //to toggle state of is edit form and navbar text
  const enableEditForm = (navBarText: string) => {
    setIsEdit(!isEdit)
    if (navBarText === 'Edit') {
      setNavBarText('Submit')
    } else {
      setNavBarText('Edit')
    }
  }

  //to toggle modal for agreement accept or reject
  const toggleModal = () => {
    if (profileData?.class) {
      onSubmit()
    } else {
      setIsModalOpen(!isModalOpen)
    }
  }

  const shouldSubmitDisable = () => {
    return !selectedClass
  }

  return (
    <Layout
      header={
        <Header
          title="Step 1: Profile Details"
          profileData={profileData}
          handleEditForm={enableEditForm}
          handleSubmitForm={toggleModal}
          isEditEnabled={isEdit}
          navBarText={navBarText}
          shouldDisabled={shouldSubmitDisable()}
          hideSubmitButton={draftData?.isRegistrationEnded}
        />
      }
      isRegistrationEnded={draftData?.isRegistrationEnded}
      navBarText={navBarText}
    >
      <ProfileForm
        studentData={profileData}
        setProfileData={setProfileData}
        setSelectedClass={setSelectedClass}
        isEditEnabled={isEdit}
        navBarText={navBarText}
        handleEditForm={enableEditForm}
        handleSubmitForm={toggleModal}
        hideSubmitButton={draftData?.isRegistrationEnded}
        shouldSubmitDisabled={shouldSubmitDisable()}
        isEmailValid={emailIsValid}
        isPhoneValid={phoneIsValid}
        setIfEmailIsValid={setIfEmailIsValid}
        setIfPhoneIsValid={setIfPhoneIsValid}
        registrationDate={format(new Date(user?.createdAt), 'dd MMM yyyy')}
      />
      <Dialog
        className={'relative z-[999999]'}
        open={isModalOpen}
        onClose={toggleModal}
      >
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white ring-1 transition-all p-5 relative">
            <div
              className="cursor-pointer absolute top-4 right-4"
              onClick={toggleModal}
            >
              <Cross className="h-6 w-6" />
            </div>
            <div className="text-center m-2">
              <p className="font-bold text-[20px] ">
                Are you sure you want to submit
              </p>
              <p className="mb-6 font-bold text-[20px]">Profile details</p>
              <p className="text-[16px]">
                Class is not editable once filled and submitted
              </p>
            </div>
            <div className="flex justify-center mt-6 text-[16px] font-[600px]">
              <button
                onClick={toggleModal}
                className="w-[208px] h-[48px] border border-[#5A4BDA] rounded-md text-[#5A4BDA]"
              >
                No
              </button>
              <button
                onClick={onSubmit}
                className="w-[208px] h-[48px] border ml-6 bg-[#5A4BDA] text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Layout>
  )
}

export default ProfileDetails
