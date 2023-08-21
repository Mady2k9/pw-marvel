import globalProps from './globalProps'
import useIsomorphicLayoutEffect from '@lib/useIsomorphicLayoutEffect'

const useAttachUtmParamsToGlobalProps = () => {
  // here useIsomorphicLayoutEffect is used so that we set the utmParams in globalProps before
  // landingPageViewed event is fired in useEffect
  // also we are not getting query param values using URLSearchParams rather than router.query
  // to ensure params are set before landingPageViewed event is fired
  useIsomorphicLayoutEffect(() => {
    // utm_source=uc_test_source&utm_campaign=uc_test_campaign&utm_medium=uc_test_medium
    const urlParams = new URLSearchParams(window.location.search)

    if (
      urlParams.get('utm_source') ||
      urlParams.get('utm_campaign') ||
      urlParams.get('utm_medium')
    ) {
      globalProps.utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_medium: urlParams.get('utm_medium'),
      }
    }
  }, [])
}

export default useAttachUtmParamsToGlobalProps
