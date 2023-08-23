import { useEffect } from 'react'
import { useUI } from '@components/ui'
import { Login } from '@modules/Screens'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const { user } = useUI()
  const router = useRouter()
  useEffect(() => {
    if (user) {
      router.replace('/profile-details')
    }
  }, [user])
  return <Login />
}
