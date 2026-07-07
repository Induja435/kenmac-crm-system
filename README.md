# 🚀 KENMAC Enterprise CRM & Partner Management Portal

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green)

**A modern Enterprise Customer Relationship Management (CRM) and Partner Management Portal developed for KENMAC Corporation.**

Designed to centralize project management, task tracking, financial operations, consultant management, knowledge sharing, reporting, and customer relationship management within a single responsive web application.

</div>

---

# 📖 Table of Contents

* Overview
* Features
* Modules
* Technology Stack
* Project Structure
* Installation
* Environment Variables
* Running the Project
* Database Configuration
* Screenshots
* Future Enhancements
* Author
* License

---

# 📌 Overview

The **KENMAC Enterprise CRM & Partner Management Portal** is a comprehensive business management platform developed using **React.js**, **TypeScript**, **Vite**, **Tailwind CSS**, and **MySQL**.

The application enables organizations to efficiently manage projects, employees, consultants, tasks, invoices, reports, financial records, documents, and customer relationships through an intuitive dashboard interface.

The project follows a modular architecture, making it scalable and easy to extend with additional enterprise features.

---

# ✨ Features

* Modern Enterprise Dashboard
* Responsive User Interface
* Project Management
* Task Management
* Consultant Directory
* Financial Dashboard
* Invoice Management
* Knowledge Base
* Reports & Analytics
* Contact Management
* CRUD Operations
* Invoice Editing
* Invoice Deletion
* Search & Filtering
* Interactive Charts
* Responsive Sidebar Navigation
* Component-Based Architecture
* Local Storage Persistence
* MySQL Database Integration
* Clean UI/UX Design

---

# 📂 Modules

## 🏠 Dashboard

The Dashboard provides a complete overview of business operations.

Features

* KPI Cards
* Revenue Summary
* Project Statistics
* Recent Invoices
* Task Overview
* Quick Navigation
* Business Analytics

---

## 📁 Projects

Manage company projects efficiently.

Features

* View Projects
* Project Status
* Progress Tracking
* Deadlines
* Team Information

---

## ✅ Tasks

Task Management System for organizing work.

Features

* Create Tasks
* Assign Tasks
* Update Status
* Priority Levels
* Progress Tracking

---

## 👨‍💼 Directory

Consultant and Employee Directory.

Features

* Consultant Profiles
* Contact Information
* Experience
* Department Details

---

## 💰 Financials

Financial Management Module.

Features

* Invoice Registry
* Create Invoice
* Edit Invoice
* Delete Invoice
* Revenue Tracking
* Payment Status

---

## 📚 Knowledge Base

Centralized repository for company resources.

Features

* Documents
* Policies
* FAQs
* Guides
* Company Resources

---

## 📊 Reports

Business Reporting Module.

Features

* Project Reports
* Financial Reports
* Performance Reports
* Business Analytics

---

## 📞 Contacts

Customer Relationship Management Module.

Features

* Customer Profiles
* Contact Details
* Communication Records
* Relationship Tracking

---

# 🛠 Technology Stack

## Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Motion

## Database

* MySQL

## Development Tools

* VS Code
* Git
* GitHub
* npm

---

# 📁 Project Structure

```
KENMAC-CRM/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── hooks/
│   ├── utils/
│   ├── data/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.local
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/KENMAC-Enterprise-CRM.git
```

Navigate to the project

```bash
cd KENMAC-Enterprise-CRM
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a file named:

```
.env.local
```

Add your Gemini API Key

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# ▶️ Run the Project

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# 🗄️ MySQL Database Configuration

Create a database

```sql
CREATE DATABASE kenmac_crm;
```

Example Invoice Table

```sql
CREATE TABLE invoices (
    id VARCHAR(50) PRIMARY KEY,
    client VARCHAR(255),
    project VARCHAR(255),
    amount DECIMAL(10,2),
    due_date DATE,
    status VARCHAR(30)
);
```

The application supports invoice CRUD operations and is designed for integration with MySQL for persistent data storage.

---

# 📷 Application Screens

The application contains the following screens:

* Login
* Dashboard
* Projects
* Tasks
* Directory
* Financials
* Knowledge Base
* Reports
* Contacts

You can add screenshots inside the `assets/screenshots/` folder and update this section with markdown image links.

Example:

```markdown
![Dashboard](assets/screenshots/dashboard.png)

![Projects](assets/screenshots/projects.png)

![Financials](assets/screenshots/financials.png)
```

---

# 🚀 Future Enhancements

* Authentication using JWT
* Role-Based Access Control
* Notification System
* Email Integration
* Cloud Deployment
* Advanced Analytics
* REST API Integration
* Dark Mode
* Export Reports to PDF & Excel
* Real-Time Collaboration
* Mobile Responsive Enhancements

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 👩‍💻 Author

**Induja Joseph**

Frontend Developer Intern – KENMAC Corporation Pvt. Ltd.

GitHub:
https://github.com/Induja435

LinkedIn:
https://www.linkedin.com/in/induja-joseph

---

# 📄 License

This project is developed for educational, internship, and portfolio purposes.

© 2026 Induja Joseph. All Rights Reserved.
