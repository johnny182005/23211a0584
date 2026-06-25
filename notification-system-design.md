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


# Stage 2

## Database Choice
I would prefer using MongoDB because it is simple to use and handles large amounts of data well. Since notifications are created frequently, MongoDB can store them efficiently and it is also easy to work with.

## Collections

### Students
* studentId
* name
* email

### Notifications
* id
* studentId
* type
* message
* timestamp
* isRead

## Handling Large Data
As more notifications are added, fetching all of them at once can become slow. To avoid this, I would use indexes on fields like `studentId`, `isRead`, and `timestamp` because these fields are used often while searching. I would also use pagination so that only a few notifications are loaded at a time instead of loading everything together.