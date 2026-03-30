---
sidebar_position: 5
---

# SMS

Send and manage SMS messages. This section covers sending individual messages, scheduling, resending, and group messaging.

## Send SMS

Sends an SMS message to one or more recipients.

**Endpoint:** `POST /api/v1/sms/send`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


Content-Type: application/json
```

**Body:**
```json
{
  "recipients": ["+233547071660"],
  "message": "Hello, this is a test message.",
  "sender": "Esoko"
}
```

### Parameters

| Field      | Type     | Required | Description                                      | Example                        |
|------------|----------|----------|--------------------------------------------------|--------------------------------|
| recipients | array    | Yes      | Array of phone numbers in international format   | ["+233547071660"]             |
| message    | string   | Yes      | Message content (max 160 chars for single SMS)   | "Hello, this is a test message"|
| sender     | string   | Yes      | Sender ID (must be pre-approved)                 | "Esoko"                        |

### Response

**Status Code:** `201 Created`

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
  "data": [
    {
      "phoneNumber": "233547071660",
      "reference": "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef"
    }
  ]
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/send \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["+233547071660"],
    "message": "Hello, this is a test message.",
    "sender": "Esoko"
}'
```

---

## Send SMS to Multiple Recipients

Sends the same message to multiple phone numbers.

**Endpoint:** `POST /api/v1/sms/send`

**Request Body:**
```json
{
  "recipients": ["+233547071660", "+233500318982", "+233244123456"],
  "message": "Hello to all recipients!",
  "sender": "Esoko"
}
```

**Response:**
```json
{
  "message": "Successful",
  "data": [
    {
      "phoneNumber": "233547071660",
      "reference": "ref-001"
    },
    {
      "phoneNumber": "233500318982",
      "reference": "ref-002"
    },
    {
      "phoneNumber": "233244123456",
      "reference": "ref-003"
    }
  ]
}
```

---

## Resend SMS

Resends a previously sent SMS using its reference ID.

**Endpoint:** `POST /api/v1/sms/resend`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


Content-Type: application/json
```

**Body:**
```json
{
  "references": [
    "6041c21f-b8d1-4272-be16-7c2c395ac6f9"
  ]
}
```

### Parameters

| Field      | Type     | Required | Description                                      | Example                                    |
|------------|----------|----------|--------------------------------------------------|--------------------------------------------|
| references | array    | Yes      | Array of message reference IDs to resend       | ["6041c21f-b8d1-4272-be16-7c2c395ac6f9"]  |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successful",
  "data": [
    {
      "reference": "6041c21f-b8d1-4272-be16-7c2c395ac6f9",
      "phoneNumber": "233536369414"
    }
  ]
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/resend \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "references": [
      "6041c21f-b8d1-4272-be16-7c2c395ac6f9"
    ]
  }'
```

---

## Estimate SMS Price

Calculates the estimated cost for sending an SMS message without actually sending it.

**Endpoint:** `POST /api/v1/sms/estimate`

**Authentication:** Bearer Token

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

**Body:**
```json
{
  "recipients": ["+233547071660"],
  "message": "Hello, this is a test message.",
  "sender": "Esoko"
}
```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successful",
  "data": {
    "totalUnits": 1,
    "totalCost": 0.02,
    "currency": "GHS",
    "recipientCount": 1
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/estimate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["+233547071660"],
    "message": "Hello, this is a test message.",
    "sender": "Esoko"
  }'
```

---

## Resend SMS by Campaign

Resends all failed or pending messages for a specific campaign.

**Endpoint:** `POST /api/v1/sms/resend-by-campaign/:campaignId`

**Authentication:** Bearer Token

### Path Parameters

| Parameter | Type   | Required | Description          | Example                 |
|-----------|--------|----------|----------------------|-------------------------|
| campaignId| string | Yes      | Unique campaign ID   | "cmp_123abc456def"      |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successfully initiated resend for campaign",
  "data": {
    "campaignId": "cmp_123abc456def",
    "resendCount": 15
  }
}
```

---

## Schedule SMS

Schedules an SMS message to be sent at a future date and time.

**Endpoint:** `POST /api/v1/sms/schedule`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


Content-Type: application/json
```

**Body:**
```json
{
  "recipients": [
    "+233547071660",
    "+233500318982"
  ],
  "message": "Hello, this is a scheduled test message",
  "sender": "Esoko",
  "schedule": "2026-02-13T09:23:00.000Z"
}
```

### Parameters

| Field      | Type     | Required | Description                                      | Example                          |
|------------|----------|----------|--------------------------------------------------|----------------------------------|
| recipients | array    | Yes      | Array of phone numbers                           | ["+233547071660"]               |
| message    | string   | Yes      | Message content                                  | "Scheduled message"              |
| sender     | string   | Yes      | Sender ID                                        | "Esoko"                          |
| schedule   | string   | Yes      | ISO 8601 formatted datetime (UTC)                | "2026-02-13T09:23:00.000Z"      |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successfully scheduled SMS",
  "data": {
    "scheduledId": "sch_abc123def456",
    "scheduledFor": "2026-02-13T09:23:00.000Z",
    "recipientCount": 2
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/schedule \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": [
      "+233547071660",
      "+233500318982"
    ],
    "message": "Hello, this is a scheduled test message",
    "sender": "Esoko",
    "schedule": "2026-02-13T09:23:00.000Z"
  }'
```

---

## Send SMS to Group

Sends an SMS message to all contacts in a specific group.

**Endpoint:** `POST /api/v1/sms/send-to-group`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


Content-Type: application/json
```

**Body:**
```json
{
  "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
  "message": "Hello to the entire group!",
  "sender": "Esoko"
}
```

### Parameters

| Field     | Type     | Required | Description                                      | Example                              |
|-----------|----------|----------|--------------------------------------------------|--------------------------------------|
| groupId   | string   | Yes      | UUID of the contact group                        | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |
| message   | string   | Yes      | Message content                                  | "Group message"                      |
| sender    | string   | Yes      | Sender ID                                        | "Esoko"                              |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successfully sent SMS to group",
  "data": {
    "totalRecipients": 150,
    "successfulSends": 148,
    "failedSends": 2,
    "references": [
      {
        "phoneNumber": "233547071660",
        "reference": "grp-ref-001"
      },
      {
        "phoneNumber": "233500318982",
        "reference": "grp-ref-002"
      }
    ]
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/send-to-group \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "message": "Hello to the entire group!",
    "sender": "Esoko"
  }'
```

---

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/send-to-group \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": "233201234567", "233201234568",
    "message": "Hello to the entire group!",
    "sender": "Esoko"
  }'
```

---

## Get SMS Status

Retrieves the delivery status of a sent SMS message.

**Endpoint:** `GET /api/v1/sms/status/:reference`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


```

### Path Parameters

| Parameter | Type   | Required | Description                    | Example                                |
|-----------|--------|----------|--------------------------------|----------------------------------------|
| reference | string | Yes      | Message reference ID           | "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef" |

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successful",
  "data": {
    "reference": "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef",
    "phoneNumber": "233547071660",
    "status": "DELIVERED",
    "sentAt": "2026-02-12T11:10:45.000Z",
    "deliveredAt": "2026-02-12T11:10:50.000Z"
  }
}
```

### Status Values

| Status       | Description                                    |
|--------------|------------------------------------------------|
| PENDING      | Message is queued for delivery                 |
| SENT         | Message has been sent to carrier               |
| DELIVERED    | Message successfully delivered to recipient    |
| FAILED       | Message delivery failed                        |
| EXPIRED      | Message expired before delivery                |
| REJECTED     | Message rejected by carrier or recipient       |

### Example

```bash
curl -X GET https://messaging-api.esoko.com/api/v1/sms/status/4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
 
```

---

## Cancel Scheduled SMS

Cancels a scheduled SMS before it's sent.

**Endpoint:** `DELETE /api/v1/sms/schedule/:scheduledId`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successfully cancelled scheduled SMS"
}
```

### Example

```bash
curl -X DELETE https://messaging-api.esoko.com/api/v1/sms/schedule/sch_abc123def456 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  
```

---

## Error Responses

### Invalid Phone Number (400 Bad Request)
```json
{
  "message": "Invalid phone number format",
  "errors": [
    "Phone number must be in international format"
  ]
}
```

### Message Too Long (400 Bad Request)
```json
{
  "message": "Message exceeds maximum length",
  "errors": [
    "Maximum message length is 160 characters for single SMS"
  ]
}
```

### Invalid Sender ID (400 Bad Request)
```json
{
  "message": "Invalid or unapproved sender ID"
}
```

### Insufficient Balance (402 Payment Required)
```json
{
  "message": "Insufficient balance to send messages"
}
```

### Scheduled Time in Past (400 Bad Request)
```json
{
  "message": "Schedule time must be in the future"
}
```

---

## Best Practices

1. **Phone Number Format**: Always use international format (+233...)
2. **Message Length**: Keep messages under 160 characters to avoid multi-part charges
3. **Sender ID**: Use only approved sender IDs
4. **Rate Limiting**: Implement batching for large volumes
5. **Error Handling**: Handle failed deliveries gracefully
6. **Testing**: Test with small batches before大规模 sends
7. **Scheduling**: Schedule messages considering recipient time zones
8. **Opt-out**: Honor STOP/UNSUBSCRIBE requests promptly

## Message Encoding

- **GSM 7-bit**: Standard alphabet (160 characters max)
- **Unicode**: Special characters, emojis (70 characters max)

Messages exceeding the limit are split into multiple parts (153 characters per part for concatenated SMS).

## Tips

- Store reference IDs for tracking and resending
- Monitor delivery rates to identify potential issues
- Use descriptive sender IDs for better recognition
- Consider time zones when scheduling messages
- Implement webhook callbacks for real-time status updates
