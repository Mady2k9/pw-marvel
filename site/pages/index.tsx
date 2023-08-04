import { useEffect } from 'react'
import { useUI } from '@components/ui'
import { useRouter } from 'next/router'
import Footer from '@modules/SiteFooter'
import Header from '@components/common/Header/Header'

import triggerTrackEvent from '@modules/services/events/eventInitiator'
import {
  Banner,
  Faq,
  RewardsCard,
  NominationSteps,
  Announcement,
} from 'modules'

const Home = () => {
  const { user } = useUI()
  const router = useRouter()

  useEffect(() => {
    triggerTrackEvent.marvelLandingPage('others')
  }, [])

  useEffect(() => {
    if (user) {
      router.replace('/profile-details')
    }
  }, [user])

  return (
    <>
      <Header variant="MARVELSHeader" />
      <Announcement />
      <Banner data={undefined} />
      <RewardsCard data={undefined} />
      <NominationSteps data={undefined} />
      <Faq data={undefined} />
      <Footer />
    </>
  )
}

export default Home
