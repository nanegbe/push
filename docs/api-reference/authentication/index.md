---
sidebar_position: 2
---

# Authentication

The Authentication section covers endpoints for creating API clients, logging in via SSO, and generating API keys.

## Create Client Key

Creates a new API client with credentials.

**Endpoint:** `POST /api/v1/api-clients`

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
curl -X POST http://localhost:3000/api/v1/api-clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "push-v2"
  }'
```

---

## SSO Login

Authenticates a user and returns an access token.

**Endpoint:** `POST /api/v1/auth/sso-login`

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
curl -X POST http://localhost:3000/api/v1/auth/sso-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'
```

---

## Generate API Key

Generates an API key for programmatic access.

**Endpoint:** `POST /api/v1/api-keys/generate`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
Content-Type: application/json
```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "API key generated successfully",
  "data": {
    "apiKey": "sk_live_abc123def456..."
  }
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/api-keys/generate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr"
```

---

## Get API Key

Retrieves the current API key.

**Endpoint:** `GET /api/v1/api-keys`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "API key retrieved successfully",
  "data": {
    "apiKey": "sk_live_abc123def456...",
    "createdAt": "2026-02-12T10:30:00.000Z"
  }
}
```

### Example

```bash
curl -X GET http://localhost:3000/api/v1/api-keys \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr"
```

---

## Authentication Flow

Here's the complete authentication flow:

1. **Create API Client** (One-time setup)
   - Returns `clientKey` and `clientSecret`
   
2. **Login via SSO**
   - Returns `accessToken` and `refreshToken`
   
3. **Generate/Get API Key** (Optional)
   - Use for programmatic access without user login

4. **Use Access Token**
   - Include `accessToken` in Authorization header
   - Include `client-key` and `client-secret` for rate limiting

## Best Practices

- Store your `clientSecret` and `accessToken` securely
- Never expose credentials in client-side code
- Refresh tokens before expiration
- Use environment variables for credentials
- Implement proper error handling for authentication failures

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Access token expired"
}
```

### 429 Too Many Requests
```json
{
  "message": "Rate limit exceeded"
}
```
