---
sidebar_position: 3
---

# Sender ID

The Sender ID is the identity that appears as the sender of your messages. This section covers creating and managing sender IDs.

## Request Sender ID

Creates a new sender ID for your messaging campaigns.

**Endpoint:** `POST /api/v1/sender-id`

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
  "name": "Esoko"
}
```

### Parameters

| Field | Type   | Required | Description                          | Example   |
|-------|--------|----------|--------------------------------------|-----------|
| name  | string | Yes      | The sender ID name (max 11 chars)  | "Esoko"   |

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
  "message": "Successfully created sender id"
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sender-id \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Esoko"
  }'
```

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

```json
{
  "recipients": ["+23354*******"],
  "message": "Hello from Esoko!",
  "sender": "Esoko"
}
```

---

## Error Responses

### Invalid Format (400 Bad Request)
```json
{
  "message": "Invalid sender ID format",
  "errors": [
    "Sender ID must be 3-11 alphanumeric characters"
  ]
}
```

### Already Exists (409 Conflict)
```json
{
  "message": "Sender ID already exists"
}
```

### Unauthorized (401 Unauthorized)
```json
{
  "message": "Invalid or expired access token"
}
```

---

## Tips

- Choose a sender ID that represents your brand clearly
- Submit multiple sender IDs if needed for different message types
- Allow 24-48 hours for approval in regulated regions
- Test with a small batch before大规模 sending
