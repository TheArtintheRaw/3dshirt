import { loadStripe } from '@stripe/stripe-js'
import { useSnapshot } from 'valtio'
import state from '%/store'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CreateOrder = async () => {
  const snap = useSnapshot(state)

  const handleBuyNow = async () => {
    try {
      const stripe = await stripePromise

      const externalId = externalId
      const label = label
      const variantId = snap.variantId
      const logoDecal = snap.logoDecal
      const logoScale = snap.logoScale
      const logoX = snap.logoPosition.x
      const logoY = snap.logoPosition.y
      const quantity = quantity

      const { shipping } = await stripe.checkout.sessions.retrieve(sessionId)
      const { firstName, lastName, email, phone, country, region, address1, address2, city, postalCode } = shipping

      // Create the order on the server-side and get the session ID
      const response = await fetch('/api/create_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalId,
          label,
          printProviderId: 50,
          blueprintId: 36,
          variantId,
          logoDecal,
          logoScale,
          logoX,
          logoY,
          angle: 0,
          quantity: 1,
          sendShippingNotification: false,
          firstName,
          lastName,
          email,
          phone,
          country,
          region,
          address1,
          address2,
          city,
          postalCode,
        }),
      })

      if (response.ok) {
        const { sessionId } = await response.json()

        // Redirect the user to the Stripe Checkout page
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        })

        if (error) {
          console.error('Error:', error.message)
          // Handle error during redirection
        }
      } else {
        const { error } = await response.json()
        console.error('Error:', error)
        // Handle error in order creation
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle any network or server errors
    }
  }

  return handleBuyNow
}

export default CreateOrder
