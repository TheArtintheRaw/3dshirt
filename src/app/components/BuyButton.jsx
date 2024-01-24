import Script from 'next/script'

export default function BuyButton() {
  return ( 
    <Script id="BuyButton" async src="https://js.stripe.com/v3/buy-button.js"></Script>
    <stripe-buy-button
      buy-button-id="buy_btn_1OcEDZBZCXWBKpoPYkGtwWeT"
      publishable-key="pk_live_51MjrgzBZCXWBKpoPnqjHnrVWc0BDO9tv0ew7PzudLCeJj0W9hDyf1mwr60jolMHap180Y4QyQrdGx5cjX3RNZXkh00WZ3Lr6UZ"
    >
    </stripe-buy-button>
  );
}
