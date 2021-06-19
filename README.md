This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# instructions

1. npm install
2. create file `.env.local` and set the Google Client ID as `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
3. npm run dev

# `access_token` versus `id_token`

* In `components/AuthButton.tsx` the raw `providerData` is used to send both the
  `access_token` and the `id_token` to a lambda endpoint for backend verification.
* The lambda implementation is in `pages/api/verify_auth.ts`. Adjust the variable
  `whichTokenToUse` - if set to `'idToken'` the credentials will be verified, and
  verification will fail otherwise.
  
