import Footer from '@modules/SiteFooter'
import Header from '@components/common/Header/Header'
import Breadcrumb from '../modules/Breadcrumb'
import Achiever from '../modules/Achiever'
import Recognise from '../modules/Recognise'
import { useEffect } from 'react'
import triggerTrackEvent from '@modules/services/events/eventInitiator'
const items = [{ name: 'About PW Marvels', url: '/' }]

const About = () => {
  useEffect(() => {
    triggerTrackEvent.marvelNavbarNavigation('about_pw_marvels')
    //console.log('Event triggered: ')
  }, [])
  return (
    <>
      <Header variant="MARVELSHeader" />
      <Breadcrumb items={items} title={'About us'} homeLink={''} />
      <Achiever data={undefined} />
      <Recognise data={undefined} />
      <Footer />
    </>
  )
}

export default About
