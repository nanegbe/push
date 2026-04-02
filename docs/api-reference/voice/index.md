---
sidebar_position: 7
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';


# Voice

Send voice messages and make automated calls. This section covers uploading voice files, initiating calls, scheduling, and group calling.

## Upload Voice File

Uploads an audio file to be used for voice messages.

**Endpoint:** `POST {{baseUrl}}/files/upload`

**Authentication:** Bearer Token

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nContent-Type: multipart/form-data`} 
/>

**Body (Form Data):**
<ApiTerminal 
  title="BODY" 
  language="text" 
  code={`file: [Audio file]`} 
/>

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
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`X-Powered-By: Express\nX-RateLimit-Limit: 60\nX-RateLimit-Remaining: 59\nX-RateLimit-Reset: 60\nContent-Type: application/json; charset=utf-8`} 
/>

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "status": 200,\n  "message": "Successfully uploaded file",\n  "data": {\n    "fileId": "2102887ea0454c68f339f6f479da0451d"\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/files/upload" 
  isFormData={true}
  body={{
    "file": "@ /path/to/voice-message.mp3"
  }}
/>

---

## Send Voice Message

Initiates a voice call to one or more recipients with a pre-recorded audio message.

**Endpoint:** `POST {{baseUrl}}/calls/initiate`

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
  code={`{\n  "recipients": ["054*******"],\n  "audioFileName": "2102887ea0454c68f339f6f479da0451d"\n}`} 
/>

### Parameters

| Field          | Type     | Required | Description                                      | Example                                |
|----------------|----------|----------|--------------------------------------------------|----------------------------------------|
| recipients     | array    | Yes      | Array of phone numbers                           | ["054*******"]                         |
| audioFileName  | string   | Yes      | File ID returned from upload endpoint            | "2102887ea0454c68f339f6f479da0451d"   |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "phoneNumber": "054*******",\n      "reference": "0327df6b-1c83-45d3-a918-18561b57c36e"\n    }\n  ]\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/calls/initiate" 
  body={{
    "recipients": ["23320*******"],
    "audioFileName": "UPLOADED_FILE_ID"
  }}
/>

---

## Send Voice to Multiple Recipients

Sends the same voice message to multiple phone numbers.

**Endpoint:** `POST {{baseUrl}}/calls/initiate`

**Request Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "recipients": ["054*******", "050*******", "024*******"],\n  "audioFileName": "2102887ea0454c68f339f6f479da0451d"\n}`} 
/>

**Response:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "phoneNumber": "054*******",\n      "reference": "voice-ref-001"\n    },\n    {\n      "phoneNumber": "050*******",\n      "reference": "voice-ref-002"\n    },\n    {\n      "phoneNumber": "024*******",\n      "reference": "voice-ref-003"\n    }\n  ]\n}`} 
/>

---

## Resend Voice Call

Resends a previously sent voice call using its reference ID.

**Endpoint:** `POST {{baseUrl}}/calls/resend`

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
  code={`{\n  "references": [\n    "89140c53-a027-4492-90ec-41a1206c2b51"\n  ]\n}`} 
/>

### Parameters

| Field      | Type     | Required | Description                                      | Example                                    |
|------------|----------|----------|--------------------------------------------------|--------------------------------------------|
| references | array    | Yes      | Array of call reference IDs to resend            | ["89140c53-a027-4492-90ec-41a1206c2b51"]  |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "reference": "89140c53-a027-4492-90ec-41a1206c2b51",\n      "phoneNumber": "054*******"\n    }\n  ]\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/calls/resend" 
  body={{
    "references": [
      "89140c53-a027-4492-90ec-41a1206c2b51"
    ]
  }}
/>

---

## Estimate Voice Call Price

Calculates the estimated cost for initiating a voice call without actually making it.

**Endpoint:** `POST {{baseUrl}}/calls/estimate`

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
  code={`{\n  "recipients": ["054*******"],\n  "audioFileName": "2102887ea0454c68f339f6f479da0451d"\n}`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "totalCost": 0.05,\n    "currency": "GHS",\n    "recipientCount": 1\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/calls/estimate" 
  body={{
    "groupIds": ["group-id-1"],
    "recipients": ["054*******"],
    "audioFileName": "2102887ea0454c68f339f6f479da0451d"
  }}
/>

---

## Resend Voice Call by Campaign

Resends all failed or pending voice calls for a specific campaign.

**Endpoint:** `POST {{baseUrl}}/calls/resend-by-campaign/:campaignId`

**Authentication:** Bearer Token

### Path Parameters

| Parameter | Type   | Required | Description          | Example                 |
|-----------|--------|----------|----------------------|-------------------------|
| campaignId| string | Yes      | Unique campaign ID   | "vcmp_123abc456def"      |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully initiated resend for campaign",\n  "data": {\n    "campaignId": "vcmp_123abc456def",\n    "resendCount": 8\n  }\n}`} 
/>

---

## Schedule Voice Message

Schedules a voice call to be made at a future date and time.

**Endpoint:** `POST {{baseUrl}}/calls/schedule`

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
  code={`{\n  "recipients": [\n    "054*******"\n  ],\n  "audioFileName": "d306922bdebf77bbbd8793db93492e38",\n  "schedule": "2026-02-13T12:25:00.000Z"\n}`} 
/>

### Parameters

| Field          | Type     | Required | Description                                      | Example                                |
|----------------|----------|----------|--------------------------------------------------|----------------------------------------|
| recipients     | array    | Yes      | Array of phone numbers                           | ["054*******"]                         |
| audioFileName  | string   | Yes      | File ID of uploaded audio                        | "d306922bdebf77bbbd8793db93492e38"    |
| schedule       | string   | Yes      | ISO 8601 formatted datetime (UTC)                | "2026-02-13T12:25:00.000Z"            |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully scheduled voice call",\n  "data": {\n    "scheduledId": "vsch_abc123def456",\n    "scheduledFor": "2026-02-13T12:25:00.000Z",\n    "recipientCount": 1\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/calls/schedule" 
  body={{
    "groupIds": ["group-id-1"],
    "recipients": [
      "054*******"
    ],
    "audioFileName": "d306922bdebf77bbbd8793db93492e38",
    "schedule": "2026-02-13T12:25:00.000Z"
  }}
/>

---

## Send Voice to Group

Sends a voice message to all contacts in a specific group.

**Endpoint:** `POST {{baseUrl}}/calls/initiate-to-group`

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
  code={`{\n  "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",\n  "audioFileName": "2102887ea0454c68f339f6f479da0451d"\n}`} 
/>

### Parameters

| Field          | Type     | Required | Description                                      | Example                              |
|----------------|----------|----------|--------------------------------------------------|--------------------------------------|
| groupId        | string   | Yes      | UUID of the contact group                        | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |
| audioFileName  | string   | Yes      | File ID of uploaded audio                        | "2102887ea0454c68f339f6f479da0451d" |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully sent voice message to group",\n  "data": {\n    "totalRecipients": 150,\n    "successfulCalls": 148,\n    "failedCalls": 2,\n    "references": [\n      {\n        "phoneNumber": "054*******",\n        "reference": "grp-voice-ref-001"\n      },\n      {\n        "phoneNumber": "050*******",\n        "reference": "grp-voice-ref-002"\n      }\n    ]\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/calls/initiate-to-group" 
  body={{
    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "audioFileName": "2102887ea0454c68f339f6f479da0451d"
  }}
/>

---

## Schedule Voice Message to Group

Schedules a voice message to be sent to all contacts in a specific group at a future time.

**Endpoint:** `POST {{baseUrl}}/calls/schedule-to-group`

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
  code={`{\n  "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",\n  "audioFileName": "2102887ea0454c68f339f6f479da0451d",\n  "schedule": "2026-02-13T15:00:00.000Z"\n}`} 
/>

### Parameters

| Field          | Type     | Required | Description                          | Example                              |
|----------------|----------|----------|--------------------------------------|--------------------------------------|
| groupId        | string   | Yes      | UUID of the contact group            | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |
| audioFileName  | string   | Yes      | File ID of uploaded audio            | "2102887ea0454c68f339f6f479da0451d" |
| schedule       | string   | Yes      | ISO 8601 formatted datetime (UTC)    | "2026-02-13T15:00:00.000Z"          |

### Response

**Status Code:** `201 Created`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully scheduled voice message to group",\n  "data": {\n    "scheduledId": "vgsch_abc123def456",\n    "scheduledFor": "2026-02-13T15:00:00.000Z",\n    "recipientCount": 150\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/calls/schedule-to-group" 
  body={{
    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "audioFileName": "2102887ea0454c68f339f6f479da0451d",
    "schedule": "2026-02-13T15:00:00.000Z"
  }}
/>

---

## Get Call Status

Retrieves the status of a voice call.

**Endpoint:** `GET {{baseUrl}}/calls/status/:reference`

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
| reference | string | Yes      | Call reference ID              | "0327df6b-1c83-45d3-a918-18561b57c36e" |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "reference": "0327df6b-1c83-45d3-a918-18561b57c36e",\n    "phoneNumber": "054*******",\n    "status": "COMPLETED",\n    "duration": 45,\n    "initiatedAt": "2026-02-13T11:52:39.000Z",\n    "answeredAt": "2026-02-13T11:52:45.000Z",\n    "completedAt": "2026-02-13T11:53:30.000Z"\n  }\n}`} 
/>

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

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/calls/status/0327df6b-1c83-45d3-a918-18561b57c36e" 
/>

---

## Cancel Scheduled Voice Call

Cancels a scheduled voice call before it's made.

**Endpoint:** `DELETE {{baseUrl}}/calls/schedule/:scheduledId`

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
  code={`{\n  "message": "Successfully cancelled scheduled voice call"\n}`} 
/>

### Example

<ApiCodeToggler 
  method="DELETE" 
  endpoint="/api/v1/calls/schedule/vsch_abc123def456" 
/>

---

## Error Responses

### File Not Found (404 Not Found)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Audio file not found"\n}`} 
/>

### Invalid Audio Format (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid audio file format",\n  "errors": [\n    "Supported formats: MP3, WAV, M4A"\n  ]\n}`} 
/>

### File Too Large (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "File size exceeds maximum limit",\n  "errors": [\n    "Maximum file size is 10 MB"\n  ]\n}`} 
/>

### Invalid Phone Number (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid phone number format",\n  "errors": [\n    "Phone number must be valid"\n  ]\n}`} 
/>

### Scheduled Time in Past (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Schedule time must be in the future"\n}`} 
/>

### Insufficient Balance (402 Payment Required)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Insufficient balance to make calls"\n}`} 
/>

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
