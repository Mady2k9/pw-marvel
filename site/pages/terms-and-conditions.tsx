import Footer from '@modules/SiteFooter'
import Header from '@components/common/Header/Header'
import Breadcrumb from '@modules/Breadcrumb/breadcrumb'
import Container from '@components/ui/Container/Container'
import { useEffect } from 'react'
import triggerTrackEvent from '@modules/services/events/eventInitiator'

const items = [{ name: 'Terms & Conditions', url: '/' }]

const termsCon = () => {
  useEffect(() => {
    triggerTrackEvent.marvelNavbarNavigation('terms_and_conditions_pw_marvels')
    //console.log('Event triggered: ')
  }, [])
  return (
    <>
      <Header variant="MARVELSHeader" />
      <Breadcrumb items={items} title="Terms & Conditions" homeLink="/" />
      <Container className="mx-auto max-w-6xl py-10 flex flex-col">
        <div className="ml-5">
          <ol className="list-decimal my-4 sm:text-[16px] sm:leading-[24px] text-[14px] leading-[22px]">
            <li>
              Rewards given to students will be decided based on their combined
              performance of Stage 1 and 2. Interactive round marks given by our
              esteemed judges will be the final decision and that cannot be
              challenged.
            </li>
            <li>
              The students who can qualify the criteria mentioned here will be
              eligible for PW Marvel Awards.
            </li>
            <li>
              The final judgment of awards i.e. Cash Prizes & Medals in PW
              Marvel for every class, shall remain with Jury and Team of PW
              Marvels and the decision taken by them will be final and
              irrevocable.
            </li>
            <li>
              Only the students of Class 8th to 11th are eligible for
              self-nomination of PW Marvels.
            </li>
            <li>
              It is compulsory for the selected students to attend the PW
              Marvels felicitation function conducted by Physics Wallah based on
              the institute's notification
            </li>
            <li>
              No reward/award/prize money shall be handed over to any of the
              student's relative/guardian or his/her representative in any case.
            </li>
            <li>
              It is compulsory for the parents of the selected students to
              accompany the shortlisted students for PW Marvels felicitation
              function to become eligible for the respective rewards. No rewards
              shall be handed over to any representative under any
              circumstances.
            </li>
            <li>
              All the taxes & norms specified by the Government of India on the
              Cash Prizes shall be applied.
            </li>
            <li>The prizes & rewards are non-transferable.</li>
            <li>
              Overall Cash rewards will be paid to the students through a
              crossed cheque and shall be in favor of the student only.
            </li>
            <li>
              All legal matters shall be subject to Kota (Rajasthan)
              Jurisdiction only.
            </li>
            <li>
              To be shortlisted for the Final Round of Activity on Champion's
              Day, a candidate must have at least one achievement in the current
              session (2022-23).
            </li>
          </ol>
        </div>
      </Container>

      <Footer />
    </>
  )
}

export default termsCon
