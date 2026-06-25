# Notification System Design

# Stage 1

## Authentication
All notification APIs require a valid Bearer token in authentication.

## API Endpoints
### GET /notifications
This is Used to fetch all notifications for the logged-in user.

### GET /notifications/{id}
This is Used to fetch a particular notification.

### POST /notifications
This is Used to create a new notification.

### PATCH /notifications/{id}/read
this will Mark a notification as read.

### PATCH /notifications/read-all
This will Mark all notifications as read.

### DELETE /notifications/{id}
This will Remove a notification.
---
## Notification Fields
id – Unique notification ID
studentId – Student identifier
type – Placement, Result or Event
message – Notification content
timestamp – Time when the notification was created
isRead – Shows whether the notification is read or not
---
## Real-Time Updates
The application can use the WebSockets to send notifications.Once the user is logged in, a connection is established and any new notification is pushed directly to the user.
