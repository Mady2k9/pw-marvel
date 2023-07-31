import Footer from '@modules/SiteFooter'
import Header from '@components/common/Header/Header'
import Breadcrumb from '../modules/Breadcrumb'
import PrivatePolicy from '../modules/PrivatePolicy'
import { useEffect } from 'react'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

const items = [{ name: 'Private Policy', url: '/' }]

const PrivacyPolicy = () => {
  useEffect(() => {
    triggerTrackEvent.marvelNavbarNavigation('privacy_policy_pw_marvels')
    //console.log('Event triggered: ')
  }, [])
  return (
    <>
      <Header variant="MARVELSHeader" />
      <Breadcrumb items={items} title={'Private & Policy'} homeLink={''} />
      <PrivatePolicy data={undefined} />
      <Footer />
    </>
  )
}

export default PrivacyPolicy
