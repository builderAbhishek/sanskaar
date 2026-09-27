# Sanskaar ERP

### The Cloud Operating System for Schools in Nepal 🇳🇵

**Sanskaar ERP** is a Nepal-focused school management platform designed around the country's educational workflows, including **NEB/SEE grading, Bikram Sambat academic calendars, NPR billing, Sunday–Friday school schedules, digital payments, and automated SMS communication**.

The platform is designed as a **multi-tenant SaaS ecosystem** with three primary experiences:

* 🏢 **SaaS Superadmin** — Manage schools, subscriptions, MRR, support, users, and platform settings.
* 🏫 **School ERP** — Manage students, admissions, attendance, fees, exams, academics, faculty, and school operations.
* 🎓 **Student / Parent Portal** — Access attendance, fees, results, routines, homework, study materials, and documents.

---

## 🚀 Platform Overview

### SaaS Superadmin

Centralized control center for managing multiple school tenants.

* Multi-tenant school management
* School directory & 360° school profiles
* Subscription & MRR analytics
* Platform administrators & RBAC
* Payment configuration
* Support ticket management
* SaaS reports & analytics
* Audit logs
* Platform-wide system settings
* Sparrow SMS configuration

**Demo Metrics**

* 42 onboarded schools
* 7 provinces
* NPR 14.85 Lakhs MRR
* Multi-plan subscription management

---

### 🏫 School ERP

A complete operational ERP for schools following Nepal's educational workflows.

**Core capabilities**

* Student roster & profiles
* Admissions management
* Faculty & teacher management
* Daily attendance
* Fee collection POS
* Marks entry
* Report cards
* Timetable management
* AI-assisted insights & automation
* School configuration
* Printable certificates and documents

**Academic workflows**

* NEB / SEE-oriented grading
* 75 TH + 25 PR marks structure
* Attendance compliance tracking
* Sunday–Friday timetable
* Printable academic reports

---

### 🎓 Student / Parent Portal

Mobile-first portal for students and guardians.

* Student dashboard
* Biodata & documents
* Attendance calendar
* Leave management
* Fee ledger
* Printable receipts
* SEE exam routines
* Results & grade sheets
* Class timetable
* Homework
* Assignments
* Study materials
* Certificates

---

## 🇳🇵 Nepal-Specific Features

Sanskaar is designed specifically around Nepalese school workflows.

### NEB / CDC Academic Standards

Support for Nepal-oriented academic workflows, including:

* NEB / SEE examination structure
* CDC-style grading workflows
* Letter grades from A+ to NG
* Theory + practical assessment
* Printable report cards and certificates

> Academic rules and grading configurations should be verified against the latest official NEB/CDC requirements before production deployment.

### 📅 Bikram Sambat

Native support for:

* Bikram Sambat academic years
* Baishakh–Chaitra academic calendar
* Nepal school-year workflows
* Sunday–Friday weekly scheduling

### 💰 NPR Billing

Built around Nepalese currency and school fee workflows:

* NPR (रू) billing
* Fee collection
* Fee ledgers
* Printable invoices
* Payment receipts

### 💳 Digital Payments

Architecture/UI support for Nepal-focused payment workflows:

* eSewa
* Khalti
* IPS / bank clearing workflows
* Cash collection

### 📱 Sparrow SMS

Designed for automated school communication such as:

* Morning absence alerts
* Fee notifications
* Emergency closure notices
* School announcements

---

## 📦 Module Structure

### Admin Panel

| Module         | Purpose                  |
| -------------- | ------------------------ |
| Dashboard      | Platform KPIs            |
| Schools        | School tenant management |
| School Details | 360° tenant view         |
| Users          | Admin & RBAC management  |
| Subscriptions  | Plans & MRR              |
| Plans          | Pricing management       |
| Payments       | Platform payments        |
| Support        | Support tickets          |
| Reports        | SaaS analytics           |
| Activity Logs  | Audit trail              |
| Settings       | Platform configuration   |

### School Panel

| Module          | Purpose                  |
| --------------- | ------------------------ |
| Dashboard       | School overview          |
| Students        | Student roster           |
| Student Profile | 360° student information |
| Admissions      | Admission workflow       |
| Teachers        | Faculty management       |
| Attendance      | Daily roll call          |
| Fee Collection  | POS fee collection       |
| Marks Entry     | Academic marks           |
| Report Cards    | Printable results        |
| Timetable       | Master routine           |
| AI Insights     | Insights & automation    |
| Settings        | School configuration     |

### Student Panel

| Module          | Purpose             |
| --------------- | ------------------- |
| Dashboard       | Student overview    |
| Profile         | Biodata & documents |
| Attendance      | Attendance & leave  |
| Fees            | Fee ledger          |
| Receipts        | Printable receipts  |
| Exams           | Exam schedules      |
| Results         | Grade sheets        |
| Timetable       | Class routine       |
| Homework        | Homework tracking   |
| Assignments     | Project submissions |
| Study Materials | Notes & past papers |
| Certificates    | Student documents   |

---

## 🛠️ Technology

* **HTML5**
* **CSS3**
* **JavaScript**
* **Tailwind CSS**
* **Plus Jakarta Sans**
* Responsive / mobile-first UI
* Multi-panel architecture

---

## 🎨 Design System

Sanskaar uses a modern education-focused visual identity.

| Element       | Value             |
| ------------- | ----------------- |
| Primary Brand | `#E8752F`         |
| Typography    | Plus Jakarta Sans |
| UI Framework  | Tailwind CSS      |
| Target Market | Nepal 🇳🇵        |

---

## 📁 Project Structure

```text
sanskaar/
│
├── admin/
│   ├── index.html
│   ├── schools.html
│   ├── school-details.html
│   ├── users.html
│   ├── subscriptions.html
│   ├── plans.html
│   ├── payments.html
│   ├── support.html
│   ├── reports.html
│   ├── activity-logs.html
│   └── system-settings.html
│
├── school/
│   ├── index.html
│   ├── students.html
│   ├── student-profile.html
│   ├── admissions.html
│   ├── teachers.html
│   ├── attendance.html
│   ├── fee-collection.html
│   ├── marks-entry.html
│   ├── report-card.html
│   ├── timetable.html
│   ├── ai-insights.html
│   └── school-settings.html
│
├── student/
│   ├── index.html
│   ├── profile.html
│   ├── attendance.html
│   ├── fees.html
│   ├── fee-receipts.html
│   ├── exams.html
│   ├── results.html
│   ├── timetable.html
│   ├── homework.html
│   ├── assignments.html
│   ├── study-materials.html
│   └── certificates.html
│
├── login/
│   ├── admin.html
│   ├── school.html
│   └── student.html
│
└── index.html
```

---

## 🎯 Target Market

**Primary Market:** Nepal 🇳🇵

Designed for:

* Private schools
* Secondary schools
* Higher secondary schools
* School administrators
* Teachers
* Students
* Parents / guardians

---

## 🔐 Platform Architecture

Sanskaar follows a role-based multi-panel architecture:

```text
                    Sanskaar ERP
                         │
          ┌──────────────┼──────────────┐
          │              │              │
      Superadmin      School ERP    Student/Parent
          │              │              │
      Platform       Operations       Student
      Management     Management       Experience
          │              │              │
          └──────────────┼──────────────┘
                         │
                 Nepal Education
                    Workflows
```

---

## ⚠️ Project Status

**Status: Active Development / Prototype**

The current repository represents the Sanskaar ERP platform and its interface/module architecture.

Some integrations and workflows may currently be simulated or represented at the UI/prototype level. Production deployment requires proper backend services, authentication, database infrastructure, payment gateway credentials, SMS gateway integration, security hardening, and verification against current Nepalese regulatory/academic requirements.

---

## 📌 Roadmap

* [ ] Backend API
* [ ] Multi-tenant database architecture
* [ ] Authentication & authorization
* [ ] Production RBAC
* [ ] Real eSewa integration
* [ ] Real Khalti integration
* [ ] Sparrow SMS integration
* [ ] NEB/CDC configuration engine
* [ ] Bikram Sambat date service
* [ ] School onboarding workflow
* [ ] Subscription billing
* [ ] Production analytics
* [ ] Audit & security infrastructure
* [ ] Mobile application
* [ ] Production deployment

---

## 📄 License

This project is currently proprietary.

All rights reserved unless otherwise stated.

---

## 👨‍💻 Built By

**Builder Abhishek**

Building practical software products for education, business, and digital operations.

---

### Sanskaar ERP

**Modern school management infrastructure for Nepal. 🇳🇵**
