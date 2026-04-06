---
sidebar_position: 2
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';


# Quick Start Guide

Get up and running with the Push Messaging API in minutes. This guide will walk you through the essential steps to start sending messages.

## Prerequisites

Before you begin, ensure you have:

- A valid account with the <a href="https://push-sso.esoko.com/en/signup/" target="_blank" rel="noopener noreferrer" style={{fontSize: '1.2rem', fontWeight: '700'}}>Messaging service</a>
- Basic understanding of REST APIs
- Tools like cURL, Postman, or HTTP client libraries

<!-- ## Step 1: Create API Client

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

⚠️ **Important**: Save your `clientKey` and `clientSecret` securely. You won't be able to retrieve the secret again! -->

## Step 1: Authenticate

Login to get your access token:

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/auth/sso-login" 
  body={{
    "email": "your-email@example.com",
    "password": "your-password"
  }}
/>

**Response:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Login successful",\n  "data": {\n    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n    "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",\n    "expiresIn": 3600\n  }\n}`} 
/>

Save the `accessToken` - you'll need it for all authenticated requests.

## Step 2: Create Sender ID

Register a sender ID for your messages:

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sender-id" 
  body={{
    "name": "MYCOMPANY"
  }}
/>

**Response:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully created sender id"\n}`} 
/>

✅ Your sender ID will be reviewed and activated within 24-48 hours.

## Step 3: Send Your First SMS

Once your sender ID is approved, send a test message:

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/send" 
  body={{
    "recipients": ["+23354*******"],
    "message": "Hello from Push Messaging API!",
    "sender": "MYCOMPANY"
  }}
/>

**Response:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "phoneNumber": "+23354*******",\n      "reference": "4db7f1c5-af00-4e7a-9d65-bf4ab38e5fef"\n    }\n  ]\n}`} 
/>

🎉 Congratulations! You've successfully sent your first SMS message.

## Step 4: Check Your Balance

Monitor your account balance:

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/balance" 
/>

**Response:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "balance": "150.50",\n    "currency": "GHS",\n    "lastUpdated": "2026-02-16T08:46:52.595Z"\n  }\n}`} 
/>

## Next Steps

Now that you've mastered the basics, explore more features:

### Send Bulk Messages

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/send" 
  body={{
    "recipients": [
      "+23354*******",
      "+23350*******",
      "+23324*******"
    ],
    "message": "Bulk message to multiple recipients",
    "sender": "MYCOMPANY"
  }}
/>

### Schedule a Message

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/sms/schedule" 
  body={{
    "recipients": ["+23354*******"],
    "message": "Scheduled message",
    "sender": "MYCOMPANY",
    "schedule": "2026-02-20T09:00:00.000Z"
  }}
/>

### Send Voice Message

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/files/upload" 
  isFormData={true}
  body={{
    "file": "@ voice-message.mp3"
  }}
/>
<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/calls/initiate" 
  body={{
    "recipients": ["054*******"],
    "audioFileName": "UPLOADED_FILE_ID"
  }}
/>

### Create Contact Group

Upload an Excel or CSV file with contacts:

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/contacts/groups" 
  isFormData={true}
  body={{
    "name": "Marketing List",
    "file": "@ contacts.xlsx"
  }}
/>

## Authentication Headers Reference

All authenticated requests require these headers:

<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer PM_...`} 
/>

Optional for multi-account management:
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`x-account-id: <accountId>`} 
/>

## Common Use Cases

### 1. Transactional Messages
Send OTPs, order confirmations, alerts:
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "recipients": ["+23354*******"],\n  "message": "Your OTP is 123456. Valid for 10 minutes.",\n  "sender": "MYAPP"\n}`} 
/>

### 2. Marketing Campaigns
Send promotional messages to contact groups:
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "groupId": "your-group-id",\n  "message": "Special offer! Get 20% off this weekend.",\n  "sender": "MYSTORE"\n}`} 
/>

### 3. Appointment Reminders
Schedule reminder messages:
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "recipients": ["+23354*******"],\n  "message": "Reminder: Your appointment is tomorrow at 2 PM.",\n  "sender": "CLINIC",\n  "schedule": "2026-02-20T08:00:00.000Z"\n}`} 
/>

### 4. Emergency Notifications
Use voice calls for urgent alerts:
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "recipients": ["054*******", "0500318982"],\n  "audioFileName": "emergency-alert-file-id"\n}`} 
/>

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
