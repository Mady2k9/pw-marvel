import helper from '@lib/eventTracker/helper'
//import { logEvent } from '@lib/events'
//import gtag from 'ga-gtag'

import {
  registrationConfirmationProps,
  //satBannerClickProps,
  marvelRegisterNowProps,
  marvelLoginNowProps,
  marvelFormVisitProps,
  marvelNominationTncPopupProps,
  marvelRegisterSuccessProps,
  marvelRegisterNumberProps,
} from './eventInitiatorModel'
import { EventType } from '@lib/events/events'
//import { trackMoengageEvent } from './helper'

let userId: string | null, userName: string | null, deviceId: string | null

if (typeof window !== 'undefined') {
  userId = JSON.parse(localStorage?.getItem('user') || '{}').id
  userName = localStorage?.getItem('username')
  deviceId = localStorage?.getItem('randomId')
}

const triggerTrackEvent = {
  /* marvelLandingPage: (source: string) => {
    const body = {
      UserId: '',
      utm_source: source,
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    logEvent(EventType.MARVEL_LANDING_PAGE, body, false)
  }, */

  marvelLandingPage: (source: string) => {
    const body = {
      UserId: userId,
      DeviceId: deviceId,
      utm_source: source,
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    gtag('event', EventType.MARVEL_LANDING_PAGE, body)
  },

  marvelRegisterNow: ({
    source,
    //reg_form_link,
    campaign,
    coming_from,
  }: marvelRegisterNowProps) => {
    const body = {
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: '',
      coming_from: coming_from,
      //user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    //logEvent(EventType.MARVEL_REGISTER_NOW, body, false)
    gtag('event', EventType.MARVEL_REGISTER_NOW, body)
  },

  marvelRegisterNumber: (phone_number: string) => {
    const body = {
      utm_source: '',
      utm_campaign: '',
      UserPhoneNumber: phone_number,
      utm_medium: '',
    }
    //logEvent(EventType.MARVEL_MOBILE_NUMBER, body, false)
    gtag('event', EventType.MARVEL_MOBILE_NUMBER, body)
  },

  marvelRegisterSuccess: (phone_number: string) => {
    const body = {
      utm_source: '',
      utm_campaign: '',
      UserPhoneNumber: phone_number,
      utm_medium: '',
    }
    //logEvent(EventType.MARVEL_REGISTER_SUCCESS, body, false)
    gtag('event', EventType.MARVEL_REGISTER_SUCCESS, body)
  },

  marvelNavbarNavigation: (navigation_name: string) => {
    const body = {
      utm_source: '',
      utm_campaign: '',
      navigation_name: navigation_name,
      utm_medium: '',
    }
    //logEvent(EventType.MARVEL_NAVBAR_NAVIGATION, body, false)
    gtag('event', EventType.MARVEL_NAVBAR_NAVIGATION, body)
  },

  marvelLoginNow: ({
    source,
    //reg_form_link,
    campaign,
    coming_from,
  }: marvelLoginNowProps) => {
    const body = {
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: '',
      coming_from: coming_from,
      //user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    //logEvent(EventType.MARVEL_LOGIN_PAGE, body, false)
    gtag('event', EventType.MARVEL_LOGIN_PAGE, body)
  },

  marvelLoginNumber: (phone_number: string) => {
    const body = {
      utm_source: '',
      utm_campaign: '',
      UserPhoneNumber: phone_number,
      utm_medium: '',
    }
    //logEvent(EventType.MARVEL_MOBILE_NUMBER_CLICK, body, false)
    gtag('event', EventType.MARVEL_MOBILE_NUMBER_CLICK, body)
  },
  marvelLoginSuccess: (phone_number: string) => {
    const body = {
      utm_source: '',
      utm_campaign: '',
      UserPhoneNumber: phone_number,
      utm_medium: '',
    }
    //logEvent(EventType.MARVEL_LOGIN_SUCCESS, body, false)
    gtag('event', EventType.MARVEL_LOGIN_SUCCESS, body)
  },

  marvelFormVisit: ({
    source,
    campaign,
    medium,
    profile_details,
    form_name,
  }: marvelFormVisitProps) => {
    const body = {
      utm_source: source,
      utm_campaign: campaign,
      utm_medium: medium,
      profile_details: profile_details,
      form_name: form_name,
      //user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    //logEvent(EventType.MARVEL_FORM_VISIT, body, false)
    gtag('event', EventType.MARVEL_FORM_VISIT, body)
  },

  marvelNominationTncPopup: (std_class: string) => {
    const body = {
      class: std_class,
    }
    //logEvent(EventType.MARVEL_NOMINATION_TNC_POPUP, body, false)
    gtag('event', EventType.MARVEL_NOMINATION_TNC_POPUP, body)
  },
  marvelNominationTncAction: (std_class: string) => {
    const body = {
      class: std_class,
    }
    //logEvent(EventType.MARVEL_NOMINATION_TNC_ACTION, body, false)
    gtag('event', EventType.MARVEL_NOMINATION_TNC_ACTION, body)
  },
  marvelNominationSubmit: (std_class: string) => {
    const body = {
      class: std_class,
    }
    //logEvent(EventType.MARVEL_NOMINATION_SUBMIT, body, false)
    gtag('event', EventType.MARVEL_NOMINATION_SUBMIT, body)
  },
  marvelDocumentSubmit: (std_class: string) => {
    const body = {
      class: std_class,
    }
    //logEvent(EventType.MARVEL_DOCUMENT_SUBMIT, body, false)
    gtag('event', EventType.MARVEL_DOCUMENT_SUBMIT, body)
  },
  // marvel form register click
  /*  marvelRegisterSuccessClick: ({ mode, campaign_params }: any) => {
    const body = {
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
      mode,
      campaign_params,
    }
    logEvent(EventType.MARVEL_REGISTER_SUCCESS, body, false)
  }, */

  registrationConfirmationGa: (data: { [key: string]: string }) => {
    // logEvent(EventType.SAT_REGISTRATION_CONFIRMATION, data, false, data.source)
    // trackMoengageEvent(EventType.SAT_REGISTRATION_CONFIRMATION, data)
  },

  /*  registrationConfirmation: ({
    source,
    city,
    email_id,
    current_class,
    student_mobile,
    student_name,
    guardian_mobile_number,
    exam_date,
    exam_mode,
    offered_course,
    school_name,
    academic_achievement,
    preferred_admission_center,
    preferred_test_center,
    available_test_center_city,
    time_slot,
  }: registrationConfirmationProps) => {
    const body = {
      source,
      city,
      email_id,
      current_class,
      student_mobile,
      student_name,
      guardian_mobile_number,
      exam_date,
      offered_course,
      exam_mode,
      time_slot,
      school_name,
      academic_achievement,
      preferred_admission_center,
      preferred_test_center,
      available_test_center_city,
      user_type: helper.isUserloggedIn() ? 'logged_in' : 'not_logged_in',
    }
    trackMoengageEvent(EventType.SAT_CONFIRMATION_PAGE_VIEW, body)
  }, */
}

export default triggerTrackEvent
