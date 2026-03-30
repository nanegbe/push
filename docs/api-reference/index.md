---
sidebar_position: 1
---

# API Overview

Welcome to the Push Messaging API documentation. This API provides a comprehensive set of endpoints for sending SMS messages, voice calls, managing contacts, and handling authentication.

## Base URL

```
https://messaging-api.esoko.com/api/v1
```

Replace `localhost:3000` with your actual server URL in production.

## Authentication

The API uses one authentication method:

 **Bearer Token** - For most authenticated endpoints
<!-- 2. **Client Key & Secret** - Required alongside bearer token for rate limiting and identification -->
<!-- 3. **API Key** - Generated after initial setup -->

### Authentication Headers

Most endpoints require the following headers:

```
Authorization: Bearer <accessToken>
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Limit**: 60 requests per minute
- Headers returned with each response:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in current window
  - `X-RateLimit-Reset`: Time until the rate limit resets (in seconds)

## Common Response Format

All responses follow a consistent JSON format:

### Success Response (200/201)

```json
{
  "message": "Successful",
  "data": { ... }
}
```

### Paginated Response

```json
{
  "message": "Successful",
  "data": [ ... ],
  "meta": {
    "total": 100,
    "currentPage": 1,
    "totalPages": 10,
    "perPage": 10
  }
}
```

### Error Response

```json
{
  "message": "Error description",
  "errors": [ ... ] // Optional validation errors
}
```

## Quick Start

1. **Create an API Client** - Generate your client credentials
2. **Get Access Token** - Authenticate via SSO or API key generation
3. **Create Sender ID** - Register your sender identity
4. **Start Sending Messages** - Send SMS or voice messages to recipients

## Available Endpoints

### Authentication
- Generate API Key
- Get API Key

### Sender ID
- Request Sender ID

### Contacts
- Create Group
- Get Groups
- Update Group
- Delete Group
- Get Group Details

### SMS
- Send SMS
- Resend SMS
- Schedule SMS
- Send to Groups
- Get SMS Status

### Balance
- Check Balance
- Top Up Balance
- Get Transactions

### Voice
- Upload Voice File
- Send Voice Message
- Resend Voice Call
- Schedule Voice Message
- Send to Groups

## SDKs and Libraries

Coming soon...

## Support

For API support and questions, please contact our developer support team.
