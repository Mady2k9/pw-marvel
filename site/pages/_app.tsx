import '@assets/main.css'
import '@assets/chrome-bug.css'

import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import type { AppProps } from 'next/app'
import { MarvelHead } from '@components/common'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// @ts-ignore
import NotificationWrapper from '@components/notification/NotificationWrapper'
import { ManagedUIMinimalContext } from '@components/ui/contextMinimal'
import { ManagedUIContext } from '@components/ui/context'
import { MarvelContextWrapper } from '@modules/MarvelContext'
//import { analytics } from '@modules/Analytics/Ganalytics'

import useAttachUtmParamsToGlobalProps from '@modules/services/events/useAttachUtmParamsToGlobalProps'
import globalProps from '@modules/services/events/globalProps'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>
export default function MyApp({ Component, ...props }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  useAttachUtmParamsToGlobalProps()

  const initialRender = useRef(true)

  const utmItems: any = globalProps.utmParams

  //console.log('utmItems::::25:::', utmItems)

  const [utmValue, setUtmValue] = useState(utmItems)

  useEffect(() => {
    if (
      window.localStorage.getItem('UTM_KEY') &&
      window.localStorage.getItem('UTM_KEY') !== 'undefined'
    ) {
      const storedItems = JSON.parse(localStorage.getItem('UTM_KEY') || '')
      //console.log('UTMS:32::', storedItems)
      setUtmValue(storedItems)
    }
  }, [])

  //console.log('UTMSV::38:', utmValue)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    if (
      utmItems?.utm_source &&
      utmItems?.utm_campaign &&
      utmItems?.utm_medium
    ) {
      window.localStorage.setItem('UTM_KEY', JSON.stringify(utmItems))
    }
  }, [utmItems])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <MarvelHead />
        <ManagedUIContext>
          <MarvelContextWrapper>
            <NotificationWrapper />
            <Component {...props} />
          </MarvelContextWrapper>
        </ManagedUIContext>
      </>
    </QueryClientProvider>
  )
}
