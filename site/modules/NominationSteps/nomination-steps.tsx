import React from 'react'
import cn from 'clsx'
import s from './nomination-steps.module.css'
import Container from '@components/ui/Container/Container'
import { registrationClose } from '@config/types/registrationDate'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

export interface NominationStepsProps {
  data: any
}

const NominationSteps: React.FC<NominationStepsProps> = (props) => {
  const rootClassName = cn(s.root, {})

  const handleRegister = () => {
    //window.open('register', '_self')
    const registerNowData = {
      source: 'middle_section',
      //reg_form_link: `${process.env.NEXT_PUBLIC_SAT_REGISTER_NOW_URL}`,
      campaign: '',
      coming_from: 'middle_section',
    }
    triggerTrackEvent.marvelRegisterNow(registerNowData)
  }

  return (
    <section id="how-to-apply">
      <div className={s.step_bkg}>
        <Container className="mx-auto max-w-6xl">
          <div className="flex justify-center">
            <span className={s.heading_top}>How to Register?</span>
          </div>
          <div className="flex justify-center">
            <span className={s.heading}>Fill Nomination in 3 simple steps</span>
          </div>

          <div className="flex justify-between">
            <div className="sm:w-10 w-10">
              <img className={s.left_img} src="/3dots.svg" alt="dots image" />
            </div>
            <div className="flex flex-col lg:w-9/12 md:w-full w-11/12 py-10">
              <div className={s.card}>
                <div className={s.card_image_box}>
                  <img className={s.card_img} src="/step_1.svg" alt="step 1" />
                </div>
                <div className={s.card_text_box}>
                  <span className={s.card_heading_top}>Step 1</span>
                  <span className={s.card_heading}>
                    Register for PW Marvels
                  </span>
                  <span className={s.card_text}>
                    Fill your basic details to make an account on PW so that you
                    can nominate yourself for PW Marvels
                  </span>
                </div>
              </div>
              <div className={s.card}>
                <div className={s.card_image_box}>
                  <img className={s.card_img} src="/step_2.svg" alt="step 1" />
                </div>
                <div className={s.card_text_box}>
                  <span className={s.card_heading_top}>Step 2</span>
                  <span className={s.card_heading}>Fill Nomination Form</span>
                  <span className={s.card_text}>
                    You will get a dashboard where you can fill the nomination
                    form that is defined based on your class.
                    <br />
                    Select your qualified exams/awards/scholarships in the form.
                  </span>
                </div>
              </div>
              <div className={s.card}>
                <div className={s.card_image_box}>
                  <img className={s.card_img} src="/step_3.svg" alt="step 1" />
                </div>
                <div className={s.card_text_box}>
                  <span className={s.card_heading_top}>Step 3</span>
                  <span className={s.card_heading}>Get Awarded</span>
                  <span className={s.card_text}>
                    Get recognised for your efforts and rewarded according to
                    merit! The more you accomplish, the more your chances to win
                    big!
                  </span>
                </div>
              </div>
            </div>
            <div className="w-3/12 relative hidden lg:flex">
              <img
                className={s.right_img}
                src="/person.svg"
                alt="person image"
              />
            </div>
          </div>
        </Container>
      </div>

      <Container className="mx-auto max-w-6xl">
        <div className={s.bottom_text}>
          Apply now to be a <span className="text-[#5F43CC]">PW Marvel</span>{' '}
          and stand a chance to win amazing rewards
        </div>
        {registrationClose && (
          <div className="mt-6 mb-10">
            <a
              href="/register"
              className={s.color_btn}
              onClick={handleRegister}
            >
              <span className="inline-flex text-white">
                Register Now
                <img
                  className="ml-2"
                  src="/right-arrow.svg"
                  alt="right-arrow"
                />
              </span>
            </a>
          </div>
        )}
      </Container>
    </section>
  )
}

export default NominationSteps
