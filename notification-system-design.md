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


# Stage 3

## Query Analysis

The given query fetches unread notifications of a particular student and sorts them by the latest timestamp. This query is correct, but if the notifications table becomes very large, it may take more time to execute.

## Improving Performance

To improve the query performance, I would create indexes on the following fields:

* studentId
* isRead
* timestamp

These fields are used frequently while filtering and sorting notifications.

## Should Every Column Have an Index?

No. Creating indexes on every column is not a good idea because it increases storage usage and also makes insert and update operations slower. It is better to create indexes only on columns that are searched or filtered frequently.

## Query to Find Placement Notifications

To find students who received Placement notifications in the last 7 days, I would filter notifications by type and timestamp.


# Stage 4

## Improving Performance

If notifications are fetched every time the user opens a page, the database will receive too many requests and the application will become slower.

To avoid this, I would load only a limited number of notifications at first and load more only when the user needs them. For new notifications, I would use WebSockets so users can receive updates without refreshing the page. I would also use caching for recently viewed notifications to reduce unnecessary database requests.

## Trade-offs

* Loading fewer notifications makes the application faster, but older notifications need to be loaded separately.

* WebSockets give instant updates, but they keep an active connection with the server.

* Caching improves response time, but sometimes users may see slightly old data until the cache is updated.


# Stage 5

## Problems in the Current Approach

The current implementation processes every student one by one. If sending an email fails in the middle, some students receive the notification while others do not. This also makes the process slow when the number of students is very large.

## Better Approach

I would first save all notifications to the database and then send emails in the background. This way, the notification is not lost even if email delivery fails. Failed emails can be retried later without affecting the stored notifications.

The in-app notification and email sending should be handled separately because both tasks are independent. This makes the system more reliable and easier to manage.
