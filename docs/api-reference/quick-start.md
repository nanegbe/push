---
sidebar_position: 2
---

# Quick Start Guide

Get up and running with the Push Messaging API in minutes. This guide will walk you through the essential steps to start sending messages.

## Prerequisites

Before you begin, ensure you have:

- A valid account with the messaging service
- Internet connectivity
- Basic understanding of REST APIs
- Tools like cURL, Postman, or HTTP client libraries

## Step 1: Create API Client

First, create an API client to get your credentials:

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/api-clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-app"
  }'
```

**Response:**
```json
{
  "message": "Successfully created API client",
  "data": {
    "clientKey": "abc123def456",
    "clientSecret": "your-secret-key-here"
  }
}
```

⚠️ **Important**: Save your `clientKey` and `clientSecret` securely. You won't be able to retrieve the secret again!

## Step 2: Authenticate

Login to get your access token:

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/auth/sso-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
    "expiresIn": 3600
  }
}
```

Save the `accessToken` - you'll need it for all authenticated requests.

## Step 3: Create Sender ID

Register a sender ID for your messages:

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sender-id \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MYCOMPANY"
  }'
```

**Response:**
```json
{
  "message": "Successfully created sender id"
}
```

✅ Your sender ID will be reviewed and activated within 24-48 hours.

## Step 4: Send Your First SMS

Once your sender ID is approved, send a test message:

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/send \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["+23354*******"],
    "message": "Hello from Push Messaging API!",
    "sender": "MYCOMPANY"
  }'
```

**Response:**
```json
{
  "message": "Successful",
  "data": [
    {
      "phoneNumber": "+23354*******",
      "reference": "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef"
    }
  ]
}
```

🎉 Congratulations! You've successfully sent your first SMS message.

## Step 5: Check Your Balance

Monitor your account balance:

```bash
curl -X GET https://messaging-api.esoko.com/api/v1/balance \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "x-account-id: YOUR_ACCOUNT_ID"
```

**Response:**
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

## Next Steps

Now that you've mastered the basics, explore more features:

### Send Bulk Messages

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/send \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": [
      "+23354*******",
      "+23350*******",
      "+23324*******"
    ],
    "message": "Bulk message to multiple recipients",
    "sender": "MYCOMPANY"
  }'
```

### Schedule a Message

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/sms/schedule \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["+23354*******"],
    "message": "Scheduled message",
    "sender": "MYCOMPANY",
    "schedule": "2026-02-20T09:00:00.000Z"
  }'
```

### Send Voice Message

```bash
# 1. Upload voice file
curl -X POST https://messaging-api.esoko.com/api/v1/files/upload \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@voice-message.mp3"

# 2. Send voice message
curl -X POST https://messaging-api.esoko.com/api/v1/calls/initiate \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["0547071660"],
    "audioFileName": "UPLOADED_FILE_ID"
  }'
```

### Create Contact Group

Upload an Excel or CSV file with contacts:

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/contacts/groups \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "name=Marketing List" \
  -F "file=@contacts.xlsx"
```

## Authentication Headers Reference

All authenticated requests require these headers:

```
Authorization: Bearer <accessToken>

```

Optional for multi-account management:
```
x-account-id: <accountId>
```

## Common Use Cases

### 1. Transactional Messages
Send OTPs, order confirmations, alerts:
```json
{
  "recipients": ["+23354*******"],
  "message": "Your OTP is 123456. Valid for 10 minutes.",
  "sender": "MYAPP"
}
```

### 2. Marketing Campaigns
Send promotional messages to contact groups:
```json
{
  "groupId": "your-group-id",
  "message": "Special offer! Get 20% off this weekend.",
  "sender": "MYSTORE"
}
```

### 3. Appointment Reminders
Schedule reminder messages:
```json
{
  "recipients": ["+23354*******"],
  "message": "Reminder: Your appointment is tomorrow at 2 PM.",
  "sender": "CLINIC",
  "schedule": "2026-02-20T08:00:00.000Z"
}
```

### 4. Emergency Notifications
Use voice calls for urgent alerts:
```json
{
  "recipients": ["0547071660", "0500318982"],
  "audioFileName": "emergency-alert-file-id"
}
```

## Error Handling

Always check response status codes:

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Request completed successfully |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Check request parameters |
| 401 | Unauthorized | Check access token |
| 402 | Payment Required | Insufficient balance |
| 403 | Forbidden | Invalid credentials |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |

## Best Practices

1. **Security**
   - Store credentials in environment variables
   - Never expose secrets in client-side code
   - Use HTTPS in production

2. **Error Handling**
   - Implement retry logic for failed requests
   - Log all API responses for debugging
   - Handle rate limits gracefully

3. **Cost Management**
   - Monitor balance regularly
   - Set up low balance alerts
   - Test with small batches first

4. **Message Quality**
   - Keep messages concise (under 160 chars)
   - Use clear, professional language
   - Include opt-out instructions for marketing messages

<!-- ## Testing

Use our sandbox environment for testing:

```bash
# Replace base URL with sandbox endpoint
curl -X POST https://sandbox-api.example.com/api/v1/sms/send \
  ...
``` -->

## Support Resources

- 📖 [Full API Documentation](/docs/api-reference)
- 🔧 [API Status Page](#)
- 💬 [Developer Community](#)
- 📧 [Support Email](mailto:support@example.com)

## What's Next?

- Explore advanced features like message personalization
- Integrate webhooks for real-time delivery updates
- Build custom integrations using our SDKs
- Learn about A/B testing for campaigns

Ready to build something amazing? Check out the [API Reference](/docs/api-reference) for complete endpoint documentation.
