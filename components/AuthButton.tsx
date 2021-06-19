import React from 'react'
import { PwaAuth } from '@pwabuilder/pwaauth'

import '@pwabuilder/pwaauth'

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
console.log('client id', googleClientId)
const verifyCredentialsEndpoint = '/api/verify_auth'

const AuthButton = () => {
  const ref = React.useRef<PwaAuth>()

  React.useEffect(() => {
    const pwaAuth: PwaAuth | undefined = ref.current

    if (!pwaAuth) return

    pwaAuth.addEventListener('signin-completed', ev => {
      const signIn = ev.detail
      if (signIn.error) {
        console.error('Sign in failed', signIn.error)
      } else {
        console.log('Email: ', signIn.email)
        console.log('Name: ', signIn.name)
        console.log('Picture: ', signIn.imageUrl)
        console.log('Access token', signIn.accessToken)
        console.log(
          'Access token expiration date',
          signIn.accessTokenExpiration
        )
        console.log('Provider (MS, Google, FB): ', signIn.provider)
        console.log(
          'Raw data from provider: ',
          JSON.stringify(signIn.providerData, null, 2)
        )

        console.log(signIn.providerData.mc)

        const accessToken = signIn.providerData.mc.access_token
        const idToken = signIn.providerData.mc.id_token

        console.log({ accessToken, idToken })
        ;(async () => {
          const result = await fetch(verifyCredentialsEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              provider: signIn.provider,
              accessToken,
              idToken,
            }),
          })

          console.log('result', result.status, await result.text())
        })()
      }
    })
  }, [ref])

  return <pwa-auth ref={ref} googlekey={googleClientId} />
}

export default AuthButton
