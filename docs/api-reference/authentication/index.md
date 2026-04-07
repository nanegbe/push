---
sidebar_position: 2
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';


# Authentication

The Authentication section covers endpoints for logging in and generating API keys.

<!-- ## Create Client Key

Creates a new API client with credentials.

**Endpoint:** `POST {{baseUrl}}/api-clients`

**Authentication:** None (Public endpoint)

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "push-v2"
}
```

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
  "message": "Successfully created API client",
  "data": {
    "clientKey": "e552c5b008",
    "clientSecret": "POZ]0TUqyxuiAylNsVl2jtfvr"
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/api-clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "push-v2"
  }'
```

--- -->

<!-- ## SSO Login

Authenticates a user and returns an access token.

**Endpoint:** `POST {{baseUrl}}/auth/sso-login`

**Authentication:** None (Login endpoint)

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Response

**Status Code:** `200 OK`

**Body:**
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

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/auth/sso-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'
```

--- -->
Before you begin, ensure you have a valid account with <a href="https://push-sso.esoko.com/en/signup/" target="_blank" rel="noopener noreferrer" style={{fontSize: '1.2rem', fontWeight: '700'}}>Push Messaging service</a>

## Login

Login and generate your API key under **Developer API** in the settings menu.

![API Key Generation](/img/api-key.png)

Save the `x-api-key` - you'll need it for all authenticated requests.


## Generate API Key

Generates an API key for programmatic access.

**Endpoint:** `POST {{baseUrl}}/api-keys`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer PM_...\nContent-Type: application/json`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "API key generated successfully",\n  "data": {\n    "x-api-key": "PM_abc123def456..."\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/api-keys" 
  body={{
    "name": "My Integration"
  }}
/>

Retrieves the current API key.

**Endpoint:** `GET {{baseUrl}}/api-keys`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer PM_...`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "API key retrieved successfully",\n  "data": {\n    "x-api-key": "PM_abc123def456...",\n    "createdAt": "2026-02-12T10:30:00.000Z"\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/api-keys" 
  body={{
    "name": "My Integration"
  }}
/>

---

## Authentication Flow

Here's the complete authentication flow:

<!-- 1. **Create API Client** (One-time setup)
   - Returns `clientKey` and `clientSecret`
   
2. **Login via SSO**
   - Returns `accessToken` and `refreshToken` -->
   
1. **Generate/Get API Key** 
   - Use for programmatic access without user login

2. **Use Access Token**
   - Include `accessToken` in Authorization header


## Best Practices
- Never expose credentials in client-side code
- Refresh tokens before expiration
- Use environment variables for credentials
- Implement proper error handling for authentication failures

## Error Responses

### 401 Unauthorized
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid credentials"\n}`} 
/>

### 403 Forbidden
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Access token expired"\n}`} 
/>

### 429 Too Many Requests
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Rate limit exceeded"\n}`} 
/>
