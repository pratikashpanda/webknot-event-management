# Event Management API Documentation

## Base URL
`http://localhost:3001/api`

---

## 1. Event Management API

### 1.1 Create an Event
**Endpoint**: `POST /events`

**Request Body** (JSON):
```json
{
  "name": "Event Name",
  "description": "Event Description",
  "date": "YYYY-MM-DD",
  "location": "Event Location"
}
```

**Response** (201 Created):
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "EventID",
    "name": "Event Name",
    "description": "Event Description",
    "date": "YYYY-MM-DD",
    "location": "Event Location"
  }
}
```

---

### 1.2 Get All Events
**Endpoint**: `GET /events`

**Response** (200 OK):
```json
[
  {
    "_id": "EventID",
    "name": "Event Name",
    "description": "Event Description",
    "date": "YYYY-MM-DD",
    "location": "Event Location"
  }
]
```

---

### 1.3 Update an Event
**Endpoint**: `PUT /events/:id`

**Request Parameters**:
- `id`: The ID of the event to update.

**Request Body** (JSON):
```json
{
  "name": "Updated Event Name",
  "description": "Updated Event Description",
  "date": "YYYY-MM-DD",
  "location": "Updated Event Location"
}
```

**Response** (200 OK):
```json
{
  "message": "Event updated successfully",
  "event": {
    "_id": "EventID",
    "name": "Updated Event Name",
    "description": "Updated Event Description",
    "date": "YYYY-MM-DD",
    "location": "Updated Event Location"
  }
}
```

---

### 1.4 Delete an Event
**Endpoint**: `DELETE /events/:id`

**Request Parameters**:
- `id`: The ID of the event to delete.

**Response** (200 OK):
```json
{
  "message": "Event deleted successfully"
}
```

---

## 2. Attendee Management API

### 2.1 Add an Attendee
**Endpoint**: `POST /attendees`

**Request Body** (JSON):
```json
{
  "name": "Attendee Name",
  "email": "Attendee Email"
}
```

**Response** (201 Created):
```json
{
  "message": "Attendee added successfully",
  "attendee": {
    "_id": "AttendeeID",
    "name": "Attendee Name",
    "email": "Attendee Email"
  }
}
```

---

### 2.2 Get All Attendees
**Endpoint**: `GET /attendees`

**Response** (200 OK):
```json
[
  {
    "_id": "AttendeeID",
    "name": "Attendee Name",
    "email": "Attendee Email"
  }
]
```

---

### 2.3 Delete an Attendee
**Endpoint**: `DELETE /attendees/:id`

**Request Parameters**:
- `id`: The ID of the attendee to delete.

**Response** (200 OK):
```json
{
  "message": "Attendee deleted successfully"
}
```

---

## 3. Task Management API

### 3.1 Create a Task
**Endpoint**: `POST /tasks`

**Request Body** (JSON):
```json
{
  "name": "Task Name",
  "status": "Pending",
  "deadline": "YYYY-MM-DD",
  "attendeeIds": ["AttendeeID1", "AttendeeID2"],
  "eventId": "EventID"
}
```

**Response** (201 Created):
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "TaskID",
    "name": "Task Name",
    "status": "Pending",
    "deadline": "YYYY-MM-DD",
    "attendeeIds": ["AttendeeID1", "AttendeeID2"],
    "eventId": "EventID"
  }
}
```

---

### 3.2 Get Tasks for an Event
**Endpoint**: `GET /tasks/:eventId`

**Request Parameters**:
- `eventId`: The ID of the event whose tasks are to be fetched.

**Response** (200 OK):
```json
[
  {
    "_id": "TaskID",
    "name": "Task Name",
    "status": "Pending",
    "deadline": "YYYY-MM-DD",
    "attendeeIds": ["AttendeeID1", "AttendeeID2"],
    "eventId": "EventID"
  }
]
```

---

### 3.3 Update Task Status
**Endpoint**: `PUT /tasks/:id`

**Request Parameters**:
- `id`: The ID of the task to update.

**Request Body** (JSON):
```json
{
  "status": "Completed"
}
```

**Response** (200 OK):
```json
{
  "message": "Task status updated successfully",
  "task": {
    "_id": "TaskID",
    "name": "Task Name",
    "status": "Completed",
    "deadline": "YYYY-MM-DD",
    "attendeeIds": ["AttendeeID1", "AttendeeID2"],
    "eventId": "EventID"
  }
}
```

---

### Notes:
- Replace placeholders like `EventID`, `AttendeeID`, and `TaskID` with actual IDs from your database.

