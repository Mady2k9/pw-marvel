import '@assets/main.css'
import '@assets/chrome-bug.css'

import React, { FC, ReactNode, useEffect } from 'react'
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

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>
export default function MyApp({ Component, ...props }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  useAttachUtmParamsToGlobalProps()

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
