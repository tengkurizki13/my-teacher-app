[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11150525&assignment_repo_type=AssignmentRepo)

# p2-cms-integration-server

CMS Integration - Server

# Restaurant API Dekomentation

## Endpoint :

### List of available endpoints:

- POST /customer/register
- POST /customer/login
- POST /customer/google-sign-in
- POST /admin/register
- POST /admin/login
- GET /courses
- POST /customer/course/:id
- GET /customer/courses
- GET /customer/courses/:id

## 1. POST /customer/register

### Description

- register customer

### Request:

- Body:

```json
{
  "email": "ujang@gmail.com",
  "password": "12345"
}
```

### Response

Response (201 - Created)

```json
[
  {
    "massage": "success to register",
    "data": {
      "role": "Customer",
      "id": 5,
      "email": "ujang@gmail.com",
      "password": "$2a$10$4Av6AwE.HF4CK9zk0G0CauZ0QcSS96wS4ENsm6LOMPQXdarAMYI.i",
      "updatedAt": "2023-06-07T04:01:30.461Z",
      "createdAt": "2023-06-07T04:01:30.461Z"
    }
  }
]
```

Response (400 - Bad Request)

```json
{
"type": "SequelizeValidationError",
"message": "Email is required"
}
OR
{
"type": "SequelizeValidationError",
"message": "Password is required"
}
OR
{
"type": "SequelizeUniqueConstraintError",
"message": "email must be unique"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

### 2. POST /customer/login

### Description:

- login customer

### Request:

- Body:

```json
{
  "email": "ujang@gmail.com",
  "password": "12345"
}
```

### Response

Response (200 - OK)

```json
[
  {
    "massage": "success to login",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg2MTEwNzIxfQ.SvJfS6hALmAcOUGQQQIwvxfLNxH7nCcZTAcEQ_FyWvc",
    "id": 2,
    "role": "Customer"
  }
]
```

Response (400 - Bad Request)

````json
{
"type": "Bad Request",
"message": "Email / Password is required"
}
OR
{
"type": "authentication",
"message": "You Are Not Authentication"
}

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
````

### 3. POST /customer/google-sign-in

### Description:

- login customer by google sign in

### Request:

- Body:

```json
{
  "email": "daniel1234@gmail.com",
  "password": "12345"
}
```

### Response

Response (200 - OK)

```json
[
  {
    "massage": "success to login",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg2MTEwNzIxfQ.SvJfS6hALmAcOUGQQQIwvxfLNxH7nCcZTAcEQ_FyWvc",
    "id": 2,
    "role": "Customer"
  }
]
```

Response (400 - Bad Request)

````json
{
"type": "Bad Request",
"message": "Email / Password is required"
}
OR
{
"type": "authentication",
"message": "You Are Not Authentication"
}

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
````

### 4. POST /admin/register

### Description:

- register admin

### Request:

- Body:

```json
{
  "email": "bejo@gmail.com",
  "password": "12345"
}
```

### Response

Response (201 - Created)

```json
[
  {
    "massage": "success to register",
    "data": {
      "id": 6,
      "email": "bejo@gmail.com",
      "password": "$2a$10$w7CrIKlz6eEPhSaq2aPqReMfuKco.mXPaqut0q.Uaa4lFU8lIwEHq",
      "role": "Admin",
      "updatedAt": "2023-06-07T04:12:27.381Z",
      "createdAt": "2023-06-07T04:12:27.381Z"
    }
  }
]
```

Response (400 - Bad Request)

```json
{
"type": "SequelizeValidationError",
"message": "Email is required"
}
OR
{
"type": "SequelizeValidationError",
"message": "Password is required"
}
OR
{
"type": "SequelizeUniqueConstraintError",
"message": "email must be unique"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

### 5. POST /admin/login

### Description:

- login admin

### Request:

- Body:

```json
{
  "email": "bejo@gmail.com",
  "password": "12345"
}
```

### Response

Response (200 - OK)

```json
[
  {
    "massage": "success to login",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2MTExMzYxfQ.vY04uLwAqXfc5UjKLM5vGD-E-L-cT2yAABthv77AItM",
    "id": 1,
    "role": "Admin"
  }
]
```

Response (400 - Bad Request)

````json
{
"type": "Bad Request",
"message": "Email / Password is required"
}
OR
{
"type": "authentication",
"message": "You Are Not Authentication"
}

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
````

### 6. GET /courses

### Description:

- get all courses

### Response

Response (200 - OK)

```json
[
  {
    "id": 1,
    "title": "My Video Test in Node",
    "description": "ini video dari api video",
    "thumbnail": "https://vod.api.video/vod/vi2y6fd0g1d0OQvuNCHNPdTz/thumbnail.jpg",
    "videoId": "vi2y6fd0g1d0OQvuNCHNPdTz",
    "AdminId": 1,
    "createdAt": "2023-06-06T08:23:53.145Z",
    "updatedAt": "2023-06-06T08:23:53.145Z"
  },
  ",,,,"
]
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

### 7. POST /customer/course/:id

### Description:

- add customer's course

### Request:

- Body:

```json
{
  "CustomerId": 1,
  "CourseId": 2
}
```

### Response

Response (201 - OK)

```json
[
  {
    "massage": "success to create your course"
  }
]
```

Response (404 - Not Found)

````json
{
"type": "notFound",
"message": "data is not found"
}
OR
{
"type": "authentication",
"message": "You Are Not Authentication"
}

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
````

### 8. GET /customer/courses

### Description:

- get all courses customer

### Response

Response (200 - OK)

```json
[
  {
    "id": 1,
    "CustomerId": 2,
    "CourseId": 2,
    "createdAt": "2023-06-06T22:56:10.485Z",
    "updatedAt": "2023-06-06T22:56:10.485Z",
    "Course": {
      "id": 2,
      "title": "My Video Test in Node",
      "description": "ini video dari api video",
      "thumbnail": "https://vod.api.video/vod/vi2y6fd0g1d0OQvuNCHNPdTz/thumbnail.jpg",
      "videoId": "vi2y6fd0g1d0OQvuNCHNPdTz",
      "AdminId": 1,
      "createdAt": "2023-06-06T08:23:53.145Z",
      "updatedAt": "2023-06-06T08:23:53.145Z"
    }
  },
  ",,,,"
]
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

### 9. GET /customer/courses/:id

### Description:

- get detail course customer

### Response

Response (200 - OK)

```json
{
  "id": 3,
  "CustomerId": 2,
  "CourseId": 4,
  "createdAt": "2023-06-07T00:27:29.616Z",
  "updatedAt": "2023-06-07T00:27:29.616Z",
  "Course": {
    "id": 4,
    "title": "My Video Test in Node",
    "description": "ini video dari api video",
    "thumbnail": "https://vod.api.video/vod/vi4aQIklzrIpiqDBDoqNlVqT/thumbnail.jpg",
    "videoId": "vi4aQIklzrIpiqDBDoqNlVqT",
    "AdminId": 1,
    "createdAt": "2023-06-06T08:23:53.171Z",
    "updatedAt": "2023-06-06T08:23:53.171Z"
  }
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```
