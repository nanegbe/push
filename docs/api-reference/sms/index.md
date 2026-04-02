---
sidebar_position: 5
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';



# SMS

Send and manage SMS messages. This section covers sending individual messages, scheduling, resending, and group messaging.

## Send SMS

Sends an SMS message to one or more recipients.

**Endpoint:** `POST {{baseUrl}}/sms/send`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nContent-Type: application/json`} 
/>

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "recipients": ["+23354*******"],\n  "message": "Hello, this is a test message.",\n  "sender": "Esoko"\n}`} 
/>

### Parameters

| Field      | Type     | Required | Description                                      | Example                        |
|------------|----------|----------|--------------------------------------------------|--------------------------------|
| recipients | array    | Yes      | Array of phone numbers in international format   | ["+23354*******"]             |
| message    | string   | Yes      | Message content (max 160 chars for single SMS)   | "Hello, this is a test message"|
| sender     | string   | Yes      | Sender ID (must be pre-approved)                 | "Esoko"                        |

### Response

**Status Code:** `201 Created`

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
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "phoneNumber": "23354*******",\n      "reference": "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef"\n    }\n  ]\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/send" 
  body={{
    "groupIds": ["group-id-1", "group-id-2"],
    "recipients": ["23320*******", "23320*******"],
    "message": "Promo message",
    "senderId": "eSMS"
  }}
/>

---

## Send SMS to Multiple Recipients

Sends the same message to multiple phone numbers.

**Endpoint:** `POST {{baseUrl}}/sms/send`

**Request Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "groupIds": ["group-id-1", "group-id-2"],\n  "recipients": ["+23354*******", "+23350*******", "+23324*******"],\n  "message": "Hello to all recipients!",\n  "sender": "Esoko"\n}`} 
/>

**Response:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "phoneNumber": "23354*******",\n      "reference": "ref-001"\n    },\n    {\n      "phoneNumber": "23350*******",\n      "reference": "ref-002"\n    },\n    {\n      "phoneNumber": "23324*******",\n      "reference": "ref-003"\n    }\n  ]\n}`} 
/>

---

## Resend SMS

Resends a previously sent SMS using its reference ID.

**Endpoint:** `POST {{baseUrl}}/sms/resend`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nContent-Type: application/json`} 
/>

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "references": [\n    "6041c21f-b8d1-4272-be16-7c2c395ac6f9"\n  ]\n}`} 
/>

### Parameters

| Field      | Type     | Required | Description                                      | Example                                    |
|------------|----------|----------|--------------------------------------------------|--------------------------------------------|
| references | array    | Yes      | Array of message reference IDs to resend       | ["6041c21f-b8d1-4272-be16-7c2c395ac6f9"]  |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "reference": "6041c21f-b8d1-4272-be16-7c2c395ac6f9",\n      "phoneNumber": "23353*******"\n    }\n  ]\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/resend" 
  body={{
    "references": [
      "6041c21f-b8d1-4272-be16-7c2c395ac6f9"
    ]
  }}
/>

---

## Estimate SMS Price

Calculates the estimated cost for sending an SMS message without actually sending it.

**Endpoint:** `POST {{baseUrl}}/sms/estimate`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nContent-Type: application/json`} 
/>

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "groupIds": ["group-id-1"],\n  "recipients": ["+23354*******"],\n  "message": "Hello, this is a test message.",\n  "sender": "Esoko"\n}`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "totalUnits": 1,\n    "totalCost": 0.02,\n    "currency": "GHS",\n    "recipientCount": 1\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/estimate" 
  body={{
    "groupIds": ["group-id-1"],
    "recipients": ["+23354*******"],
    "message": "Hello, this is a test message.",
    "sender": "Esoko"
  }}
/>

---

## Resend SMS by Campaign

Resends all failed or pending messages for a specific campaign.

**Endpoint:** `POST {{baseUrl}}/sms/resend-by-campaign/:campaignId`

**Authentication:** Bearer Token

### Path Parameters

| Parameter | Type   | Required | Description          | Example                 |
|-----------|--------|----------|----------------------|-------------------------|
| campaignId| string | Yes      | Unique campaign ID   | "cmp_123abc456def"      |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully initiated resend for campaign",\n  "data": {\n    "campaignId": "cmp_123abc456def",\n    "resendCount": 15\n  }\n}`} 
/>

---

## Schedule SMS

Schedules an SMS message to be sent at a future date and time.

**Endpoint:** `POST {{baseUrl}}/sms/schedule`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nContent-Type: application/json`} 
/>

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "groupIds": ["group-id-1"],\n  "recipients": [\n    "+23354*******",\n    "+23350*******"\n  ],\n  "message": "Hello, this is a scheduled test message",\n  "sender": "Esoko",\n  "schedule": "2026-02-13T09:23:00.000Z"\n}`} 
/>

### Parameters

| Field      | Type     | Required | Description                                      | Example                          |
|------------|----------|----------|--------------------------------------------------|----------------------------------|
| recipients | array    | Yes      | Array of phone numbers                           | ["+23354*******"]               |
| message    | string   | Yes      | Message content                                  | "Scheduled message"              |
| sender     | string   | Yes      | Sender ID                                        | "Esoko"                          |
| schedule   | string   | Yes      | ISO 8601 formatted datetime (UTC)                | "2026-02-13T09:23:00.000Z"      |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully scheduled SMS",\n  "data": {\n    "scheduledId": "sch_abc123def456",\n    "scheduledFor": "2026-02-13T09:23:00.000Z",\n    "recipientCount": 2\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/schedule" 
  body={{
    "groupIds": ["group-id-1"],
    "recipients": [
      "+23354*******",
      "+23354*******"
    ],
    "message": "Hello, this is a scheduled test message",
    "sender": "Esoko",
    "schedule": "2026-02-13T09:23:00.000Z"
  }}
/>

---

## Send SMS to Group

Sends an SMS message to all contacts in a specific group.

**Endpoint:** `POST {{baseUrl}}/sms/send-to-group`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nContent-Type: application/json`} 
/>

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",\n  "message": "Hello to the entire group!",\n  "sender": "Esoko"\n}`} 
/>

### Parameters

| Field     | Type     | Required | Description                                      | Example                              |
|-----------|----------|----------|--------------------------------------------------|--------------------------------------|
| groupId   | string   | Yes      | UUID of the contact group                        | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |
| message   | string   | Yes      | Message content                                  | "Group message"                      |
| sender    | string   | Yes      | Sender ID                                        | "Esoko"                              |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully sent SMS to group",\n  "data": {\n    "totalRecipients": 150,\n    "successfulSends": 148,\n    "failedSends": 2,\n    "references": [\n      {\n        "phoneNumber": "23354*******",\n        "reference": "grp-ref-001"\n      },\n      {\n        "phoneNumber": "23354*******",\n        "reference": "grp-ref-002"\n      }\n    ]\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/send-to-group" 
  body={{
    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "message": "Hello to the entire group!",
    "sender": "Esoko"
  }}
/>

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/send-to-group" 
  body={{
    "recipients": ["23320*******", "23320*******"],
    "message": "Hello to the entire group!",
    "sender": "Esoko"
  }}
/>

---

## Get SMS Status

Retrieves the delivery status of a sent SMS message.

**Endpoint:** `GET {{baseUrl}}/sms/status/:reference`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>`} 
/>

### Path Parameters

| Parameter | Type   | Required | Description                    | Example                                |
|-----------|--------|----------|--------------------------------|----------------------------------------|
| reference | string | Yes      | Message reference ID           | "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef" |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "reference": "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef",\n    "phoneNumber": "23354*******",\n    "status": "DELIVERED",\n    "sentAt": "2026-02-12T11:10:45.000Z",\n    "deliveredAt": "2026-02-12T11:10:50.000Z"\n  }\n}`} 
/>

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

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/sms/status/4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef" 
/>

---

## Cancel Scheduled SMS

Cancels a scheduled SMS before it's sent.

**Endpoint:** `DELETE {{baseUrl}}/sms/schedule/:scheduledId`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully cancelled scheduled SMS"\n}`} 
/>

### Example

<ApiCodeToggler 
  method="DELETE" 
  endpoint="/api/v1/sms/schedule/sch_abc123def456" 
/>

---

## Error Responses

### Invalid Phone Number (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid phone number format",\n  "errors": [\n    "Phone number must be in international format"\n  ]\n}`} 
/>

### Message Too Long (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Message exceeds maximum length",\n  "errors": [\n    "Maximum message length is 160 characters for single SMS"\n  ]\n}`} 
/>

### Invalid Sender ID (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid or unapproved sender ID"\n}`} 
/>

### Insufficient Balance (402 Payment Required)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Insufficient balance to send messages"\n}`} 
/>

### Scheduled Time in Past (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Schedule time must be in the future"\n}`} 
/>

---

## Best Practices

1. **Phone Number Format**: Always use international format (+233...)
2. **Message Length**: Keep messages under 160 characters to avoid multi-part charges
3. **Sender ID**: Use only approved sender IDs
4. **Rate Limiting**: Implement batching for large volumes
5. **Error Handling**: Handle failed deliveries gracefully
6. **Testing**: Test with small batches before sending
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
