---
sidebar_position: 6
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';


# Balance

Manage your account balance and view transaction history. This section covers checking balance, topping up, and viewing transactions.

## Check Balance

Retrieves the current account balance.

**Endpoint:** `GET /api/v1/balance`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nx-account-id: <account-id>`} 
/>

### Headers

| Header        | Type   | Required | Description                    | Example                              |
|---------------|--------|----------|--------------------------------|--------------------------------------|
| x-account-id  | string | Yes      | Account identifier             | "acc_123456"                         |

### Response

**Status Code:** `200 OK`

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`X-Powered-By: Express\nX-RateLimit-Limit: 60\nX-RateLimit-Remaining: 59\nX-RateLimit-Reset: 60\nContent-Type: application/json; charset=utf-8`} 
/>

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "balance": "150.50",\n    "currency": "GHS",\n    "lastUpdated": "2026-02-16T08:46:52.595Z"\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/balance" 
/>

---

## Top Up Balance

Initiates a balance top-up via payment gateway.

**Endpoint:** `POST /api/v1/balance/top-up`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nx-account-id: <account-id>\nContent-Type: application/json`} 
/>

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "amount": "100.00",\n  "currency": "GHS"\n}`} 
/>

### Parameters

| Field    | Type   | Required | Description                                      | Example    |
|----------|--------|----------|--------------------------------------------------|------------|
| amount   | string | Yes      | Amount to top up                                 | "100.00"   |
| currency | string | No       | Currency code (default: GHS)                     | "GHS"      |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully topped up account balance",\n  "data": {\n    "checkoutUrl": "https://checkout.paystack.com/ni8t3kafoia65x1",\n    "reference": "topup_1770986337608"\n  }\n}`} 
/>

### Payment Flow

1. **Request Top-up**: Send POST request with amount
2. **Receive Checkout URL**: Get payment gateway URL from response
3. **Redirect User**: Redirect user to checkout URL
4. **Payment Processing**: User completes payment on gateway
5. **Confirmation**: Balance updated automatically after successful payment

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/balance/top-up" 
  body={{
    "amount": "100.00",
    "currency": "GHS"
  }}
/>

### Payment Gateway Integration

The API integrates with payment gateways like Paystack. After successful payment:

- Transaction is recorded in your account
- Balance is automatically updated
- You receive a confirmation notification (if webhooks are configured)

---

## Get Transactions

Retrieves transaction history for the account.

**Endpoint:** `GET /api/v1/balance/transactions`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nx-account-id: <account-id>`} 
/>

### Query Parameters

| Parameter | Type   | Required | Default | Description                    | Example |
|-----------|--------|----------|---------|--------------------------------|---------|
| page      | number | No       | 1       | Page number                    | 1       |
| pageSize  | number | No       | 10      | Number of items per page       | 10      |
| startDate | string | No       | -       | Filter by start date (ISO 8601)| 2026-02-01T00:00:00.000Z |
| endDate   | string | No       | -       | Filter by end date (ISO 8601)  | 2026-02-28T23:59:59.000Z |
| type      | string | No       | -       | Transaction type filter        | "CREDIT" or "DEBIT" |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "id": 3,\n      "userId": 1,\n      "amount": "10.00",\n      "reference": "504f1067-48d5-4bc9-b22d-4c177634e599",\n      "type": "DEBIT",\n      "description": "SMS Campaign - 50 messages",\n      "status": "COMPLETED",\n      "gateway": "PAYSTACK",\n      "balanceAfter": "140.50",\n      "createdAt": "2026-02-16T08:45:58.914Z",\n      "updatedAt": "2026-02-16T08:46:52.595Z"\n    },\n    {\n      "id": 2,\n      "userId": 1,\n      "amount": "70.00",\n      "reference": "833cba71-0ea9-4bb9-b567-eac275e9702c",\n      "type": "CREDIT",\n      "description": "Balance top-up",\n      "status": "COMPLETED",\n      "gateway": "PAYSTACK",\n      "balanceAfter": "150.50",\n      "createdAt": "2026-02-16T08:20:22.120Z",\n      "updatedAt": "2026-02-16T08:42:40.353Z"\n    }\n  ],\n  "meta": {\n    "total": 2,\n    "currentPage": 1,\n    "totalPages": 1,\n    "perPage": 10\n  }\n}`} 
/>

### Transaction Types

| Type   | Description                                    |
|--------|------------------------------------------------|
| CREDIT | Money added to account (top-ups, refunds)      |
| DEBIT  | Money deducted from account (sending messages) |

### Transaction Statuses

| Status    | Description                                    |
|-----------|------------------------------------------------|
| PENDING   | Transaction initiated, awaiting completion     |
| COMPLETED | Transaction successfully completed             |
| FAILED    | Transaction failed                             |
| REFUNDED  | Transaction amount refunded to account         |

### Example

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/balance/transactions?page=1&pageSize=10" 
/>

### Filtered Example

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/balance/transactions?startDate=2026-02-01T00:00:00.000Z&endDate=2026-02-28T23:59:59.000Z&type=CREDIT" 
/>

---

## Get Transaction Details

Retrieves detailed information about a specific transaction.

**Endpoint:** `GET /api/v1/balance/transactions/:transactionId`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nx-account-id: <account-id>`} 
/>

### Path Parameters

| Parameter     | Type   | Required | Description              | Example                                |
|---------------|--------|----------|--------------------------|----------------------------------------|
| transactionId | number | Yes      | Transaction ID           | 3                                      |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "id": 3,\n    "userId": 1,\n    "amount": "10.00",\n    "reference": "504f1067-48d5-4bc9-b22d-4c177634e599",\n    "type": "DEBIT",\n    "description": "SMS Campaign - 50 messages",\n    "status": "COMPLETED",\n    "gateway": "PAYSTACK",\n    "paymentMethod": "Mobile Money",\n    "metadata": {\n      "messagesSent": 50,\n      "costPerMessage": "0.20"\n    },\n    "balanceAfter": "140.50",\n    "createdAt": "2026-02-16T08:45:58.914Z",\n    "updatedAt": "2026-02-16T08:46:52.595Z"\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/balance/transactions/3" 
/>

---

## Low Balance Alert

Sets up automatic low balance notifications.

**Endpoint:** `POST /api/v1/balance/alerts`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nx-account-id: <account-id>\nContent-Type: application/json`} 
/>

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "threshold": "50.00",\n  "enabled": true,\n  "notificationEmail": "admin@example.com"\n}`} 
/>

### Parameters

| Field             | Type    | Required | Description                          | Example                  |
|-------------------|---------|----------|--------------------------------------|--------------------------|
| threshold         | string  | Yes      | Balance threshold for alert          | "50.00"                  |
| enabled           | boolean | Yes      | Enable/disable alerts                | true                     |
| notificationEmail | string  | No       | Email address for notifications      | "admin@example.com"      |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Balance alert configured successfully",\n  "data": {\n    "threshold": "50.00",\n    "enabled": true,\n    "currentBalance": "150.50"\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/balance/alerts" 
  body={{
    "threshold": "50.00",
    "enabled": true,
    "notificationEmail": "admin@example.com"
  }}
/>

---

## Error Responses

### Insufficient Balance (402 Payment Required)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Insufficient balance to complete this operation",\n  "currentBalance": "5.00",\n  "requiredAmount": "10.00"\n}`} 
/>

### Invalid Amount (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid amount",\n  "errors": [\n    "Amount must be greater than zero"\n  ]\n}`} 
/>,StartLine:378,TargetContent:

### Account Not Found (404 Not Found)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Account not found"\n}`} 
/>

### Unauthorized (401 Unauthorized)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid or expired access token"\n}`} 
/>

---

## Best Practices

1. **Monitor Balance**: Regularly check your balance to avoid service interruption
2. **Set Alerts**: Configure low balance alerts for proactive management
3. **Track Transactions**: Review transaction history for discrepancies
4. **Auto Top-up**: Consider setting up automatic top-ups for critical services
5. **Budget Planning**: Use transaction history to forecast messaging costs
6. **Multi-Account**: Use `x-account-id` header for managing multiple accounts

## Cost Estimation

Message costs are calculated based on:

- **Message Type**: SMS, Voice, etc.
- **Destination**: Country/region
- **Message Length**: Number of segments
- **Volume**: Bulk discounts may apply

### Example Pricing

| Message Type | Destination | Cost per Unit |
|--------------|-------------|---------------|
| SMS          | Ghana       | GHS 0.20      |
| SMS          | Nigeria     | GHS 0.35      |
| Voice (per min) | Ghana    | GHS 0.50      |

*Note: Actual pricing may vary. Contact sales for current rates.*

## Tips

- Keep a buffer balance for unexpected usage spikes
- Export transaction data regularly for accounting
- Set up webhooks for real-time balance updates
- Review monthly statements for optimization opportunities
- Consider volume discounts for high-frequency sending
