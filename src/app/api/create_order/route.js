const { NextApiRequest, NextApiResponse } = require('next');

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await POST(req, res);
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

async function POST(req, res) {
  if (req.method === 'POST') {
    const orderData = {
      payload: {
        external_id: req.body.externalId,
        label: req.body.label,
        line_items: [
          {
            print_provider_id: req.body.printProviderId,
            blueprint_id: req.body.blueprintId,
            variant_id: req.body.variantId,
            print_areas: {
              front: [
                {
                  src: req.body.logoDecal,
                  scale: req.body.logoScale,
                  x: req.body.logoX,
                  y: req.body.logoY,
                  angle: req.body.angle,
                },
              ],
            },
            quantity: req.body.quantity,
          },
        ],
        shipping_method: req.body.shippingMethod,
        send_shipping_notification: req.body.sendShippingNotification,
        address_to: {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          country: req.body.country,
          region: req.body.region,
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          zip: req.body.postalCode,
        },
      },
    }

    try {
      const response = await fetch('https://api.printify.com/v1/shops/8738452/orders.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
          'User-Agent': 'Dope Sh!rt',
          Accept: 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json();
        return res.status(200).json({ data: responseData });
      } else {
        const errorResponse = await response.json();
        return res.status(response.status).json({ error: errorResponse });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(400).json({ error: 'Invalid request method' });
}