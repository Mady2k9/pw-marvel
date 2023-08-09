import helper from '@lib/eventTracker/helper'
import globalProps from './globalProps'
import { localStorageHelper } from '@utils/localStorage'

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
  deviceId: any,
  source: any,
  medium: any,
  campaign: any

if (typeof window !== 'undefined') {
  //userId = JSON.parse(localStorage?.getItem('user') || '{}').id
  deviceId = localStorage?.getItem('randomId')
}
userId = helper.isUserloggedIn()
  ? JSON.parse(localStorage?.getItem('user') || '{}').id
  : ''

source = globalProps.utmParams?.utm_source || ''
medium = globalProps.utmParams?.utm_medium || ''
campaign = globalProps.utmParams?.utm_campaign || ''

const triggerTrackEvent = {
  marvelLandingPage: () => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      DeviceId: deviceId,
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    gtag('event', EventType.MARVEL_LANDING_PAGE, body)
  },

  marvelRegisterNow: ({ coming_from }: marvelRegisterNowProps) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      coming_from: coming_from,
    }
    //logEvent(EventType.MARVEL_REGISTER_NOW, body, false)
    gtag('event', EventType.MARVEL_REGISTER_NOW, body)
  },

  marvelRegisterNumber: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      UserPhoneNumber: phone_number,
    }
    //logEvent(EventType.MARVEL_MOBILE_NUMBER, body, false)
    gtag('event', EventType.MARVEL_MOBILE_NUMBER, body)
  },

  marvelRegisterSuccess: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      UserPhoneNumber: phone_number,
    }
    //logEvent(EventType.MARVEL_REGISTER_SUCCESS, body, false)
    gtag('event', EventType.MARVEL_REGISTER_SUCCESS, body)
  },

  marvelNavbarNavigation: (navigation_name: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      navigation_name: navigation_name,
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    //logEvent(EventType.MARVEL_NAVBAR_NAVIGATION, body, false)
    gtag('event', EventType.MARVEL_NAVBAR_NAVIGATION, body)
  },

  marvelLoginNow: ({ coming_from }: marvelLoginNowProps) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      coming_from: coming_from,
    }
    //logEvent(EventType.MARVEL_LOGIN_PAGE, body, false)
    gtag('event', EventType.MARVEL_LOGIN_PAGE, body)
  },

  marvelLoginNumber: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      UserPhoneNumber: phone_number,
    }
    //logEvent(EventType.MARVEL_MOBILE_NUMBER_CLICK, body, false)
    gtag('event', EventType.MARVEL_MOBILE_NUMBER_CLICK, body)
  },
  marvelLoginSuccess: (phone_number: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      UserPhoneNumber: phone_number,
    }
    //logEvent(EventType.MARVEL_LOGIN_SUCCESS, body, false)
    gtag('event', EventType.MARVEL_LOGIN_SUCCESS, body)
  },

  marvelFormVisit: ({ profile_details, form_name }: marvelFormVisitProps) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      profile_details: profile_details,
      form_name: form_name,
    }
    //logEvent(EventType.MARVEL_FORM_VISIT, body, false)
    gtag('event', EventType.MARVEL_FORM_VISIT, body)
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
    //logEvent(EventType.MARVEL_NOMINATION_TNC_POPUP, body, false)
    gtag('event', EventType.MARVEL_SUBMIT_PROFILE, body)
  },

  marvelNominationTncPopup: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
    }
    //logEvent(EventType.MARVEL_NOMINATION_TNC_POPUP, body, false)
    gtag('event', EventType.MARVEL_NOMINATION_TNC_POPUP, body)
  },
  marvelNominationTncAction: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
    }
    //logEvent(EventType.MARVEL_NOMINATION_TNC_ACTION, body, false)
    gtag('event', EventType.MARVEL_NOMINATION_TNC_ACTION, body)
  },
  marvelNominationSubmit: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
    }
    //logEvent(EventType.MARVEL_NOMINATION_SUBMIT, body, false)
    gtag('event', EventType.MARVEL_NOMINATION_SUBMIT, body)
  },
  marvelDocumentSubmit: (std_class: string) => {
    const body = {
      UserId: helper.isUserloggedIn()
        ? JSON.parse(localStorage?.getItem('user') || '{}').id
        : '',
      class: std_class,
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
    }
    //logEvent(EventType.MARVEL_DOCUMENT_SUBMIT, body, false)
    gtag('event', EventType.MARVEL_DOCUMENT_SUBMIT, body)
  },
}

export default triggerTrackEvent
