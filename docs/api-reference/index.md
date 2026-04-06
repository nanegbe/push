---
sidebar_position: 1
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';


# API Overview

Welcome to the Push Messaging API documentation. This API provides a comprehensive set of endpoints for sending SMS messages, voice calls, managing contacts, and handling authentication.

## Base URL

<ApiTerminal 
  title="BASE URL" 
  language="text" 
  code={`https://messaging-api.esoko.com/api/v1`} 
/>

<!-- Replace `localhost:3000` with your actual server URL in production. -->

## Authentication

The API uses one authentication method:

 **Bearer Token** - For most authenticated endpoints
<!-- 2. **Client Key & Secret** - Required alongside bearer token for rate limiting and identification -->
<!-- 3. **API Key** - Generated after initial setup -->

### Authentication Headers

Most endpoints require the following headers:

<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer PM_...`} 
/>

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

<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": { ... }\n}`} 
/>

### Paginated Response

<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [ ... ],\n  "meta": {\n    "total": 100,\n    "currentPage": 1,\n    "totalPages": 10,\n    "perPage": 10\n  }\n}`} 
/>

### Error Response

<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Error description",\n  "errors": [ ... ] // Optional validation errors\n}`} 
/>

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
