---
sidebar_position: 3
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';


# Sender ID

The Sender ID is the identity that appears as the sender of your messages. This section covers creating and managing sender IDs.

## Request Sender ID

Creates a new sender ID for your messaging campaigns.

**Endpoint:** `POST /api/v1/sender-id`

**Authentication:** Bearer Token + Client Credentials

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
  code={`{\n  "name": "Esoko"\n}`} 
/>

### Parameters

| Field | Type   | Required | Description                          | Example   |
|-------|--------|----------|--------------------------------------|-----------|
| name  | string | Yes      | The sender ID name (max 11 chars)  | "Esoko"   |

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
  code={`{\n  "message": "Successfully created sender id"\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sender-id" 
  body={{
    "name": "Esoko"
  }}
/>

---

## Guidelines for Sender IDs

### Format Requirements

- **Maximum Length**: 11 alphanumeric characters
- **Minimum Length**: 3 characters
- **Allowed Characters**: Letters (A-Z, a-z) and numbers (0-9)
- **No Special Characters**: Spaces, symbols, or punctuation are not allowed
- **Case Sensitivity**: Sender IDs are case-insensitive

### Best Practices

1. **Brand Recognition**: Use your company or brand name
2. **Memorable**: Keep it short and easy to remember
3. **Professional**: Avoid informal or unclear abbreviations
4. **Unique**: Ensure it's distinct from other sender IDs
5. **Compliance**: Follow local telecommunications regulations

### Examples

**Good Sender IDs:**
- `COMPANYNAME`
- `ALERTS`
- `NOTIFY`
- `INFO123`

**Invalid Sender IDs:**
- `My Company` (contains space)
- `Alert@123` (contains special character)
- `AB` (too short)
- `VeryLongName123` (exceeds 11 characters)

---

## Sender ID Approval Process

After submission, your sender ID goes through an approval process:

1. **Submission**: Send the request with your desired sender ID
2. **Validation**: System checks format requirements
3. **Approval**: Admin reviews and approves (if required)
4. **Active**: Sender ID is ready to use

### Status Codes

| Status | Description                              |
|--------|------------------------------------------|
| 200    | Successfully created                     |
| 400    | Invalid sender ID format                 |
| 409    | Sender ID already exists                 |
| 401    | Unauthorized - invalid credentials       |
| 429    | Rate limit exceeded                      |

---

## Using Your Sender ID

Once approved, use your sender ID when sending messages:

<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "recipients": ["+23354*******"],\n  "message": "Hello from Esoko!",\n  "sender": "Esoko"\n}`} 
/>

---

## Error Responses

### Invalid Format (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid sender ID format",\n  "errors": [\n    "Sender ID must be 3-11 alphanumeric characters"\n  ]\n}`} 
/>

### Already Exists (409 Conflict)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Sender ID already exists"\n}`} 
/>

### Unauthorized (401 Unauthorized)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid or expired access token"\n}`} 
/>

---

## Tips

- Choose a sender ID that represents your brand clearly
- Submit multiple sender IDs if needed for different message types
- Allow 24-48 hours for approval in regulated regions
- Test with a small batch before大规模 sending
