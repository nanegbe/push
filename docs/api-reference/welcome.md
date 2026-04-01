---
sidebar_position: 1
sidebar_label: Introduction
---

import { 
  IconWrapper, BookOpenIcon, LockIcon, TagIcon, UsersIcon, SmartphoneIcon, WalletIcon, PhoneIcon,
  RocketIcon, WrenchIcon, ActivityIcon, HelpCircleIcon, FileTextIcon, TargetIcon, StarIcon
} from '@site/src/components/Icons';

# Welcome to the Push Messaging API Documentation

This documentation provides everything you need to integrate our messaging services into your applications. Whether you're sending SMS messages, making voice calls, or managing contacts, you'll find comprehensive guides and examples here.

## <IconWrapper><BookOpenIcon /></IconWrapper> What's Inside

### [Quick Start Guide](./quick-start.md)
Get up and running in 5 minutes with step-by-step instructions for your first API calls.

### Core Sections

#### <IconWrapper><LockIcon /></IconWrapper> [Authentication](./authentication/)
Learn how to authenticate your requests and manage API credentials securely.

- Generate API Keys
- Best practices for token management

#### <IconWrapper><TagIcon /></IconWrapper> [Sender ID](./sender-id/)
Register and manage the sender identities for your messages.

- Create sender IDs
- Guidelines and requirements
- Approval process

#### <IconWrapper><UsersIcon /></IconWrapper> [Contacts](./contacts/)
Organize your recipients into manageable groups for bulk messaging.

- Create contact groups
- Upload contacts via file
- Manage and update groups
- Group operations

#### <IconWrapper><SmartphoneIcon /></IconWrapper> [SMS](./sms/)
Send text messages worldwide with delivery tracking and scheduling.

- Send individual messages
- Bulk messaging
- Schedule messages
- Resend failed messages
- Track delivery status
- Group messaging

#### <IconWrapper><WalletIcon /></IconWrapper> [Balance](./balance/)
Monitor your account balance and transaction history.

- Check balance
- Top up account
- View transactions
- Cost estimation

#### <IconWrapper><PhoneIcon /></IconWrapper> [Voice](./voice/)
Make automated voice calls with pre-recorded messages.

- Upload audio files
- Send voice messages
- Schedule calls
- Group calling
- Track call status

## 🚀 Getting Started

### New Users
Start with our **[Quick Start Guide](./quick-start.md)** to send your first message in minutes.

### Existing Users
Jump straight to the **[API Reference](./index.md)** for detailed endpoint documentation.

<!-- ### Developers
Explore code examples in multiple languages and download SDKs from our **[GitHub Repository](#)**. -->

## <IconWrapper><BookOpenIcon /></IconWrapper> How to Use This Documentation

### For Integration
1. **Read the Overview** - Understand the API structure and authentication
2. **Follow Quick Start** - Get hands-on experience immediately
3. **Explore Endpoints** - Dive deep into specific features you need
4. **Implement** - Use the examples as a starting point for your code
<!-- 5. **Test** - Use our sandbox environment for safe testing -->

### For Reference
- Use the **search bar** to find specific endpoints or features
- Browse the **sidebar navigation** to explore topics
- Check **code examples** for implementation details
- Review **error codes** when troubleshooting

<!-- ## <IconWrapper><WrenchIcon /></IconWrapper> API Basics

### Base URL
```
https://messaging-api.esoko.com/api/v1

```

### Authentication
All API requests (except public endpoints) require:
```bash
Authorization: Bearer <access_token>
```

### Request Format
```json
Content-Type: application/json

{
  "key": "value"
}
```

### Response Format
```json
{
  "message": "Success description",
  "data": { ... },
  "meta": { ... } // For paginated responses
}
``` -->

### HTTP Methods
- **GET** - Retrieve resources
- **POST** - Create resources or trigger actions
- **PUT** - Update resources
- **DELETE** - Remove resources

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `402` - Payment Required (Insufficient Balance)
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests (Rate Limited)



## <IconWrapper><ActivityIcon /></IconWrapper> Rate Limits

60 requests per minute

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Time until the rate limit resets (in seconds)

## <IconWrapper><LockIcon /></IconWrapper> Security Best Practices

1. **Keep credentials secure**
   - Never expose secrets in client-side code
   - Use environment variables
   - Rotate keys regularly

2. **Use HTTPS**
   - All production requests must use HTTPS
   - Never send credentials over HTTP

3. **Validate phone numbers**
   - Ensure proper formatting before sending
   - Respect opt-out requests

4. **Monitor usage**
   - Set up balance alerts
   - Review transaction logs regularly

## <IconWrapper><HelpCircleIcon /></IconWrapper> Need Help?

### Documentation
- Search this documentation site
- Check FAQ section
- Review error code reference

### Support Channels
- **Email**: support@messaging.example.com
- **Developer Forum**: community.messaging.example.com
- **Status Page**: status.messaging.example.com

### Emergency Support
For critical issues affecting production:
- **Priority Support**: priority-support@messaging.example.com
- **Phone**: +1-234-567-8900 (Enterprise only)

<!-- ## <IconWrapper><FileTextIcon /></IconWrapper> Versioning

This documentation covers **API v1**. 

- Current Version: v1.0.0
- Last Updated: March 2026
- Changelog: See [release notes](#)

We maintain backward compatibility for at least 2 years after releasing new versions. -->

## <IconWrapper><TargetIcon /></IconWrapper> Common Use Cases

### Transactional Messages
- OTP verification
- Order confirmations
- Shipping notifications
- Account alerts

### Marketing Campaigns
- Promotional offers
- Event invitations
- Newsletter distribution
- Product announcements

### Notifications
- Appointment reminders
- Payment due dates
- System alerts
- Emergency broadcasts

### Customer Engagement
- Survey invitations
- Feedback requests
- Re-engagement campaigns
- Birthday wishes

## <IconWrapper><StarIcon /></IconWrapper> Ready to Begin?

Start with the **[Quick Start Guide](./quick-start.md)** and discover how easy it is to integrate powerful messaging into your applications!

---

**Last Updated**: March 21, 2026  
**API Version**: 1.0.0  
**Documentation Status**: ✅ Complete
