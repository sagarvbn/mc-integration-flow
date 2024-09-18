# MPGS Integration Guide

Official Mastercard Payment Gateway Service (MPGS) documentation:

https://ap-gateway.mastercard.com/api/documentation/integrationGuidelines/index.html?locale=en_US

- [Orders and Transaction](https://ap-gateway.mastercard.com/api/documentation/integrationGuidelines/supportedFeatures/ordersAndTransactions.html?locale=en_US#:~:text=An%20order%20can,account%20to%20yours.)
- [Transaction Operations](https://ap-gateway.mastercard.com/api/documentation/integrationGuidelines/supportedFeatures/pickTransactionCommands.html?locale=en_US#x_initial)

---

### TEST Credentials

```
Card Number: 4005555555000009
Expiry: 01/39
CVV: 100
```

[Standard test data – all supported regions](https://ap-gateway.mastercard.com/api/documentation/integrationGuidelines/supportedFeatures/testAndGoLive.html?locale=en_US)

---

### APIs

Base URL: https://mtf.gateway.mastercard.com/api/rest/version/77/merchant/{{MERCHANT_ID}}

#### Hosted Checkout
- Initiate Checkout

#### Direct Checkout
- Check PG Connection
- Authorise Transaction
- Capture Transaction

---
