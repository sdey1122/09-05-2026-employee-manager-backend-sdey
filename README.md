# **Role-Based Assignment Management System (RBAC)**

---

## **Overview**

A backend application built with **Node.js, Express.js, and MongoDB** that implements **Role-Based Access Control (RBAC)**.
The system allows **Admins, Managers, and Employees** to manage users and tasks with proper authorization.

---

## **Tech Stack**

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **bcryptjs**
* **Multer (file upload)**
* **Cloudinary (image storage)**

---

## **Features**

### **Authentication**

* Register user
* Login with JWT
* Protected routes using middleware

---

### **Roles**

* **Admin**
* **Manager**
* **Employee**

---

### **User Management (Admin Only)**

* Create user
* Get all users
* Get user by ID
* Update user
* Soft delete user
* Change user status

---

### **Task Management**

* Create task (**Admin, Manager**)
* Assign task (**Admin, Manager**)
* Get all tasks (**role-based**)
* Get single task
* Update task
* Delete task (**Admin only**)
* Change task status

---

### **File Upload**

* Avatar upload using **Multer + Cloudinary**

---

## **API Endpoints**

### **Auth**

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout`

---

### **Users**

* `GET /api/users`
* `GET /api/users/:id`
* `POST /api/users`
* `PUT /api/users/:id`
* `DELETE /api/users/:id`
* `PATCH /api/users/status/:id`

---

### **Tasks**

* `GET /api/tasks`
* `GET /api/tasks/:id`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`
* `PATCH /api/tasks/status/:id`
* `PATCH /api/tasks/assign/:id`

---

## **Postman Collection**

A ready-to-use Postman collection is included to test all APIs easily.

**File:** `employee-manager-backend.postman_collection.json`

### How to use:

1. Open Postman
2. Click **Import**
3. Select the file from the project
4. Run APIs directly

---

## **Setup**

1. Clone the repository

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file and add:

   ```
   PORT=7059
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

4. Run the server

   ```
   npm run dev
   ```

---

## **Authorization**

Use Bearer Token in headers for protected routes:

```id="p2d4sk"
Authorization: Bearer <token>
```

---

## **Notes**

* Admin has full control over users and tasks
* Manager handles task creation and assignment
* Employee can only view and update assigned tasks
* Passwords are hashed using **bcrypt**
* Soft delete is implemented for users

---

## **Author**

**Subhankar Dey**
