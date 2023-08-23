import Footer from '@modules/SiteFooter'
import Header from '@components/common/Header/Header'
import Breadcrumb from '@modules/Breadcrumb/breadcrumb'
import EligibilityContent from '@modules/Eligibility/eligibility'
import { useEffect } from 'react'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

const items = [{ name: 'Eligibility', url: '/' }]

const Eligibility = () => {
  useEffect(() => {
    triggerTrackEvent.marvelNavbarNavigation('eligibility_pw_marvels')
    //console.log('Event triggered: ')
  }, [])
  return (
    <>
      <Header variant="MARVELSHeader" />
      <Breadcrumb items={items} title="Eligibility" homeLink="/" />
      <EligibilityContent />
      <Footer />
    </>
  )
}

export default Eligibility
