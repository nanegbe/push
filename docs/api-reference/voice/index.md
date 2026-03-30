---
sidebar_position: 7
---

# Voice

Send voice messages and make automated calls. This section covers uploading voice files, initiating calls, scheduling, and group calling.

## Upload Voice File

Uploads an audio file to be used for voice messages.

**Endpoint:** `POST /api/v1/files/upload`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


Content-Type: multipart/form-data
```

**Body (Form Data):**
```
file: [Audio file]
```

### Supported Formats

| Format | Extensions | Max Size |
|--------|------------|----------|
| MP3    | .mp3       | 10 MB    |
| WAV    | .wav       | 10 MB    |
| M4A    | .m4a       | 10 MB    |

### Audio Requirements

- **Sample Rate**: 8000 Hz - 44100 Hz
- **Bit Rate**: 64 kbps - 320 kbps
- **Channels**: Mono or Stereo
- **Duration**: Maximum 5 minutes

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
  "status": 200,
  "message": "Successfully uploaded file",
  "data": {
    "fileId": "2102887ea0454c68f339f6f479da0451d"
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/files/upload \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "file=@/path/to/voice-message.mp3"
```

---

## Send Voice Message

Initiates a voice call to one or more recipients with a pre-recorded audio message.

**Endpoint:** `POST /api/v1/calls/initiate`

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
  "recipients": ["0547071660"],
  "audioFileName": "2102887ea0454c68f339f6f479da0451d"
}
```

### Parameters

| Field          | Type     | Required | Description                                      | Example                                |
|----------------|----------|----------|--------------------------------------------------|----------------------------------------|
| recipients     | array    | Yes      | Array of phone numbers                           | ["0547071660"]                         |
| audioFileName  | string   | Yes      | File ID returned from upload endpoint            | "2102887ea0454c68f339f6f479da0451d"   |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successful",
  "data": [
    {
      "phoneNumber": "0547071660",
      "reference": "0327df6b-1c83-45d3-a918-18561b57c36e"
    }
  ]
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/calls/initiate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \


  -H "Content-Type: application/json" \
  -d '{
  "recipients": ["23320*******"],
  "audioFileName": "UPLOADED_FILE_ID"
}'
```

---

## Send Voice to Multiple Recipients

Sends the same voice message to multiple phone numbers.

**Endpoint:** `POST /api/v1/calls/initiate`

**Request Body:**
```json
{
  "recipients": ["0547071660", "0500318982", "0244123456"],
  "audioFileName": "2102887ea0454c68f339f6f479da0451d"
}
```

**Response:**
```json
{
  "message": "Successful",
  "data": [
    {
      "phoneNumber": "0547071660",
      "reference": "voice-ref-001"
    },
    {
      "phoneNumber": "0500318982",
      "reference": "voice-ref-002"
    },
    {
      "phoneNumber": "0244123456",
      "reference": "voice-ref-003"
    }
  ]
}
```

---

## Resend Voice Call

Resends a previously sent voice call using its reference ID.

**Endpoint:** `POST /api/v1/calls/resend`

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
    "89140c53-a027-4492-90ec-41a1206c2b51"
  ]
}
```

### Parameters

| Field      | Type     | Required | Description                                      | Example                                    |
|------------|----------|----------|--------------------------------------------------|--------------------------------------------|
| references | array    | Yes      | Array of call reference IDs to resend            | ["89140c53-a027-4492-90ec-41a1206c2b51"]  |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successful",
  "data": [
    {
      "reference": "89140c53-a027-4492-90ec-41a1206c2b51",
      "phoneNumber": "0547071660"
    }
  ]
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/calls/resend \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "references": [
      "89140c53-a027-4492-90ec-41a1206c2b51"
    ]
  }'
```

---

## Estimate Voice Call Price

Calculates the estimated cost for initiating a voice call without actually making it.

**Endpoint:** `POST /api/v1/calls/estimate`

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
  "recipients": ["0547071660"],
  "audioFileName": "2102887ea0454c68f339f6f479da0451d"
}
```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successful",
  "data": {
    "totalCost": 0.05,
    "currency": "GHS",
    "recipientCount": 1
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/calls/estimate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["0547071660"],
    "audioFileName": "2102887ea0454c68f339f6f479da0451d"
  }'
```

---

## Resend Voice Call by Campaign

Resends all failed or pending voice calls for a specific campaign.

**Endpoint:** `POST /api/v1/calls/resend-by-campaign/:campaignId`

**Authentication:** Bearer Token

### Path Parameters

| Parameter | Type   | Required | Description          | Example                 |
|-----------|--------|----------|----------------------|-------------------------|
| campaignId| string | Yes      | Unique campaign ID   | "vcmp_123abc456def"      |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successfully initiated resend for campaign",
  "data": {
    "campaignId": "vcmp_123abc456def",
    "resendCount": 8
  }
}
```

---

## Schedule Voice Message

Schedules a voice call to be made at a future date and time.

**Endpoint:** `POST /api/v1/calls/schedule`

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
    "0547071660"
  ],
  "audioFileName": "d306922bdebf77bbbd8793db93492e38",
  "schedule": "2026-02-13T12:25:00.000Z"
}
```

### Parameters

| Field          | Type     | Required | Description                                      | Example                                |
|----------------|----------|----------|--------------------------------------------------|----------------------------------------|
| recipients     | array    | Yes      | Array of phone numbers                           | ["0547071660"]                         |
| audioFileName  | string   | Yes      | File ID of uploaded audio                        | "d306922bdebf77bbbd8793db93492e38"    |
| schedule       | string   | Yes      | ISO 8601 formatted datetime (UTC)                | "2026-02-13T12:25:00.000Z"            |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successfully scheduled voice call",
  "data": {
    "scheduledId": "vsch_abc123def456",
    "scheduledFor": "2026-02-13T12:25:00.000Z",
    "recipientCount": 1
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/calls/schedule \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": [
      "0547071660"
    ],
    "audioFileName": "d306922bdebf77bbbd8793db93492e38",
    "schedule": "2026-02-13T12:25:00.000Z"
  }'
```

---

## Send Voice to Group

Sends a voice message to all contacts in a specific group.

**Endpoint:** `POST /api/v1/calls/initiate-to-group`

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
  "audioFileName": "2102887ea0454c68f339f6f479da0451d"
}
```

### Parameters

| Field          | Type     | Required | Description                                      | Example                              |
|----------------|----------|----------|--------------------------------------------------|--------------------------------------|
| groupId        | string   | Yes      | UUID of the contact group                        | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |
| audioFileName  | string   | Yes      | File ID of uploaded audio                        | "2102887ea0454c68f339f6f479da0451d" |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successfully sent voice message to group",
  "data": {
    "totalRecipients": 150,
    "successfulCalls": 148,
    "failedCalls": 2,
    "references": [
      {
        "phoneNumber": "0547071660",
        "reference": "grp-voice-ref-001"
      },
      {
        "phoneNumber": "0500318982",
        "reference": "grp-voice-ref-002"
      }
    ]
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/calls/initiate-to-group \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "audioFileName": "2102887ea0454c68f339f6f479da0451d"
  }'
```

---

## Schedule Voice Message to Group

Schedules a voice message to be sent to all contacts in a specific group at a future time.

**Endpoint:** `POST /api/v1/calls/schedule-to-group`

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
  "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
  "audioFileName": "2102887ea0454c68f339f6f479da0451d",
  "schedule": "2026-02-13T15:00:00.000Z"
}
```

### Parameters

| Field          | Type     | Required | Description                          | Example                              |
|----------------|----------|----------|--------------------------------------|--------------------------------------|
| groupId        | string   | Yes      | UUID of the contact group            | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |
| audioFileName  | string   | Yes      | File ID of uploaded audio            | "2102887ea0454c68f339f6f479da0451d" |
| schedule       | string   | Yes      | ISO 8601 formatted datetime (UTC)    | "2026-02-13T15:00:00.000Z"          |

### Response

**Status Code:** `201 Created`

**Body:**
```json
{
  "message": "Successfully scheduled voice message to group",
  "data": {
    "scheduledId": "vgsch_abc123def456",
    "scheduledFor": "2026-02-13T15:00:00.000Z",
    "recipientCount": 150
  }
}
```

### Example

```bash
curl -X POST https://messaging-api.esoko.com/api/v1/calls/schedule-to-group \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "audioFileName": "2102887ea0454c68f339f6f479da0451d",
    "schedule": "2026-02-13T15:00:00.000Z"
  }'
```

---

## Get Call Status

Retrieves the status of a voice call.

**Endpoint:** `GET /api/v1/calls/status/:reference`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>


```

### Path Parameters

| Parameter | Type   | Required | Description                    | Example                                |
|-----------|--------|----------|--------------------------------|----------------------------------------|
| reference | string | Yes      | Call reference ID              | "0327df6b-1c83-45d3-a918-18561b57c36e" |

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successful",
  "data": {
    "reference": "0327df6b-1c83-45d3-a918-18561b57c36e",
    "phoneNumber": "0547071660",
    "status": "COMPLETED",
    "duration": 45,
    "initiatedAt": "2026-02-13T11:52:39.000Z",
    "answeredAt": "2026-02-13T11:52:45.000Z",
    "completedAt": "2026-02-13T11:53:30.000Z"
  }
}
```

### Call Status Values

| Status     | Description                                    |
|------------|------------------------------------------------|
| INITIATED  | Call has been initiated                        |
| RINGING    | Phone is ringing                               |
| ANSWERED   | Call was answered                              |
| COMPLETED  | Call completed successfully                    |
| FAILED     | Call failed (busy, unavailable, etc.)          |
| NO_ANSWER  | Call was not answered                          |
| REJECTED   | Call was rejected by recipient                 |

### Example

```bash
curl -X GET https://messaging-api.esoko.com/api/v1/calls/status/0327df6b-1c83-45d3-a918-18561b57c36e \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  
```

---

## Cancel Scheduled Voice Call

Cancels a scheduled voice call before it's made.

**Endpoint:** `DELETE /api/v1/calls/schedule/:scheduledId`

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
  "message": "Successfully cancelled scheduled voice call"
}
```

### Example

```bash
curl -X DELETE https://messaging-api.esoko.com/api/v1/calls/schedule/vsch_abc123def456 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
 
```

---

## Error Responses

### File Not Found (404 Not Found)
```json
{
  "message": "Audio file not found"
}
```

### Invalid Audio Format (400 Bad Request)
```json
{
  "message": "Invalid audio file format",
  "errors": [
    "Supported formats: MP3, WAV, M4A"
  ]
}
```

### File Too Large (400 Bad Request)
```json
{
  "message": "File size exceeds maximum limit",
  "errors": [
    "Maximum file size is 10 MB"
  ]
}
```

### Invalid Phone Number (400 Bad Request)
```json
{
  "message": "Invalid phone number format",
  "errors": [
    "Phone number must be valid"
  ]
}
```

### Scheduled Time in Past (400 Bad Request)
```json
{
  "message": "Schedule time must be in the future"
}
```

### Insufficient Balance (402 Payment Required)
```json
{
  "message": "Insufficient balance to make calls"
}
```

---

## Best Practices

1. **Audio Quality**: Use clear, professional recordings
2. **File Size**: Optimize audio files to reduce upload time
3. **Duration**: Keep messages concise (under 2 minutes recommended)
4. **Testing**: Test with small groups before large campaigns
5. **Timing**: Consider appropriate calling hours for recipients
6. **Opt-out**: Honor opt-out requests promptly
7. **Compliance**: Follow local telemarketing regulations
8. **Monitoring**: Track answer rates and call completion

## Voice Message Guidelines

### Content Recommendations

- **Introduction**: Clearly state who you are in the first 5 seconds
- **Purpose**: Get to the main message quickly
- **Call-to-Action**: Provide clear next steps if needed
- **Contact Info**: Include phone number or website for follow-up
- **Professional Tone**: Use professional, friendly voice talent

### Technical Specifications

**Recommended Settings:**
- Format: MP3
- Bit Rate: 128 kbps
- Sample Rate: 44100 Hz
- Channels: Mono (smaller file size)

## Tips

- Record in a quiet environment for best quality
- Use text-to-speech for dynamic content (if supported)
- A/B test different messages for better engagement
- Monitor call duration to optimize message length
- Schedule calls during business hours for better answer rates
- Keep backup audio files ready for quick deployment
