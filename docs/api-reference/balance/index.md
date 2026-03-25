---
sidebar_position: 6
---

# Balance

Manage your account balance and view transaction history. This section covers checking balance, topping up, and viewing transactions.

## Check Balance

Retrieves the current account balance.

**Endpoint:** `GET /api/v1/balance`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
x-account-id: <account-id>
```

### Headers

| Header        | Type   | Required | Description                    | Example                              |
|---------------|--------|----------|--------------------------------|--------------------------------------|
| x-account-id  | string | Yes      | Account identifier             | "acc_123456"                         |

### Response

**Status Code:** `200 OK`

**Headers:**
```
X-Powered-By: Express
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 60
Content-Type: application/json; charset=utf-8
```

**Body:**
```json
{
  "message": "Successful",
  "data": {
    "balance": "150.50",
    "currency": "GHS",
    "lastUpdated": "2026-02-16T08:46:52.595Z"
  }
}
```

### Example

```bash
curl -X GET http://localhost:3000/api/v1/balance \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -H "x-account-id: acc_123456"
```

---

## Top Up Balance

Initiates a balance top-up via payment gateway.

**Endpoint:** `POST /api/v1/balance/top-up`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
x-account-id: <account-id>
Content-Type: application/json
```

**Body:**
```json
{
  "amount": "100.00",
  "currency": "GHS"
}
```

### Parameters

| Field    | Type   | Required | Description                                      | Example    |
|----------|--------|----------|--------------------------------------------------|------------|
| amount   | string | Yes      | Amount to top up                                 | "100.00"   |
| currency | string | No       | Currency code (default: GHS)                     | "GHS"      |

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successfully topped up account balance",
  "data": {
    "checkoutUrl": "https://checkout.paystack.com/ni8t3kafoia65x1",
    "reference": "topup_1770986337608"
  }
}
```

### Payment Flow

1. **Request Top-up**: Send POST request with amount
2. **Receive Checkout URL**: Get payment gateway URL from response
3. **Redirect User**: Redirect user to checkout URL
4. **Payment Processing**: User completes payment on gateway
5. **Confirmation**: Balance updated automatically after successful payment

### Example

```bash
curl -X POST http://localhost:3000/api/v1/balance/top-up \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -H "x-account-id: acc_123456" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "100.00",
    "currency": "GHS"
  }'
```

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
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
x-account-id: <account-id>
```

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
```json
{
  "message": "Successful",
  "data": [
    {
      "id": 3,
      "userId": 1,
      "amount": "10.00",
      "reference": "504f1067-48d5-4bc9-b22d-4c177634e599",
      "type": "DEBIT",
      "description": "SMS Campaign - 50 messages",
      "status": "COMPLETED",
      "gateway": "PAYSTACK",
      "balanceAfter": "140.50",
      "createdAt": "2026-02-16T08:45:58.914Z",
      "updatedAt": "2026-02-16T08:46:52.595Z"
    },
    {
      "id": 2,
      "userId": 1,
      "amount": "70.00",
      "reference": "833cba71-0ea9-4bb9-b567-eac275e9702c",
      "type": "CREDIT",
      "description": "Balance top-up",
      "status": "COMPLETED",
      "gateway": "PAYSTACK",
      "balanceAfter": "150.50",
      "createdAt": "2026-02-16T08:20:22.120Z",
      "updatedAt": "2026-02-16T08:42:40.353Z"
    }
  ],
  "meta": {
    "total": 2,
    "currentPage": 1,
    "totalPages": 1,
    "perPage": 10
  }
}
```

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

```bash
curl -X GET "http://localhost:3000/api/v1/balance/transactions?page=1&pageSize=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -H "x-account-id: acc_123456"
```

### Filtered Example

```bash
curl -X GET "http://localhost:3000/api/v1/balance/transactions?startDate=2026-02-01T00:00:00.000Z&endDate=2026-02-28T23:59:59.000Z&type=CREDIT" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -H "x-account-id: acc_123456"
```

---

## Get Transaction Details

Retrieves detailed information about a specific transaction.

**Endpoint:** `GET /api/v1/balance/transactions/:transactionId`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
x-account-id: <account-id>
```

### Path Parameters

| Parameter     | Type   | Required | Description              | Example                                |
|---------------|--------|----------|--------------------------|----------------------------------------|
| transactionId | number | Yes      | Transaction ID           | 3                                      |

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successful",
  "data": {
    "id": 3,
    "userId": 1,
    "amount": "10.00",
    "reference": "504f1067-48d5-4bc9-b22d-4c177634e599",
    "type": "DEBIT",
    "description": "SMS Campaign - 50 messages",
    "status": "COMPLETED",
    "gateway": "PAYSTACK",
    "paymentMethod": "Mobile Money",
    "metadata": {
      "messagesSent": 50,
      "costPerMessage": "0.20"
    },
    "balanceAfter": "140.50",
    "createdAt": "2026-02-16T08:45:58.914Z",
    "updatedAt": "2026-02-16T08:46:52.595Z"
  }
}
```

### Example

```bash
curl -X GET http://localhost:3000/api/v1/balance/transactions/3 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -H "x-account-id: acc_123456"
```

---

## Low Balance Alert

Sets up automatic low balance notifications.

**Endpoint:** `POST /api/v1/balance/alerts`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
x-account-id: <account-id>
Content-Type: application/json
```

**Body:**
```json
{
  "threshold": "50.00",
  "enabled": true,
  "notificationEmail": "admin@example.com"
}
```

### Parameters

| Field             | Type    | Required | Description                          | Example                  |
|-------------------|---------|----------|--------------------------------------|--------------------------|
| threshold         | string  | Yes      | Balance threshold for alert          | "50.00"                  |
| enabled           | boolean | Yes      | Enable/disable alerts                | true                     |
| notificationEmail | string  | No       | Email address for notifications      | "admin@example.com"      |

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Balance alert configured successfully",
  "data": {
    "threshold": "50.00",
    "enabled": true,
    "currentBalance": "150.50"
  }
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/balance/alerts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -H "x-account-id: acc_123456" \
  -H "Content-Type: application/json" \
  -d '{
    "threshold": "50.00",
    "enabled": true,
    "notificationEmail": "admin@example.com"
  }'
```

---

## Error Responses

### Insufficient Balance (402 Payment Required)
```json
{
  "message": "Insufficient balance to complete this operation",
  "currentBalance": "5.00",
  "requiredAmount": "10.00"
}
```

### Invalid Amount (400 Bad Request)
```json
{
  "message": "Invalid amount",
  "errors": [
    "Amount must be greater than zero"
  ]
}
```

### Account Not Found (404 Not Found)
```json
{
  "message": "Account not found"
}
```

### Unauthorized (401 Unauthorized)
```json
{
  "message": "Invalid or expired access token"
}
```

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
