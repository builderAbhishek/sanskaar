# 🎓 Sanskaar ERP (Nepal Edition)

![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Architecture](https://img.shields.io/badge/Architecture-SaaS%20Multi--Tenant-orange.svg)
![Database](https://img.shields.io/badge/Database-MySQL%208.0%2B-lightgrey.svg)
![UI](https://img.shields.io/badge/UI-Tailwind%20CSS%20v4-38B2AC.svg)

**Sanskaar ERP** is a premium, modern, and highly scalable School Management System built specifically for the Nepalese education sector. It is designed as a SaaS (Software as a Service) platform, allowing a central admin to host and manage hundreds of schools, while each school gets its own isolated, fully-featured ERP system.

---

## 🌟 Comprehensive Feature List

The project is divided into three primary portals: **Admin Panel (SaaS Management)**, **School Panel (ERP)**, and **Student/Parent Panel**.

### 1. 🏢 SaaS Platform Admin Panel
*This panel is for the super-admins who own the Sanskaar ERP software.*
* **SaaS Dashboard:** Overview of total schools, active students, monthly recurring revenue (MRR), and system health.
* **Tenant (School) Management:** Onboard new schools, configure custom subdomains, and manage school statuses (Active, Suspended, Churned).
* **Subscription & Plans:** Manage SaaS tiers (Basic, Standard, Enterprise), set feature entitlements, and handle automated billing cycles.
* **Platform Invoicing & Payments:** Track SaaS payments from schools, generate tax invoices, and monitor payment gateway logs.
* **Support Ticket System:** Integrated helpdesk for school administrators to raise issues with the platform team.
* **System Settings & Audit Logs:** Global configuration and strict tamper-evident activity logging for all platform-level actions.

### 2. 🏫 School Management Panel (Core ERP)
*This is the main ERP used by School Principals, Teachers, Accountants, and Staff.*
* **Institution Settings:** Manage school profile, Nepal Education Board (NEB) affiliations, Pan/VAT details, academic sessions (B.S.), and fiscal years.
* **Academics & Curriculum:**
  * Manage Classes, Sections, and School Houses.
  * **Nepal CDC Alignment:** Subject mapping with 75 Theory / 25 Practical splits, credit hours, and syllabus tracking.
  * Automated Timetable & Routine generation.
* **Human Resources (HR) & Staff:**
  * Separate profiles for Teaching Faculty and Non-Teaching Staff.
  * **Biometric Attendance:** Real-time punch-in/punch-out tracking, punctuality analytics, and leave management.
  * **Payroll Management:** Salary structures, PF/CIT deductions, Dearness Allowances, and automated payslip generation.
* **Student Information System (SIS):**
  * Complete admission workflows and document management.
  * Decoupled enrollment history (track a student's journey from Nursery to Grade 12).
  * **M:N Guardian Mapping:** Link multiple guardians to multiple siblings without data duplication.
  * ID Card Generator (PVC format with QR codes).
* **Finance & Double-Entry Accounting:**
  * **Fee Management:** Custom fee structures, concessions, automated invoice generation, and receipt printing.
  * **Payment Integration:** Ready for eSewa, Khalti, and ConnectIPS.
  * **General Ledger:** Full Double-Entry accounting (Chart of Accounts, Journal Entries, Trial Balance, Income/Expense tracking).
* **Examinations & Grading (NEB Standard):**
  * Exam scheduling and admit card generation.
  * Marks entry (Theory + Internal/Practical).
  * **Automated Grading:** GPA calculation, Letter Grades (A+, A, B+... NG), and automated Result/Report Card generation.
* **LMS & Communication:**
  * Homework & Assignment distribution and tracking.
  * Study Materials & Digital Library.
  * **Sparrow SMS Integration:** Automated absence alerts, fee reminders, and bulk notices.
  * **AI Tools:** AI Study Assistant, AI Question Paper Generator, and AI Insights.

### 3. 👨‍🎓 Student & Parent Portal
*A clean, mobile-responsive dashboard for end-users.*
* **Student Dashboard:** Daily timetable, upcoming exams, and recent notices.
* **Attendance Tracking:** Monthly attendance calendar and percentage tracking for NEB compliance.
* **Fee Portal:** View due invoices, download historical receipts, and pay online.
* **Academics:** View homework, download study materials, and submit assignments online.
* **Results & Report Cards:** Secure access to terminal examination results and downloadable report cards.

---

## 🗄️ Database Schema & Architecture

The database is built on **MySQL 8.0+** using `InnoDB` and `utf8mb4`. To ensure massive scalability and absolute data security, the schema is logically partitioned into two databases with a total of **81 Tables**.

### Database 1: `sanskaar_platform_db` (16 Tables)
Manages the SaaS business, billing, and tenant registration.
1. `platform_settings` - Global configs.
2. `subscription_plans` - Pricing tiers.
3. `plan_feature_entitlements` - Feature toggles per tier.
4. `schools` - Tenant Root Table (Contains legal details).
5. `school_domains` - Custom domains.
6. `school_subscriptions` - Active SaaS plans.
7. `platform_users` - Super admins.
8. `platform_user_mfa` - 2FA security.
9. `platform_user_sessions` - Active logins.
10. `platform_password_resets` - Reset tokens.
11. `platform_invoices` - SaaS bills.
12. `platform_payments` - Payment logs.
13. `support_tickets` - Helpdesk.
14. `support_ticket_replies` - Ticket threads.
15. `platform_audit_logs` - Action tracking.
16. `system_notifications` - Broadcasts.

### Database 2: `sanskaar_school_db` (65 Tables)
Operates on a strict **Multi-Tenant Architecture**. Every tenant table uses a composite primary/foreign key `(school_id, id)` to guarantee physical data isolation between schools.

**Group A: Core Institution & RBAC**
* `school_profiles`, `academic_sessions`, `academic_terms`, `fiscal_years`, `roles`, `permissions`, `role_permissions`, `users`, `user_roles`, `user_sessions`, `user_mfa`, `user_password_resets`.

**Group B: Academics**
* `classes`, `sections`, `school_houses`, `cdc_subjects`, `class_subjects`.

**Group C: HR & Staff**
* `teachers`, `staff`, `leave_types`, `leave_applications`, `teacher_substitutions`.

**Group D: Students & Guardians**
* `students`, `guardians`, `student_guardians`, `student_enrollments`, `student_alumni`.

**Group E: Biometric Attendance**
* `biometric_devices`, `biometric_raw_punches`, `student_attendance`, `staff_attendance`.

**Group F: Fee Architecture**
* `fee_heads`, `fee_structures`, `fee_concessions`, `student_concessions`, `fee_invoices`, `fee_invoice_items`, `fee_payments`.

**Group G: Financial Accounting (Double-Entry)**
* `payment_gateway_logs`, `chart_of_accounts`, `journal_entries`, `journal_entry_items`, `salary_structures`, `payroll_records`.

**Group H: CDC Examination Engine**
* `grading_scales`, `grading_scale_tiers`, `exams`, `exam_schedules`, `exam_admit_cards`, `exam_marks`, `terminal_results`.

**Group I: Timetable & LMS**
* `timetable_periods`, `timetables`, `homework`, `homework_submissions`, `assignments`, `assignment_submissions`, `study_materials`.

**Group J: Media, Comms & AI**
* `file_storage_registry`, `notices`, `notifications`, `sparrow_sms_logs`, `certificates`, `ai_question_papers`, `school_audit_logs`.

### 🛡️ Database Triggers & Security
To ensure financial integrity, the database includes 4 strict MySQL triggers:
1. `trg_verify_journal_balance_before_post`: Ensures Debits = Credits before a ledger entry can be posted.
2. `trg_prevent_posted_journal_item_update`: Freezes ledger line items once posted.
3. `trg_prevent_posted_journal_item_delete`: Prevents deletion of posted ledger items.
4. `trg_prevent_fee_payment_delete`: Enforces immutability for fee receipts (prevents fraud/deletion, requires formal voiding).

---

## 💻 Technology Stack

* **Frontend:** HTML5, Modern Vanilla JavaScript (ES6+), CSS3.
* **Styling:** Tailwind CSS v4 (Utility-first framework for premium SaaS UI).
* **Typography:** Plus Jakarta Sans (Google Fonts).
* **Iconography:** Lucide Icons.
* **Database:** MySQL 8.0+ / MariaDB.
* **Architecture:** Multi-Page Application (MPA) with isolated modular directories.

---

## 🚀 Installation & Setup

### 1. Database Setup
A complete SQL dump is provided in the root directory: `sanskaar_full_database.sql`.
1. Open your MySQL client (e.g., phpMyAdmin, MySQL Workbench, or CLI).
2. Create or import the file directly:
   ```bash
   mysql -u root -p < sanskaar_full_database.sql
   ```
   *(This script will automatically create both `sanskaar_platform_db` and `sanskaar_school_db` and insert initial seed data).*

### 2. Frontend Setup
This project uses standard web technologies and does not require a complex build process (no Node.js/React compilation required).
1. Serve the project directory using any local web server.
   * Using Python: `python -m http.server 8000`
   * Using VS Code: Install the **Live Server** extension and click "Go Live".
   * Using XAMPP/WAMP: Place the folder in `htdocs` or `www`.
2. Navigate to:
   * **Main Site / Landing:** `http://localhost:8000/`
   * **Admin Login:** `http://localhost:8000/login/admin.html`
   * **School Login:** `http://localhost:8000/login/school.html`
   * **Student Login:** `http://localhost:8000/login/student.html`

---
*Designed & Developed for the Future of Education.*
