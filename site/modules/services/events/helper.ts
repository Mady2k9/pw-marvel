import { EventType } from '@lib/events/events'

export const fromApp = () => {
  //   return true
  return (
    typeof window !== 'undefined' && localStorage.getItem('from_app') === 'true'
  )
}

export const getUserData = (type: 'ga' | 'moengage') => {
  const user = JSON.parse(localStorage.getItem('user') || '{}') as any
  const userId = user.id
  const phone_number = user.username
  const deviceId = localStorage.getItem('randomId')
  const data: Record<string, any> = {}
  if (userId) {
    data['user_id'] = userId
  }
  if (phone_number) {
    data['phone_number'] = phone_number
  }
  if (deviceId) {
    data['device_id'] = deviceId
  }
  if (user?.firstName && user?.lastName) {
    data['username'] = `${user?.firstName}  ${user?.lastName}`
  } else {
    data['username'] = user?.firstName
  }
  /* if (type === 'moengage') {
    data['exam'] = user?.profileId?.exams[0] || ''
    data['city'] = user?.address?.city || ''
    data['state'] = user?.address?.state || ''
    data['pincode'] = user?.address?.pincode || ''
    data['cohort_name'] =
      `${user?.profileId?.exams[0]} - ${user?.profileId?.class}` || ''
    data['class'] = user?.profileId?.class || ''
    // data['client_type'] = fromApp() ? 'app' : 'web'
  } */
  return data
}
/* 
// TODO: trigger this on login and map proper types
export const moengageLogin = ({ user }: { user: any }) => {
  console.log({ user })
}
// TODO use this in case user is logged out

export const moengageLogout = () => {
  ;(window as any).Moengage.destroy_session()
}
export const trackMoengageEvent = (
  eventName: EventType,
  eventData: Record<string, any>
) => {
  const userData = getUserData('moengage')
  const updatedData = { ...userData, ...eventData }
  // const eventPrefix = 'vp_'
  try {
    ;(window as any).Moengage.track_event(eventName, updatedData)
  } catch (e) {
    console.log(e)
  }
}

export const triggerMoengageLoginIfUserIsPresent = () => {
  const userJsonString = localStorage.getItem('user')
  if (userJsonString) {
    const user = JSON.parse(userJsonString || '{}') as any
    moengageLogin({ user })
  }
} */
