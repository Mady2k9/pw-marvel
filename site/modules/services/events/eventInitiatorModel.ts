export interface marvelRegisterNowProps {
  source: string
  //reg_form_link: string
  campaign: any
  coming_from: any
}

export interface marvelRegisterNumberProps {
  source: string
  phone_number: any
  campaign: any
  medium: any
}

export interface marvelRegisterSuccessProps {
  mode: string
  campaign_params: any
}

export interface marvelLoginNowProps {
  source: string
  //reg_form_link: string
  campaign: any
  coming_from: any
}

export interface marvelFormVisitProps {
  source: string
  campaign: any
  medium: any
  profile_details: any
  form_name: any
}

export interface marvelNominationTncPopupProps {
  class: string
}

export interface registrationConfirmationProps {
  source?: string
  city: string
  email_id: string
  current_class: string
  student_mobile: string
  student_name: string
  guardian_mobile_number: string
  exam_date: string
  exam_mode: string
  offered_course: string
  school_name: string
  academic_achievement: string
  preferred_admission_center: string
  preferred_test_center: string
  available_test_center_city: string
  time_slot: string
}
