const { OAuth2Client } = require('google-auth-library')

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const client = new OAuth2Client(googleClientId)

const whichTokenToUse = 'idToken'

const handle = async (req, res) => {
  console.log(req.body)

  const { provider, accessToken, idToken } = req.body

  if (provider !== 'Google') {
    res.status(501).send('not implemented')
    return
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: whichTokenToUse === 'idToken' ? idToken : accessToken,
      audience: googleClientId,
    })
    const payload = ticket.getPayload()

    console.log(JSON.stringify(payload, null, 2))
  } catch (err) {
    console.error(err.message)
    res.status(401).send('not authorized')
  }

  res.status(200).send('ok')
}

export default handle
