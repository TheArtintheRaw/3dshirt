'use client'

import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe script
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PreviewPage() {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      // You can use the `sessionId` to retrieve the payment status
      // (e.g., by calling your backend server)
      console.log(`Payment session ID: ${sessionId}`);
    }
  }, []);

  return (
    <form action='/api/checkout_sessions' method='POST'>
      <section>
        <button type='submit' role='link'>
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 100%; // Adjust width for responsiveness
            max-width: 400px; // Max width to maintain layout
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
            margin: auto; // Center the section
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}
