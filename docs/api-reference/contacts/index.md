---
sidebar_position: 4
---

# Contacts

Manage your contact groups and recipients. This section covers creating, updating, and managing contact groups for bulk messaging.

## Create Group

Creates a new contact group by uploading a file containing contact information.

**Endpoint:** `POST /api/v1/contacts/groups`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
Content-Type: multipart/form-data
```

**Body (Form Data):**
```
name: api-test
file: [Excel file with contacts]
```

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
```csv
phone,name,email
+233547071660,John Doe,john@example.com
+233500318982,Jane Smith,jane@example.com
```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successfully created contact group",
  "data": {
    "groupId": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "name": "api-test",
    "totalContacts": 150,
    "validContacts": 148,
    "invalidContacts": 2
  }
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/contacts/groups \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -F "name=api-test" \
  -F "file=@/path/to/contacts.xlsx"
```

---

## Get Groups

Retrieves all contact groups for the authenticated user.

**Endpoint:** `GET /api/v1/contacts/groups`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
```

### Query Parameters

| Parameter | Type   | Required | Default | Description                    | Example |
|-----------|--------|----------|---------|--------------------------------|---------|
| page      | number | No       | 1       | Page number for pagination     | 1       |
| pageSize  | number | No       | 10      | Number of items per page       | 10      |

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successful",
  "data": [
    {
      "id": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
      "name": "api-test",
      "totalContacts": 150,
      "createdAt": "2026-02-12T10:30:00.000Z",
      "updatedAt": "2026-02-12T10:30:00.000Z"
    },
    {
      "id": "8f3a2b1c-9d8e-4f7a-b6c5-d4e3f2a1b0c9",
      "name": "Marketing List",
      "totalContacts": 500,
      "createdAt": "2026-02-10T08:15:00.000Z",
      "updatedAt": "2026-02-11T14:20:00.000Z"
    }
  ],
  "meta": {
    "total": 2,
    "currentPage": 1,
    "totalPages": 1,
    "perPage": 10
  }
}
```

### Example

```bash
curl -X GET "http://localhost:3000/api/v1/contacts/groups?page=1&pageSize=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr"
```

---

## Get Group Details

Retrieves detailed information about a specific contact group including all contacts.

**Endpoint:** `GET /api/v1/contacts/groups/:groupId`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
```

### Path Parameters

| Parameter | Type   | Required | Description         | Example                              |
|-----------|--------|----------|---------------------|--------------------------------------|
| groupId   | string | Yes      | UUID of the group   | "2db62b6d-b805-4a92-993e-7f9c8af64e72" |

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successful",
  "data": {
    "id": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "name": "api-test",
    "contacts": [
      {
        "id": "c1",
        "phone": "+233547071660",
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": "c2",
        "phone": "+233500318982",
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    ],
    "totalContacts": 150,
    "createdAt": "2026-02-12T10:30:00.000Z",
    "updatedAt": "2026-02-12T10:30:00.000Z"
  }
}
```

### Example

```bash
curl -X GET http://localhost:3000/api/v1/contacts/groups/2db62b6d-b805-4a92-993e-7f9c8af64e72 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr"
```

---

## Update Group

Updates the name or contacts of an existing group.

**Endpoint:** `PUT /api/v1/contacts/groups/:groupId`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
Content-Type: application/json
```

**Path Parameters:**
- `groupId` - UUID of the group to update

**Body:**
```json
{
  "name": "Updated Group Name"
}
```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successfully updated contact group",
  "data": {
    "id": "2db62b6d-b805-4a92-993e-7f9c8af64e72",
    "name": "Updated Group Name",
    "totalContacts": 150
  }
}
```

### Example

```bash
curl -X PUT http://localhost:3000/api/v1/contacts/groups/2db62b6d-b805-4a92-993e-7f9c8af64e72 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Group Name"
  }'
```

---

## Delete Group

Deletes a contact group and all its contacts.

**Endpoint:** `DELETE /api/v1/contacts/groups/:groupId`

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
  "message": "Successfully deleted contact group"
}
```

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/contacts/groups/2db62b6d-b805-4a92-993e-7f9c8af64e72 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr"
```

---

## Add Contacts to Group

Adds new contacts to an existing group.

**Endpoint:** `POST /api/v1/contacts/groups/:groupId/contacts`

**Authentication:** Bearer Token + Client Credentials

### Request

**Headers:**
```
Authorization: Bearer <accessToken>
client-key: <your-client-key>
client-secret: <your-client-secret>
Content-Type: multipart/form-data
```

**Body (Form Data):**
```
file: [Excel or CSV file with new contacts]
```

### Response

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successfully added contacts to group",
  "data": {
    "addedContacts": 25,
    "totalContacts": 175
  }
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/contacts/groups/2db62b6d-b805-4a92-993e-7f9c8af64e72/contacts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "client-key: e552c5b008" \
  -H "client-secret: POZ]0TUqyxuiAylNsVl2jtfvr" \
  -F "file=@new-contacts.csv"
```

---

## Error Responses

### Group Not Found (404 Not Found)
```json
{
  "message": "Contact group not found"
}
```

### Invalid File Format (400 Bad Request)
```json
{
  "message": "Invalid file format",
  "errors": [
    "File must be Excel (.xls, .xlsx) or CSV format"
  ]
}
```

### Duplicate Group Name (409 Conflict)
```json
{
  "message": "A group with this name already exists"
}
```

### Unauthorized (401 Unauthorized)
```json
{
  "message": "Invalid or expired access token"
}
```

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
