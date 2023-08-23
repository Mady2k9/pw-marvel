import helper from '@lib/eventTracker/helper'

import {
  marvelRegisterNowProps,
  marvelLoginNowProps,
  marvelFormVisitProps,
  marvelSubmitProfileProps,
} from './eventInitiatorModel'
import { EventType } from '@lib/events/events'
import { useEffect } from 'react'

let userId: any,
  //userName: any,
  deviceId: any

if (typeof window !== 'undefined') {
  //userId = JSON.parse(localStorage?.getItem('user') || '{}').id
  deviceId = localStorage?.getItem('randomId')
}
userId = helper.isUserloggedIn()
  ? JSON.parse(localStorage?.getItem('user') || '{}').id
  : ''

export const getUserData = () => {
  const data: Record<string, any> = {}

  if (
    window.localStorage.getItem('UTM_KEY') &&
    window.localStorage.getItem('UTM_KEY') !== 'undefined'
  ) {
    const storedItems = JSON.parse(localStorage.getItem('UTM_KEY') || '')
    data['utm_source'] = storedItems?.utm_source || ''
    data['utm_medium'] = storedItems?.utm_medium || ''
    data['utm_campaign'] = storedItems?.utm_campaign || ''
  }

  return data
}

export const trackGaEvent = (eventName: any, body: any) => {
  const data = getUserData()
  const updatedData = { ...body, ...data }

  //console.log('ga-event', eventName, updatedData)

  gtag('event', eventName, updatedData)
}

const triggerTrackEvent = {
  marvelLandingPage: () => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      DeviceId: deviceId,
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }

    trackGaEvent(EventType.MARVEL_LANDING_PAGE, body)
  },

  marvelRegisterNow: ({ coming_from }: marvelRegisterNowProps) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      coming_from: coming_from,
    }

    trackGaEvent(EventType.MARVEL_REGISTER_NOW, body)
  },

  marvelRegisterNumber: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      UserPhoneNumber: phone_number,
    }
    trackGaEvent(EventType.MARVEL_MOBILE_NUMBER, body)
  },

  marvelRegisterSuccess: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      UserPhoneNumber: phone_number,
    }
    trackGaEvent(EventType.MARVEL_REGISTER_SUCCESS, body)
  },

  marvelNavbarNavigation: (navigation_name: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      navigation_name: navigation_name,
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    trackGaEvent(EventType.MARVEL_NAVBAR_NAVIGATION, body)
  },

  marvelLoginNow: ({ coming_from }: marvelLoginNowProps) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      coming_from: coming_from,
    }
    trackGaEvent(EventType.MARVEL_LOGIN_PAGE, body)
  },

  marvelLoginNumber: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      UserPhoneNumber: phone_number,
    }
    trackGaEvent(EventType.MARVEL_MOBILE_NUMBER_CLICK, body)
  },
  marvelLoginSuccess: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      UserPhoneNumber: phone_number,
    }
    trackGaEvent(EventType.MARVEL_LOGIN_SUCCESS, body)
  },

  marvelFormVisit: ({ profile_details, form_name }: marvelFormVisitProps) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      profile_details: profile_details,
      form_name: form_name,
    }
    trackGaEvent(EventType.MARVEL_FORM_VISIT, body)
  },

  marvelSubmitProfile: ({
    std_class,
    profile_type,
  }: marvelSubmitProfileProps) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
      type: profile_type,
    }
    trackGaEvent(EventType.MARVEL_SUBMIT_PROFILE, body)
  },

  marvelNominationTncPopup: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
    }
    trackGaEvent(EventType.MARVEL_NOMINATION_TNC_POPUP, body)
  },
  marvelNominationTncAction: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
    }
    gtag('event', EventType.MARVEL_NOMINATION_TNC_ACTION, body)
  },
  marvelNominationSubmit: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
    }
    trackGaEvent(EventType.MARVEL_NOMINATION_SUBMIT, body)
  },
  marvelDocumentSubmit: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
    }
    trackGaEvent(EventType.MARVEL_DOCUMENT_SUBMIT, body)
  },
}

export default triggerTrackEvent
