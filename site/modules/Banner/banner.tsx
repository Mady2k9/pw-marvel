import React from 'react'
import cn from 'clsx'

import s from './banner.module.css'
import Image from 'next/image'
import { Button, Typography } from '@components/ui'
import Container from '@components/ui/Container/Container'
import { useRouter } from 'next/router'
import { registrationClose } from '@config/types/registrationDate'
import triggerTrackEvent from '@modules/services/events/eventInitiator'
export interface BannerProps {
  data: any
}

const Banner: React.FC<BannerProps> = (props) => {
  const router = useRouter()

  const handleRegister = () => {
    //window.open('register', '_self')
    const registerNowData = {
      source: 'hero_section',
      //reg_form_link: `${process.env.NEXT_PUBLIC_SAT_REGISTER_NOW_URL}`,
      campaign: '',
      coming_from: 'hero_section',
    }
    triggerTrackEvent.marvelRegisterNow(registerNowData)
  }

  return (
    <div className={s.banner}>
      <img
        className="md:block hidden object-cover w-full absolute z-0"
        src="/top_banner_web.svg"
        alt="banner web"
      />
      <img
        className="md:hidden block object-cover w-full absolute z-0"
        src="/top_banner_m.svg"
        alt="banner mobile"
      />
      <Container className="mx-auto max-w-6xl">
        <div className={s.banner_section}>
          <div className="sm:flex sm:flex-row sm:justify-between justify-center">
            <div className={s.banner_left_section}>
              <div className="flex flex-row sm:text-left text-center">
                <div className={s.heading}>
                  Safalta Ki Udaan <br className="sm:hidden flex" /> Ka
                  <span className={s.orange_color}> Samman</span>
                  <img className={s.top_arrow} src="/arrow.svg" alt="Logo" />
                </div>
                <div>
                  <img className="hidden sm:flex" src="/arrow.svg" alt="Logo" />
                </div>
              </div>
              <div className={s.sub_heading}>
                Get awarded for all your meritorious hard work and Glorious
                achievements and be a proud PW Marvel
              </div>
              {registrationClose && (
                <a
                  href={'/register'}
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
              )}
            </div>
            <div className="sm:w-1/3">
              <img
                className={s.right_img}
                src="/banner_right_img.svg"
                alt="banner right image"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Banner
