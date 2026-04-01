---
sidebar_position: 4
---

import ApiCodeToggler from '@site/src/components/ApiCodeToggler';
import ApiTerminal from '@site/src/components/ApiTerminal';


# Contacts

Manage your contact groups and recipients. This section covers creating, updating, and managing contact groups for bulk messaging.

## Create Group

Creates a new contact group by uploading a file containing contact information.

**Endpoint:** `POST {{baseUrl}}/contacts/groups`

**Authentication:** Bearer Token + Client Credentials

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
  code={`name: api-test\nfile: [Excel file with contacts]`} 
/>

### Parameters

| Field | Type   | Required | Description                                      | Example    |
|-------|--------|----------|--------------------------------------------------|------------|
| name  | string | Yes      | Name of the contact group                        | "api-test" |
| file  | file   | Yes      | Excel file (.xls, .xlsx) or CSV with contacts    | file upload|

### File Format

The uploaded file should contain phone numbers in the following format:

**Excel/CSV Columns:**
- `phone` or `phoneNumber` - Primary phone number (required)
- `name` - Contact name (optional)
- `email` - Contact email (optional)
- Additional custom fields (optional)

**Example CSV:**
<ApiTerminal 
  title="CSV EXAMPLE" 
  language="text" 
  code={`phone,name,email\n+23354*******,John Doe,john@example.com\n+23350*******,Jane Smith,jane@example.com`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully created contact group",\n  "data": {\n    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",\n    "name": "api-test",\n    "totalContacts": 150,\n    "validContacts": 148,\n    "invalidContacts": 2\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/contacts/groups" 
  isFormData={true}
  body={{
    "name": "api-test",
    "file": "@ /path/to/contacts.xlsx"
  }}
/>

---

## Get Groups

Retrieves all contact groups for the authenticated user.

**Endpoint:** `GET {{baseUrl}}/contacts/groups`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>`} 
/>

### Query Parameters

| Parameter | Type   | Required | Default | Description                    | Example |
|-----------|--------|----------|---------|--------------------------------|---------|
| page      | number | No       | 1       | Page number for pagination     | 1       |
| pageSize  | number | No       | 10      | Number of items per page       | 10      |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": [\n    {\n      "id": "2db62b6d-b805-4a92-993e-7f9c8af64e72",\n      "name": "api-test",\n      "totalContacts": 150,\n      "createdAt": "2026-02-12T10:30:00.000Z",\n      "updatedAt": "2026-02-12T10:30:00.000Z"\n    },\n    {\n      "id": "8f3a2b1c-9d8e-4f7a-b6c5-d4e3f2a1b0c9",\n      "name": "Marketing List",\n      "totalContacts": 500,\n      "createdAt": "2026-02-10T08:15:00.000Z",\n      "updatedAt": "2026-02-11T14:20:00.000Z"\n    }\n  ],\n  "meta": {\n    "total": 2,\n    "currentPage": 1,\n    "totalPages": 1,\n    "perPage": 10\n  }\n}`} 
/>

### Example

```bash
curl -X GET "https://messaging-api.esoko.com/api/v1/contacts/groups?page=1&pageSize=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \

```

---

## Get Group Details

Retrieves detailed information about a specific contact group including all contacts.

**Endpoint:** `GET {{baseUrl}}/contacts/groups/:groupId`

**Authentication:** Bearer Token + Client Credentials

### Request

<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>`} 
/>

### Path Parameters

| Parameter | Type   | Required | Description         | Example                              |
|-----------|--------|----------|---------------------|--------------------------------------|
| groupId   | string | Yes      | UUID of the group   | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successful",\n  "data": {\n    "id": "2db62b6d-b805-4a92-993e-7f9c8af64e72",\n    "name": "api-test",\n    "contacts": [\n      {\n        "id": "c1",\n        "phone": "+23354*******",\n        "name": "John Doe",\n        "email": "john@example.com"\n      },\n      {\n        "id": "c2",\n        "phone": "+23350*******",\n        "name": "Jane Smith",\n        "email": "jane@example.com"\n      }\n    ],\n    "totalContacts": 150,\n    "createdAt": "2026-02-12T10:30:00.000Z",\n    "updatedAt": "2026-02-12T10:30:00.000Z"\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="GET" 
  endpoint="/api/v1/contacts/groups/2db62b6d-b805-4a92-993e-7f9c8af64e72" 
/>

---

## Update Group

Updates the name or contacts of an existing group.

**Endpoint:** `PUT {{baseUrl}}/contacts/groups/:groupId`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
<ApiTerminal 
  title="HEADERS" 
  language="text" 
  code={`Authorization: Bearer <accessToken>\nContent-Type: application/json`} 
/>

**Path Parameters:**
- `groupId` - UUID of the group to update

**Body:**
<ApiTerminal 
  title="BODY" 
  language="json" 
  code={`{\n  "name": "Updated Group Name"\n}`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully updated contact group",\n  "data": {\n    "id": "2db62b6d-b805-4a92-993e-7f9c8af64e72",\n    "name": "Updated Group Name",\n    "totalContacts": 150\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="PUT" 
  endpoint="/api/v1/contacts/groups/2db62b6d-b805-4a92-993e-7f9c8af64e72" 
  body={{
    "name": "Updated Group Name"
  }}
/>

---

## Delete Group

Deletes a contact group and all its contacts.

**Endpoint:** `DELETE {{baseUrl}}/contacts/groups/:groupId`

**Authentication:** Bearer Token + Client Credentials

### Request

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
  code={`{\n  "message": "Successfully deleted contact group"\n}`} 
/>

### Example

<ApiCodeToggler 
  method="DELETE" 
  endpoint="/api/v1/contacts/groups/2db62b6d-b805-4a92-993e-7f9c8af64e72" 
/>

---

## Add Contacts to Group

Adds new contacts to an existing group.

**Endpoint:** `POST {{baseUrl}}/contacts/groups/:groupId/contacts`

**Authentication:** Bearer Token + Client Credentials

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
  code={`file: [Excel or CSV file with new contacts]`} 
/>

### Response

**Status Code:** `200 OK`

**Body:**
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Successfully added contacts to group",\n  "data": {\n    "addedContacts": 25,\n    "totalContacts": 175\n  }\n}`} 
/>

### Example

<ApiCodeToggler 
  method="POST" 
  endpoint="/api/v1/contacts/groups/:groupId/contacts" 
  isFormData={true}
  body={{
    "file": "@ new-contacts.csv"
  }}
/>

---

## Error Responses

### Group Not Found (404 Not Found)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Contact group not found"\n}`} 
/>

### Invalid File Format (400 Bad Request)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid file format",\n  "errors": [\n    "File must be Excel (.xls, .xlsx) or CSV format"\n  ]\n}`} 
/>

### Duplicate Group Name (409 Conflict)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "A group with this name already exists"\n}`} 
/>

### Unauthorized (401 Unauthorized)
<ApiTerminal 
  title="RESPONSE" 
  language="json" 
  code={`{\n  "message": "Invalid or expired access token"\n}`} 
/>

---

## Best Practices

1. **File Preparation**: Ensure your contact file is properly formatted before upload
2. **Phone Number Format**: Use international format (+233...) for best results
3. **Group Naming**: Use descriptive names for easy identification
4. **Regular Cleanup**: Remove inactive or invalid contacts periodically
5. **Segmentation**: Create targeted groups based on demographics or preferences
6. **Testing**: Test with small groups before sending to large lists

## Tips

- Maximum file size: 10MB
- Supported formats: .xls, .xlsx, .csv
- Phone numbers are automatically validated and formatted
- Duplicate contacts within a group are automatically merged
- Consider using tags or custom fields for better segmentation
