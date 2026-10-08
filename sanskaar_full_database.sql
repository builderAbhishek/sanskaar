-- ============================================================================
-- SANSKAAR ERP — PLATFORM SAAS OPERATOR DATABASE
-- Project: Sanskaar ERP (Nepal Edition)
-- Database: sanskaar_platform_db
-- Dialect: MySQL 8.0+ / InnoDB / utf8mb4 / utf8mb4_0900_ai_ci
-- Target Scope: SaaS Management, Multi-Tenant Registry, Subscriptions, Audit
-- Total Tables: Exactly 16 Tables
-- ============================================================================

CREATE DATABASE IF NOT EXISTS sanskaar_platform_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE sanskaar_platform_db;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- TABLE 1: platform_settings
-- Global platform-wide telemetry, default currency, timezones, and master gateway keys.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_settings;
CREATE TABLE platform_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT NULL,
    data_type VARCHAR(20) NOT NULL DEFAULT 'string' COMMENT 'string, json, boolean, integer',
    is_secret TINYINT(1) NOT NULL DEFAULT 0,
    description VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_platform_setting_key UNIQUE (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 2: subscription_plans
-- Master subscription plan tiers (Basic, Professional, Enterprise) and student caps.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS subscription_plans;
CREATE TABLE subscription_plans (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    plan_code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    billing_cycle VARCHAR(20) NOT NULL DEFAULT 'MONTHLY' COMMENT 'MONTHLY, ANNUAL',
    student_capacity INT NOT NULL DEFAULT 1000,
    description TEXT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_plan_code UNIQUE (plan_code),
    INDEX idx_plan_active (is_active, is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 3: plan_feature_entitlements
-- Granular module entitlement flags assigned to subscription tiers.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS plan_feature_entitlements;
CREATE TABLE plan_feature_entitlements (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    plan_id VARCHAR(36) NOT NULL,
    feature_key VARCHAR(100) NOT NULL,
    feature_name VARCHAR(150) NOT NULL,
    is_enabled TINYINT(1) NOT NULL DEFAULT 1,
    limit_value VARCHAR(100) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_plan_feature UNIQUE (plan_id, feature_key),
    CONSTRAINT fk_pfe_plan FOREIGN KEY (plan_id)
        REFERENCES subscription_plans (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 4: schools (Tenant Master Directory)
-- Central registry of all tenant schools across Nepal's 7 provinces.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS schools;
CREATE TABLE schools (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_code VARCHAR(50) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    nepali_name VARCHAR(255) NULL,
    affiliation_board VARCHAR(100) NOT NULL DEFAULT 'NEB' COMMENT 'NEB, Cambridge, CBSE',
    neb_code VARCHAR(50) NULL,
    pan_number VARCHAR(50) NULL,
    province VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    city_municipality VARCHAR(150) NOT NULL,
    ward_no VARCHAR(10) NULL,
    address_details TEXT NULL,
    phone1 VARCHAR(30) NOT NULL,
    phone2 VARCHAR(30) NULL,
    email VARCHAR(150) NOT NULL,
    contact_person_name VARCHAR(150) NOT NULL,
    contact_person_phone VARCHAR(30) NULL,
    current_plan_id VARCHAR(36) NOT NULL,
    subscription_status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE, TRIAL, SUSPENDED, CANCELLED',
    joined_date DATE NOT NULL,
    renewal_date DATE NOT NULL,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_school_code UNIQUE (school_code),
    CONSTRAINT uq_school_slug UNIQUE (slug),
    CONSTRAINT fk_schools_plan FOREIGN KEY (current_plan_id)
        REFERENCES subscription_plans (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_school_status (subscription_status, is_deleted),
    INDEX idx_school_province (province),
    INDEX idx_school_renewal (renewal_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 5: school_domains
-- Vanity custom domains and sub-domains mapped to tenant schools.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS school_domains;
CREATE TABLE school_domains (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    domain_name VARCHAR(255) NOT NULL,
    is_primary TINYINT(1) NOT NULL DEFAULT 0,
    is_ssl_active TINYINT(1) NOT NULL DEFAULT 0,
    verification_status VARCHAR(30) NOT NULL DEFAULT 'VERIFIED' COMMENT 'PENDING, VERIFIED, FAILED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_domain_name UNIQUE (domain_name),
    CONSTRAINT fk_sd_school FOREIGN KEY (school_id)
        REFERENCES schools (id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_sd_school (school_id, is_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 6: school_subscriptions
-- Active and historical billing contracts and recurring MRR records per school.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS school_subscriptions;
CREATE TABLE school_subscriptions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    plan_id VARCHAR(36) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL DEFAULT 'MONTHLY' COMMENT 'MONTHLY, ANNUAL',
    amount_npr DECIMAL(12,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE, EXPIRED, CANCELLED, SUSPENDED',
    auto_renew TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ss_school FOREIGN KEY (school_id)
        REFERENCES schools (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ss_plan FOREIGN KEY (plan_id)
        REFERENCES subscription_plans (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_ss_school (school_id, status),
    INDEX idx_ss_expiry (end_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 7: platform_users
-- Platform operator team accounts (Superadmins, Billing Managers, Support Engineers).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_users;
CREATE TABLE platform_users (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'SUPER_ADMIN' COMMENT 'SUPER_ADMIN, SUPPORT_LEAD, BILLING_ADMIN',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE, INACTIVE, SUSPENDED',
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until DATETIME NULL,
    last_login_at DATETIME NULL,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_platform_user_username UNIQUE (username),
    CONSTRAINT uq_platform_user_email UNIQUE (email),
    INDEX idx_platform_user_status (status, is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 8: platform_user_mfa
-- Multi-Factor Authentication (TOTP MFA) credentials for platform operators.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_user_mfa;
CREATE TABLE platform_user_mfa (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    mfa_secret VARCHAR(100) NOT NULL,
    recovery_codes_hash JSON NULL,
    is_enabled TINYINT(1) NOT NULL DEFAULT 0,
    verified_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_pum_user UNIQUE (user_id),
    CONSTRAINT fk_pum_user FOREIGN KEY (user_id)
        REFERENCES platform_users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 9: platform_user_sessions
-- Active operator sessions, hashed refresh tokens, and remote revocation triggers.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_user_sessions;
CREATE TABLE platform_user_sessions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    refresh_token_hash VARCHAR(64) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500) NULL,
    device_fingerprint VARCHAR(100) NULL,
    expires_at DATETIME NOT NULL,
    is_revoked TINYINT(1) NOT NULL DEFAULT 0,
    last_activity_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_pus_token_hash UNIQUE (refresh_token_hash),
    CONSTRAINT fk_pus_user FOREIGN KEY (user_id)
        REFERENCES platform_users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_pus_user_active (user_id, is_revoked, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 10: platform_password_resets
-- Cryptographic password reset tokens with strict 15-minute expiration.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_password_resets;
CREATE TABLE platform_password_resets (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    is_used TINYINT(1) NOT NULL DEFAULT 0,
    used_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_ppr_token_hash UNIQUE (token_hash),
    CONSTRAINT fk_ppr_user FOREIGN KEY (user_id)
        REFERENCES platform_users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_ppr_user_pending (user_id, is_used, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 11: platform_invoices
-- Official SaaS subscription tax invoices billed to tenant schools.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_invoices;
CREATE TABLE platform_invoices (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    subscription_id VARCHAR(36) NOT NULL,
    invoice_number VARCHAR(50) NOT NULL,
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    subtotal_npr DECIMAL(12,2) NOT NULL,
    tax_vat_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    total_npr DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'UNPAID' COMMENT 'UNPAID, PAID, OVERDUE, VOIDED',
    notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_pi_invoice_no UNIQUE (invoice_number),
    CONSTRAINT fk_pi_school FOREIGN KEY (school_id)
        REFERENCES schools (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_pi_sub FOREIGN KEY (subscription_id)
        REFERENCES school_subscriptions (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_pi_school_status (school_id, status),
    INDEX idx_pi_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 12: platform_payments
-- Immutable SaaS subscription fee settlements from schools (ConnectIPS, eSewa, Khalti).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_payments;
CREATE TABLE platform_payments (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    invoice_id VARCHAR(36) NOT NULL,
    school_id VARCHAR(36) NOT NULL,
    transaction_reference VARCHAR(100) NOT NULL,
    payment_method VARCHAR(50) NOT NULL COMMENT 'CONNECT_IPS, ESEWA, KHALTI, NABIL_BANK_TRANSFER, CASH',
    amount_npr DECIMAL(12,2) NOT NULL,
    payment_date DATETIME NOT NULL,
    gateway_response JSON NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED' COMMENT 'COMPLETED, FAILED, REFUNDED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_ppay_txn_ref UNIQUE (transaction_reference),
    CONSTRAINT fk_ppay_invoice FOREIGN KEY (invoice_id)
        REFERENCES platform_invoices (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ppay_school FOREIGN KEY (school_id)
        REFERENCES schools (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_ppay_school_date (school_id, payment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 13: support_tickets
-- Multi-school tenant customer support helpdesk ticket queue.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS support_tickets;
CREATE TABLE support_tickets (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    ticket_number VARCHAR(50) NOT NULL,
    school_id VARCHAR(36) NOT NULL,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'GENERAL' COMMENT 'BILLING, ACADEMIC, EXAM, SMS_GATEWAY, TECHNICAL',
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM' COMMENT 'LOW, MEDIUM, HIGH, URGENT',
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN' COMMENT 'OPEN, IN_PROGRESS, RESOLVED, CLOSED',
    assigned_to VARCHAR(36) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_st_ticket_number UNIQUE (ticket_number),
    CONSTRAINT fk_st_school FOREIGN KEY (school_id)
        REFERENCES schools (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_st_assigned FOREIGN KEY (assigned_to)
        REFERENCES platform_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_st_school (school_id, status),
    INDEX idx_st_status_priority (status, priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 14: support_ticket_replies
-- Conversation correspondence between school staff and platform engineers.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS support_ticket_replies;
CREATE TABLE support_ticket_replies (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    ticket_id VARCHAR(36) NOT NULL,
    sender_type VARCHAR(20) NOT NULL COMMENT 'PLATFORM_USER, SCHOOL_STAFF',
    sender_id VARCHAR(36) NOT NULL,
    sender_name VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_str_ticket FOREIGN KEY (ticket_id)
        REFERENCES support_tickets (id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_str_ticket (ticket_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 15: platform_audit_logs
-- Immutable security audit trail recording platform operations with IP/NPT time.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS platform_audit_logs;
CREATE TABLE platform_audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    actor_user_id VARCHAR(36) NULL,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(36) NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pal_actor FOREIGN KEY (actor_user_id)
        REFERENCES platform_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_pal_entity (entity_type, entity_id),
    INDEX idx_pal_actor (actor_user_id, created_at),
    INDEX idx_pal_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 16: system_notifications
-- Global system maintenance broadcasts and announcements across tenants.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS system_notifications;
CREATE TABLE system_notifications (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    target_type VARCHAR(30) NOT NULL DEFAULT 'ALL_SCHOOLS' COMMENT 'ALL_SCHOOLS, SPECIFIC_SCHOOLS, SPECIFIC_PLAN',
    target_filter JSON NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'INFO' COMMENT 'INFO, WARNING, CRITICAL',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    expires_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_sn_active (is_active, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- SEED DATA: sanskaar_platform_db
-- ============================================================================

-- 1. Platform Settings
INSERT INTO platform_settings (setting_key, setting_value, data_type, is_secret, description) VALUES
('platform_name', 'Sanskaar ERP Platform', 'string', 0, 'Central SaaS Operating Platform Name'),
('default_currency', 'NPR', 'string', 0, 'National currency of Nepal'),
('currency_symbol', 'रू', 'string', 0, 'Nepalese Rupee Symbol'),
('timezone', 'Asia/Kathmandu', 'string', 0, 'Nepal Standard Time (GMT+5:45)'),
('sparrow_sms_master_token', 'CONFIG_REF_SPARROW_MASTER_KEY', 'string', 1, 'Master SMS Gateway Key Placeholder'),
('maintenance_mode', 'false', 'boolean', 0, 'Platform Maintenance Mode Flag');

-- 2. Subscription Plans
INSERT INTO subscription_plans (id, plan_code, name, price_npr, billing_cycle, student_capacity, description, is_active) VALUES
('PLAN-BASIC', 'BASIC', 'Basic Plan', 15000.00, 'MONTHLY', 1000, 'Essential student and attendance operations for small schools', 1),
('PLAN-PRO', 'PRO', 'Professional Plan', 35000.00, 'MONTHLY', 2000, 'Full digital ERP with online eSewa/Khalti fee collection and biometrics', 1),
('PLAN-ENT', 'ENTERPRISE', 'Enterprise Plan', 65000.00, 'MONTHLY', 10000, 'Unlimited multi-wing campus, AI tools, and custom branding', 1);

-- 3. Plan Feature Entitlements
INSERT INTO plan_feature_entitlements (id, plan_id, feature_key, feature_name, is_enabled, limit_value) VALUES
('PFE-01', 'PLAN-BASIC', 'student_info_system', 'Student & Admissions Portal', 1, '1000'),
('PFE-02', 'PLAN-BASIC', 'sms_gateway', 'Sparrow SMS Alerts', 1, 'Standard'),
('PFE-03', 'PLAN-PRO', 'online_fees', 'eSewa & Khalti Online Fee POS', 1, 'Unlimited'),
('PFE-04', 'PLAN-PRO', 'biometric_sync', 'Biometric Hardware Turnstile Sync', 1, '5 Devices'),
('PFE-05', 'PLAN-ENT', 'ai_question_generator', 'AI CDC Question Paper Generator', 1, 'Unlimited'),
('PFE-06', 'PLAN-ENT', 'custom_mobile_app', 'Custom School Android App', 1, 'Enabled');

-- 4. Schools (Tenants)
INSERT INTO schools (id, school_code, slug, name, nepali_name, affiliation_board, neb_code, pan_number, province, district, city_municipality, ward_no, address_details, phone1, phone2, email, contact_person_name, contact_person_phone, current_plan_id, subscription_status, joined_date, renewal_date) VALUES
('SCH-KTM-01', 'KVSS-27014', 'kvss', 'Kathmandu Valley Secondary School', 'काठमाडौँ भ्याली माध्यमिक विद्यालय', 'NEB', '27014', '301298412', 'Bagmati Province', 'Kathmandu', 'Kathmandu Metropolitan City', '4', 'Maharajgunj-4, Ring Road', '+977 1 4720911', '+977 1 4720200', 'principal@kvss.edu.np', 'Prof. Dr. Ram Bahadur Thapa', '+977 9851044219', 'PLAN-ENT', 'ACTIVE', '2022-04-14', '2027-04-13'),
('SCH-PKR-02', 'PMA-33018', 'pma', 'Pokhara Modern Academy', 'पोखरा मोर्डन एकेडेमी', 'NEB', '33018', '302918231', 'Gandaki Province', 'Kaski', 'Pokhara Metropolitan City', '6', 'Lakeside-6, Pokhara', '+977 61 520441', NULL, 'info@pokharamodern.edu.np', 'Mrs. Meena Gurung', '+977 9856023411', 'PLAN-PRO', 'ACTIVE', '2023-01-10', '2027-01-09'),
('SCH-BRT-03', 'BPM-56012', 'bpm', 'Biratnagar Public Model Higher Secondary', 'विराटनगर पब्लिक मोडल माध्यमिक विद्यालय', 'NEB', '56012', '304819283', 'Koshi Province', 'Morang', 'Biratnagar Metropolitan City', '2', 'Main Road, Biratnagar', '+977 21 462100', NULL, 'admin@biratpublic.edu.np', 'Mr. Narayan Prasad Karki', '+977 9852033412', 'PLAN-PRO', 'ACTIVE', '2023-03-20', '2027-03-19');

-- 5. School Domains
INSERT INTO school_domains (id, school_id, domain_name, is_primary, is_ssl_active, verification_status) VALUES
('DOM-01', 'SCH-KTM-01', 'kvss.sanskaar.edu.np', 1, 1, 'VERIFIED'),
('DOM-02', 'SCH-PKR-02', 'pma.sanskaar.edu.np', 1, 1, 'VERIFIED'),
('DOM-03', 'SCH-BRT-03', 'bpm.sanskaar.edu.np', 1, 1, 'VERIFIED');

-- 6. School Subscriptions
INSERT INTO school_subscriptions (id, school_id, plan_id, billing_cycle, amount_npr, start_date, end_date, status, auto_renew) VALUES
('SUB-01', 'SCH-KTM-01', 'PLAN-ENT', 'MONTHLY', 65000.00, '2026-09-01', '2026-09-30', 'ACTIVE', 1),
('SUB-02', 'SCH-PKR-02', 'PLAN-PRO', 'MONTHLY', 35000.00, '2026-09-01', '2026-09-30', 'ACTIVE', 1),
('SUB-03', 'SCH-BRT-03', 'PLAN-PRO', 'MONTHLY', 35000.00, '2026-09-01', '2026-09-30', 'ACTIVE', 1);

-- 7. Platform Users (Demo Super Admin)
-- Password Hash below represents standard Argon2id/Bcrypt demo placeholder hash for 'SanskaarAdmin2083#'
INSERT INTO platform_users (id, username, email, password_hash, full_name, role, status) VALUES
('USR-ADMIN-01', 'superadmin', 'admin@sanskaar.io', '$2y$12$e8752f992100abcdef1234567890abcdef1234567890abcdef123', 'Bikash Karki', 'SUPER_ADMIN', 'ACTIVE'),
('USR-SUPP-02', 'support_lead', 'support@sanskaar.io', '$2y$12$e8752f992100abcdef1234567890abcdef1234567890abcdef123', 'Sushila Sharma', 'SUPPORT_LEAD', 'ACTIVE');

-- 8. Platform Invoices
INSERT INTO platform_invoices (id, school_id, subscription_id, invoice_number, billing_period_start, billing_period_end, subtotal_npr, tax_vat_npr, total_npr, due_date, status) VALUES
('INV-PL-001', 'SCH-KTM-01', 'SUB-01', 'SAAS-INV-2083-091', '2026-09-01', '2026-09-30', 65000.00, 0.00, 65000.00, '2026-09-10', 'PAID'),
('INV-PL-002', 'SCH-PKR-02', 'SUB-02', 'SAAS-INV-2083-092', '2026-09-01', '2026-09-30', 35000.00, 0.00, 35000.00, '2026-09-10', 'PAID');

-- 9. Platform Payments
INSERT INTO platform_payments (id, invoice_id, school_id, transaction_reference, payment_method, amount_npr, payment_date, status) VALUES
('PAY-PL-001', 'INV-PL-001', 'SCH-KTM-01', 'CIPS-KVSS-2083-09-01', 'CONNECT_IPS', 65000.00, '2026-09-01 10:30:00', 'COMPLETED'),
('PAY-PL-002', 'INV-PL-002', 'SCH-PKR-02', 'ESW-PMA-2083-09-01', 'ESEWA', 35000.00, '2026-09-01 11:15:00', 'COMPLETED');

-- 10. Support Tickets
INSERT INTO support_tickets (id, ticket_number, school_id, contact_name, contact_email, subject, category, priority, status, assigned_to) VALUES
('TCK-401', 'TCK-2083-401', 'SCH-PKR-02', 'Mrs. Meena Gurung', 'info@pokharamodern.edu.np', 'eSewa webhook timeout during peak admission counter rush', 'BILLING', 'HIGH', 'IN_PROGRESS', 'USR-SUPP-02'),
('TCK-402', 'TCK-2083-402', 'SCH-KTM-01', 'Dr. Ram Bahadur Thapa', 'principal@kvss.edu.np', 'Request for custom SEE character certificate ornate border template', 'TECHNICAL', 'MEDIUM', 'OPEN', 'USR-SUPP-02');

-- 11. Support Ticket Replies
INSERT INTO support_ticket_replies (id, ticket_id, sender_type, sender_id, sender_name, message) VALUES
('REP-001', 'TCK-401', 'PLATFORM_USER', 'USR-SUPP-02', 'Sushila Sharma', 'We are inspecting the eSewa transaction log trace for Pokhara Modern Academy gateway ID.');

-- 12. System Notifications
INSERT INTO system_notifications (id, title, message, target_type, severity, is_active) VALUES
('NOTIF-01', 'Scheduled Platform Upgrade', 'Sanskaar ERP will undergo 15 minutes of routine cloud infrastructure optimization at 02:00 AM NPT on Saturday.', 'ALL_SCHOOLS', 'INFO', 1);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- VERIFICATION CHECK: sanskaar_platform_db
-- ============================================================================
SELECT 'sanskaar_platform_db initialized successfully with exactly 16 tables.' AS status;
-- ============================================================================
-- SANSKAAR ERP — MULTI-TENANT SCHOOL OPERATING SYSTEM DATABASE
-- Project: Sanskaar ERP (Nepal Edition)
-- Database: sanskaar_school_db
-- Dialect: MySQL 8.0+ / InnoDB / utf8mb4 / utf8mb4_0900_ai_ci
-- Target Scope: School ERP Operations, Student/Parent Portal, Double-Entry GL
-- Total Tables: Exactly 65 Tables
-- Multi-Tenant Security: Composite Foreign Keys (school_id, parent_id)
-- ============================================================================

CREATE DATABASE IF NOT EXISTS sanskaar_school_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE sanskaar_school_db;

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================================
-- GROUP A: CORE INSTITUTION, AUTHENTICATION & ACCESS CONTROL (12 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 1: school_profiles (Tenant Root Table)
-- Primary tenant anchor in School DB. Key matches platform_db.schools(id).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS school_profiles;
CREATE TABLE school_profiles (
    school_id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_code VARCHAR(50) NOT NULL,
    legal_name VARCHAR(255) NOT NULL,
    nepali_name VARCHAR(255) NULL,
    motto VARCHAR(255) NULL,
    affiliation_board VARCHAR(100) NOT NULL DEFAULT 'NEB',
    neb_code VARCHAR(50) NULL,
    education_ministry_reg_no VARCHAR(50) NULL,
    pan_vat_number VARCHAR(50) NULL,
    estd_year_bs VARCHAR(20) NULL,
    estd_year_ad VARCHAR(20) NULL,
    province VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    municipality VARCHAR(150) NOT NULL,
    ward_no VARCHAR(10) NULL,
    address_line TEXT NULL,
    phone_primary VARCHAR(30) NOT NULL,
    phone_secondary VARCHAR(30) NULL,
    email_official VARCHAR(150) NOT NULL,
    website_url VARCHAR(255) NULL,
    principal_name VARCHAR(150) NOT NULL,
    vice_principal_name VARCHAR(150) NULL,
    primary_bank_name VARCHAR(150) NULL,
    primary_bank_account_no VARCHAR(50) NULL,
    esewa_merchant_code VARCHAR(100) NULL,
    khalti_public_key VARCHAR(150) NULL,
    connect_ips_member_id VARCHAR(100) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_sp_school_code UNIQUE (school_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 2: academic_sessions
-- Bikram Sambat academic years (e.g. 2083-84 B.S.) with Gregorian mapping.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS academic_sessions;
CREATE TABLE academic_sessions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    session_bs VARCHAR(50) NOT NULL COMMENT 'e.g. 2083-84 B.S.',
    gregorian_period VARCHAR(100) NOT NULL COMMENT 'e.g. Apr 2026 - Mar 2027 A.D.',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_as_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_as_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_as_session_bs UNIQUE (school_id, session_bs),
    INDEX idx_as_active (school_id, is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 3: academic_terms
-- Evaluation term divisions per session (Term 1, Mid-Term, Pre-Board, Annual).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS academic_terms;
CREATE TABLE academic_terms (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    term_name VARCHAR(100) NOT NULL COMMENT 'First Term, Mid-Term, Pre-Board, Annual',
    term_order INT NOT NULL DEFAULT 1,
    weightage_percentage DECIMAL(5,2) NOT NULL DEFAULT 25.00,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED' COMMENT 'SCHEDULED, ONGOING, COMPLETED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_at_session FOREIGN KEY (school_id, session_id)
        REFERENCES academic_sessions (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_at_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_at_session_term UNIQUE (school_id, session_id, term_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 4: fiscal_years
-- Accounting periods for financial ledger and taxation compliance (Shrawan-Ashadh).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS fiscal_years;
CREATE TABLE fiscal_years (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    fiscal_year_bs VARCHAR(50) NOT NULL COMMENT 'e.g. 2083/84',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_closed TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_fy_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_fy_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_fy_year UNIQUE (school_id, fiscal_year_bs)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 5: roles
-- Tenant-defined RBAC roles (Principal, Teacher, Accountant, Student, Parent).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    role_code VARCHAR(50) NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    is_system_default TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_roles_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_roles_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_roles_code UNIQUE (school_id, role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 6: permissions
-- Atomic permission catalog (Global catalog inside school database).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS permissions;
CREATE TABLE permissions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    permission_code VARCHAR(100) NOT NULL,
    module_name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_perm_code UNIQUE (permission_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 7: role_permissions
-- Association matrix linking privileges to tenant roles.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS role_permissions;
CREATE TABLE role_permissions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    permission_id VARCHAR(36) NOT NULL,
    can_view TINYINT(1) NOT NULL DEFAULT 1,
    can_create TINYINT(1) NOT NULL DEFAULT 0,
    can_edit TINYINT(1) NOT NULL DEFAULT 0,
    can_delete TINYINT(1) NOT NULL DEFAULT 0,
    can_export TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rp_role FOREIGN KEY (school_id, role_id)
        REFERENCES roles (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_rp_perm FOREIGN KEY (permission_id)
        REFERENCES permissions (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_role_perm UNIQUE (school_id, role_id, permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 8: users
-- Unified user authentication accounts for faculty, staff, students, and guardians.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NULL,
    phone_number VARCHAR(30) NULL,
    password_hash VARCHAR(255) NOT NULL COMMENT 'Argon2id or bcrypt work factor >= 12',
    user_type VARCHAR(30) NOT NULL COMMENT 'STAFF, TEACHER, STUDENT, PARENT',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE, INACTIVE, SUSPENDED',
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until DATETIME NULL,
    last_login_at DATETIME NULL,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    deleted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_users_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_users_username UNIQUE (school_id, username),
    INDEX idx_users_login (school_id, username, status),
    INDEX idx_users_type (school_id, user_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 9: user_roles
-- Multi-role assignment junction table (Allows a user to hold multiple roles).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ur_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ur_role FOREIGN KEY (school_id, role_id)
        REFERENCES roles (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_user_roles UNIQUE (school_id, user_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 10: user_sessions
-- Multi-device authentication session registry with hashed refresh tokens.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS user_sessions;
CREATE TABLE user_sessions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    refresh_token_hash VARCHAR(64) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500) NULL,
    device_fingerprint VARCHAR(100) NULL,
    expires_at DATETIME NOT NULL,
    is_revoked TINYINT(1) NOT NULL DEFAULT 0,
    last_activity_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_us_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_us_token_hash UNIQUE (refresh_token_hash),
    INDEX idx_us_active (school_id, user_id, is_revoked, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 11: user_mfa
-- TOTP Two-Factor Authentication credentials for school administrators.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS user_mfa;
CREATE TABLE user_mfa (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    mfa_secret VARCHAR(100) NOT NULL,
    recovery_codes_hash JSON NULL,
    is_enabled TINYINT(1) NOT NULL DEFAULT 0,
    verified_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_umfa_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_umfa_user UNIQUE (school_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 12: user_password_resets
-- Cryptographic password reset tokens with strict 15-minute expiration.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS user_password_resets;
CREATE TABLE user_password_resets (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    is_used TINYINT(1) NOT NULL DEFAULT 0,
    used_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_upr_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_upr_token UNIQUE (token_hash),
    INDEX idx_upr_pending (school_id, user_id, is_used, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP B: ACADEMICS, CDC CURRICULUM & STRUCTURE (5 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 13: classes
-- Academic grades (Nursery to Class 12, BLE, SEE).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS classes;
CREATE TABLE classes (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    class_name VARCHAR(100) NOT NULL COMMENT 'e.g. Class 10 (SEE)',
    numeric_order INT NOT NULL DEFAULT 1,
    wing VARCHAR(50) NOT NULL DEFAULT 'SENIOR' COMMENT 'PRIMARY, MIDDLE, SENIOR',
    description VARCHAR(255) NULL,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_classes_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_classes_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_classes_name UNIQUE (school_id, class_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 14: sections
-- Section divisions per class (A, B, C) with classroom location.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS sections;
CREATE TABLE sections (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    section_name VARCHAR(50) NOT NULL COMMENT 'A, B, C',
    room_number VARCHAR(50) NULL COMMENT 'Room 304, Senior Wing',
    capacity INT NOT NULL DEFAULT 45,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_sections_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_sections_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_sections_name UNIQUE (school_id, class_id, section_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 15: school_houses
-- Student extracurricular houses (Sagarmatha, Annapurna, Machhapuchhre, Lhotse).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS school_houses;
CREATE TABLE school_houses (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    house_name VARCHAR(100) NOT NULL,
    house_color VARCHAR(30) NULL,
    motto VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_houses_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_houses_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_houses_name UNIQUE (school_id, house_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 16: cdc_subjects
-- Curriculum Development Centre subjects with theory/practical breakdowns and pass criteria.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS cdc_subjects;
CREATE TABLE cdc_subjects (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    subject_code VARCHAR(50) NOT NULL COMMENT 'e.g. MTH-103, SCI-104',
    subject_name VARCHAR(150) NOT NULL,
    nepali_name VARCHAR(200) NULL,
    credit_hours DECIMAL(3,1) NOT NULL DEFAULT 4.0,
    theory_full_marks DECIMAL(5,2) NOT NULL DEFAULT 75.00,
    practical_full_marks DECIMAL(5,2) NOT NULL DEFAULT 25.00,
    theory_pass_marks DECIMAL(5,2) NOT NULL DEFAULT 27.00 COMMENT 'Mandatory 35% theory pass threshold',
    practical_pass_marks DECIMAL(5,2) NOT NULL DEFAULT 10.00 COMMENT 'Mandatory 40% practical pass threshold',
    is_optional TINYINT(1) NOT NULL DEFAULT 0,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_subjects_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_subjects_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_subjects_code UNIQUE (school_id, class_id, subject_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP C: HUMAN RESOURCES & FACULTY MANAGEMENT (5 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 17: teachers
-- Teaching faculty directory, departmental affiliations, and basic pay in NPR.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS teachers;
CREATE TABLE teachers (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    teacher_code VARCHAR(50) NOT NULL COMMENT 'e.g. TCH-001',
    full_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    qualification VARCHAR(200) NOT NULL,
    experience_years VARCHAR(50) NULL,
    phone_number VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL,
    joining_date_bs VARCHAR(20) NOT NULL,
    basic_salary_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    biometric_user_id VARCHAR(50) NULL,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_teachers_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_teachers_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_teachers_code UNIQUE (school_id, teacher_code),
    INDEX idx_teachers_dept (school_id, department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 18: staff
-- Non-teaching administrative, library, and operational support personnel.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS staff;
CREATE TABLE staff (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    staff_code VARCHAR(50) NOT NULL COMMENT 'e.g. STF-001',
    full_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    basic_salary_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    biometric_user_id VARCHAR(50) NULL,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_staff_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_staff_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_staff_code UNIQUE (school_id, staff_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 19: class_subjects
-- Allocates CDC subjects and teachers to specific sections.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS class_subjects;
CREATE TABLE class_subjects (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    section_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cs_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_cs_section FOREIGN KEY (school_id, section_id)
        REFERENCES sections (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_cs_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_cs_teacher FOREIGN KEY (school_id, teacher_id)
        REFERENCES teachers (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_class_subjects UNIQUE (school_id, section_id, subject_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 20: leave_types
-- Statutory and institutional leave policies (Casual, Sick, Maternity, Mourning).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS leave_types;
CREATE TABLE leave_types (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    leave_name VARCHAR(100) NOT NULL,
    days_allowed_per_year INT NOT NULL DEFAULT 12,
    is_paid TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lt_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_leave_types_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_leave_name UNIQUE (school_id, leave_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 21: leave_applications
-- Staff and student leave requests, medical certificates, approval workflows.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS leave_applications;
CREATE TABLE leave_applications (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    leave_type_id VARCHAR(36) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    total_days INT NOT NULL DEFAULT 1,
    reason TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING, APPROVED, REJECTED',
    approved_by VARCHAR(36) NULL,
    approval_remarks VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_la_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_la_type FOREIGN KEY (school_id, leave_type_id)
        REFERENCES leave_types (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_la_status (school_id, status, from_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 22: teacher_substitutions
-- Covers classes and periods when regular teachers are on approved leave.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS teacher_substitutions;
CREATE TABLE teacher_substitutions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    substitution_date DATE NOT NULL,
    original_teacher_id VARCHAR(36) NOT NULL,
    substitute_teacher_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    section_id VARCHAR(36) NOT NULL,
    period_order INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ASSIGNED' COMMENT 'ASSIGNED, COMPLETED, CANCELLED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ts_orig_tch FOREIGN KEY (school_id, original_teacher_id)
        REFERENCES teachers (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ts_sub_tch FOREIGN KEY (school_id, substitute_teacher_id)
        REFERENCES teachers (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ts_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ts_section FOREIGN KEY (school_id, section_id)
        REFERENCES sections (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_ts_date (school_id, substitution_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP D: STUDENT ROSTER, GUARDIANS & ENROLLMENT HISTORY (5 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 23: students
-- Core permanent student personal identity (DOB, blood group, admission number).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS students;
CREATE TABLE students (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    admission_no VARCHAR(50) NOT NULL COMMENT 'Permanent Admission ID e.g. ADM-2078-1001',
    neb_symbol_no VARCHAR(50) NULL COMMENT 'National SEE/BLE Exam Symbol Number e.g. 02701429A',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    nepali_name VARCHAR(150) NULL,
    gender VARCHAR(20) NOT NULL COMMENT 'MALE, FEMALE, OTHER',
    dob_bs VARCHAR(20) NOT NULL COMMENT 'e.g. 2067-01-12 B.S.',
    dob_ad DATE NOT NULL,
    blood_group VARCHAR(10) NULL COMMENT 'A+, B+, O+, AB+, etc.',
    house_id VARCHAR(36) NULL,
    admission_year_bs VARCHAR(20) NOT NULL,
    address_line TEXT NULL,
    transport_route VARCHAR(150) NULL,
    biometric_rfid_card VARCHAR(50) NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE, ALUMNI, TRANSFERRED, DROPPED_OUT',
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_students_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_students_house FOREIGN KEY (school_id, house_id)
        REFERENCES school_houses (school_id, id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT uq_students_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_students_adm UNIQUE (school_id, admission_no),
    INDEX idx_students_status (school_id, status, is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 24: guardians
-- Independent parent/guardian directory (Prevents duplicate profiles across siblings).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS guardians;
CREATE TABLE guardians (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone_primary VARCHAR(30) NOT NULL,
    phone_secondary VARCHAR(30) NULL,
    email VARCHAR(150) NULL,
    occupation VARCHAR(100) NULL,
    workplace_details VARCHAR(255) NULL,
    national_id_number VARCHAR(50) NULL,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_guardians_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_guardians_tenant UNIQUE (school_id, id),
    INDEX idx_guardians_phone (school_id, phone_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 25: student_guardians
-- Many-to-Many student-to-guardian mapping (Supports siblings and multi-guardians).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS student_guardians;
CREATE TABLE student_guardians (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    guardian_id VARCHAR(36) NOT NULL,
    relationship VARCHAR(50) NOT NULL COMMENT 'FATHER, MOTHER, LOCAL_GUARDIAN',
    is_primary_contact TINYINT(1) NOT NULL DEFAULT 0,
    is_fee_payer TINYINT(1) NOT NULL DEFAULT 0,
    is_emergency_contact TINYINT(1) NOT NULL DEFAULT 0,
    has_portal_access TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sg_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_sg_guardian FOREIGN KEY (school_id, guardian_id)
        REFERENCES guardians (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_student_guardian UNIQUE (school_id, student_id, guardian_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 26: student_enrollments
-- Session-wise class placement, section assignment, and roll number (Preserves history).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS student_enrollments;
CREATE TABLE student_enrollments (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    section_id VARCHAR(36) NOT NULL,
    roll_no INT NOT NULL,
    enrollment_status VARCHAR(30) NOT NULL DEFAULT 'ENROLLED' COMMENT 'ENROLLED, PROMOTED, RETAINED, TRANSFERRED',
    enrollment_date DATE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_se_session FOREIGN KEY (school_id, session_id)
        REFERENCES academic_sessions (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_se_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_se_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_se_section FOREIGN KEY (school_id, section_id)
        REFERENCES sections (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_enrollments_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_student_session UNIQUE (school_id, session_id, student_id),
    CONSTRAINT uq_section_roll UNIQUE (school_id, session_id, section_id, roll_no),
    INDEX idx_enrollment_placement (school_id, class_id, section_id, enrollment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 27: student_alumni
-- Graduated students archive post-SEE or Class 12 with character certificate records.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS student_alumni;
CREATE TABLE student_alumni (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    graduation_session_id VARCHAR(36) NOT NULL,
    graduated_class VARCHAR(50) NOT NULL COMMENT 'Class 10 (SEE) or Class 12',
    final_gpa DECIMAL(3,2) NOT NULL,
    character_certificate_no VARCHAR(50) NULL,
    leaving_date DATE NOT NULL,
    higher_study_institute VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_alumni_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_alumni_session FOREIGN KEY (school_id, graduation_session_id)
        REFERENCES academic_sessions (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_alumni_student UNIQUE (school_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP E: ATTENDANCE & HARDWARE BIOMETRICS (4 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 28: biometric_devices
-- Physical hardware turnstiles, fingerprint, and face scanner terminals.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS biometric_devices;
CREATE TABLE biometric_devices (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    device_name VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45) NULL,
    location VARCHAR(100) NOT NULL COMMENT 'Main Gate Turnstile, Senior Wing, Staff Room',
    device_brand VARCHAR(50) NOT NULL DEFAULT 'ZKTeco',
    last_heartbeat_at DATETIME NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bd_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_bio_dev_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_device_serial UNIQUE (school_id, serial_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 29: biometric_raw_punches
-- High-throughput immutable queue storing raw punch events from biometric turnstiles.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS biometric_raw_punches;
CREATE TABLE biometric_raw_punches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    device_id VARCHAR(36) NOT NULL,
    biometric_user_id VARCHAR(50) NOT NULL,
    punch_time DATETIME NOT NULL,
    punch_state VARCHAR(20) NOT NULL DEFAULT 'CHECK_IN' COMMENT 'CHECK_IN, CHECK_OUT',
    processing_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING, PROCESSED, IGNORED_DUPLICATE',
    processed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_brp_device FOREIGN KEY (school_id, device_id)
        REFERENCES biometric_devices (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_punch_proc (school_id, processing_status, punch_time),
    INDEX idx_punch_user_time (school_id, biometric_user_id, punch_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 30: student_attendance
-- Synthesized daily roll-call records (Present, Absent, Late, Leave).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS student_attendance;
CREATE TABLE student_attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    enrollment_id VARCHAR(36) NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL COMMENT 'PRESENT, ABSENT, LATE, LEAVE, HOLIDAY',
    check_in_time TIME NULL,
    check_out_time TIME NULL,
    is_manually_adjusted TINYINT(1) NOT NULL DEFAULT 0,
    adjusted_by_user_id VARCHAR(36) NULL,
    adjustment_reason VARCHAR(255) NULL,
    sms_sent TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_sa_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_sa_enrollment FOREIGN KEY (school_id, enrollment_id)
        REFERENCES student_enrollments (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_student_att_date UNIQUE (school_id, student_id, attendance_date),
    INDEX idx_att_date_status (school_id, attendance_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 31: staff_attendance
-- Daily attendance and clock-in/out records for faculty and staff.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS staff_attendance;
CREATE TABLE staff_attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL COMMENT 'PRESENT, ABSENT, LATE, ON_LEAVE, HALF_DAY',
    clock_in_time TIME NULL,
    clock_out_time TIME NULL,
    is_late TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_staff_att_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_staff_att_date UNIQUE (school_id, user_id, attendance_date),
    INDEX idx_staff_att_lookup (school_id, attendance_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP F: FEES, PAYMENTS & IDEMPOTENCY (7 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 32: fee_heads
-- Master billing fee components (Monthly Tuition, Science Lab, Exam, Bus, etc.).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS fee_heads;
CREATE TABLE fee_heads (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    head_code VARCHAR(50) NOT NULL,
    head_name VARCHAR(150) NOT NULL,
    description VARCHAR(255) NULL,
    is_refundable TINYINT(1) NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fh_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_fee_heads_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_fee_head_code UNIQUE (school_id, head_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 33: fee_structures
-- Class-wise, session-wise fee configurations and billing frequencies in NPR.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS fee_structures;
CREATE TABLE fee_structures (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    fee_head_id VARCHAR(36) NOT NULL,
    amount_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    billing_frequency VARCHAR(30) NOT NULL DEFAULT 'QUARTERLY' COMMENT 'MONTHLY, QUARTERLY, ONE_TIME, ANNUAL',
    due_day_of_month INT NOT NULL DEFAULT 15,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_fs_session FOREIGN KEY (school_id, session_id)
        REFERENCES academic_sessions (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_fs_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_fs_head FOREIGN KEY (school_id, fee_head_id)
        REFERENCES fee_heads (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_fee_struct UNIQUE (school_id, session_id, class_id, fee_head_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 34: fee_concessions
-- Scholarship and waiver policies (10% Municipal Quota, Siblings, Merit).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS fee_concessions;
CREATE TABLE fee_concessions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    concession_name VARCHAR(150) NOT NULL,
    discount_type VARCHAR(20) NOT NULL DEFAULT 'PERCENTAGE' COMMENT 'PERCENTAGE, FLAT_NPR',
    discount_value DECIMAL(10,2) NOT NULL,
    description TEXT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fc_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_fee_conc_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_concession_name UNIQUE (school_id, concession_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 35: student_concessions
-- Assigns active concessions or scholarships to individual student enrollments.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS student_concessions;
CREATE TABLE student_concessions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    enrollment_id VARCHAR(36) NOT NULL,
    concession_id VARCHAR(36) NOT NULL,
    approved_by VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sconc_enrollment FOREIGN KEY (school_id, enrollment_id)
        REFERENCES student_enrollments (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_sconc_concession FOREIGN KEY (school_id, concession_id)
        REFERENCES fee_concessions (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_student_concession UNIQUE (school_id, enrollment_id, concession_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 36: fee_invoices
-- Student billing invoices with due dates, late penalties, and real balances.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS fee_invoices;
CREATE TABLE fee_invoices (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    invoice_number VARCHAR(50) NOT NULL COMMENT 'e.g. INV-2083-0891',
    student_id VARCHAR(36) NOT NULL,
    enrollment_id VARCHAR(36) NOT NULL,
    billing_period_title VARCHAR(100) NOT NULL COMMENT 'e.g. Quarter 2 (Shrawan - Ashwin 2083)',
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    concession_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    fine_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    net_payable_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    paid_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    balance_due DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL DEFAULT 'UNPAID' COMMENT 'UNPAID, PARTIAL, PAID, OVERDUE, VOIDED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_fi_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_fi_enrollment FOREIGN KEY (school_id, enrollment_id)
        REFERENCES student_enrollments (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_fee_inv_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_invoice_no UNIQUE (school_id, invoice_number),
    INDEX idx_invoice_status (school_id, status, due_date),
    INDEX idx_invoice_student (school_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 37: fee_invoice_items
-- Itemized line items for every fee invoice.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS fee_invoice_items;
CREATE TABLE fee_invoice_items (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    invoice_id VARCHAR(36) NOT NULL,
    fee_head_id VARCHAR(36) NOT NULL,
    head_title VARCHAR(150) NOT NULL,
    amount_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fii_invoice FOREIGN KEY (school_id, invoice_id)
        REFERENCES fee_invoices (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fii_head FOREIGN KEY (school_id, fee_head_id)
        REFERENCES fee_heads (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_fii_invoice (school_id, invoice_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 38: fee_payments
-- Immutable official receipt vouchers (Cashier POS, eSewa, Khalti, ConnectIPS).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS fee_payments;
CREATE TABLE fee_payments (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    invoice_id VARCHAR(36) NOT NULL,
    receipt_number VARCHAR(50) NOT NULL COMMENT 'e.g. REC-2083-4412',
    amount_paid_npr DECIMAL(12,2) NOT NULL,
    payment_date DATETIME NOT NULL,
    payment_mode VARCHAR(50) NOT NULL COMMENT 'CASH, ESEWA, KHALTI, CONNECT_IPS, BANK_TRANSFER',
    gateway_transaction_id VARCHAR(100) NULL,
    cashier_user_id VARCHAR(36) NULL,
    receipt_status VARCHAR(30) NOT NULL DEFAULT 'ISSUED' COMMENT 'ISSUED, VOIDED, REVERSED',
    voided_at DATETIME NULL,
    voided_by_user_id VARCHAR(36) NULL,
    void_reason VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fp_invoice FOREIGN KEY (school_id, invoice_id)
        REFERENCES fee_invoices (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_fp_cashier FOREIGN KEY (school_id, cashier_user_id)
        REFERENCES users (school_id, id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT uq_receipt_no UNIQUE (school_id, receipt_number),
    INDEX idx_fp_payment_date (school_id, payment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP G: DOUBLE-ENTRY ACCOUNTING & PAYROLL (6 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 39: payment_gateway_logs
-- Webhook audit trail, idempotency key enforcement, raw JSON responses.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS payment_gateway_logs;
CREATE TABLE payment_gateway_logs (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    idempotency_key VARCHAR(100) NOT NULL,
    gateway_name VARCHAR(50) NOT NULL COMMENT 'ESEWA, KHALTI, CONNECT_IPS',
    gateway_transaction_id VARCHAR(100) NULL,
    amount_npr DECIMAL(12,2) NOT NULL,
    raw_payload_json JSON NULL,
    verification_response_json JSON NULL,
    processing_status VARCHAR(30) NOT NULL DEFAULT 'SUCCESS' COMMENT 'SUCCESS, FAILED, DUPLICATE_BLOCKED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pgl_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_pgl_idempotency UNIQUE (school_id, idempotency_key),
    INDEX idx_pgl_gateway_txn (gateway_name, gateway_transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 40: chart_of_accounts
-- Official General Ledger account hierarchy (Assets, Liabilities, Equity, Revenue, Expense).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS chart_of_accounts;
CREATE TABLE chart_of_accounts (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    account_code VARCHAR(50) NOT NULL COMMENT 'e.g. 1010-CASH, 1020-NABIL-BANK, 4010-TUITION-REV',
    account_name VARCHAR(150) NOT NULL,
    account_type VARCHAR(30) NOT NULL COMMENT 'ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE',
    normal_balance VARCHAR(10) NOT NULL DEFAULT 'DEBIT' COMMENT 'DEBIT, CREDIT',
    parent_account_id VARCHAR(36) NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_coa_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_coa_parent FOREIGN KEY (school_id, parent_account_id)
        REFERENCES chart_of_accounts (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_coa_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_account_code UNIQUE (school_id, account_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 41: journal_entries
-- Balanced double-entry financial headers posted to General Ledger.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS journal_entries;
CREATE TABLE journal_entries (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    fiscal_year_id VARCHAR(36) NOT NULL,
    entry_number VARCHAR(50) NOT NULL COMMENT 'e.g. JV-2083-0001',
    entry_date DATE NOT NULL,
    source_module VARCHAR(50) NOT NULL COMMENT 'FEES, PAYROLL, EXPENSES, MANUAL',
    source_reference_id VARCHAR(100) NULL,
    narration TEXT NOT NULL,
    is_posted TINYINT(1) NOT NULL DEFAULT 0,
    posted_by_user_id VARCHAR(36) NULL,
    posted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_je_fiscal FOREIGN KEY (school_id, fiscal_year_id)
        REFERENCES fiscal_years (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_je_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_entry_number UNIQUE (school_id, entry_number),
    INDEX idx_je_date (school_id, entry_date, is_posted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 42: journal_entry_items
-- Debits and Credits line items balancing to 0.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS journal_entry_items;
CREATE TABLE journal_entry_items (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    journal_entry_id VARCHAR(36) NOT NULL,
    account_id VARCHAR(36) NOT NULL,
    debit_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    credit_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    memo VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_jei_entry FOREIGN KEY (school_id, journal_entry_id)
        REFERENCES journal_entries (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_jei_account FOREIGN KEY (school_id, account_id)
        REFERENCES chart_of_accounts (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_jei_entry (school_id, journal_entry_id),
    INDEX idx_jei_account (school_id, account_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 43: salary_structures
-- Employee payroll blueprints with PF, Citizen Investment Trust (CIT), and taxes.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS salary_structures;
CREATE TABLE salary_structures (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    basic_salary_npr DECIMAL(12,2) NOT NULL,
    dearness_allowance_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    house_rent_allowance_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    provident_fund_pct DECIMAL(5,2) NOT NULL DEFAULT 10.00,
    cit_amount_npr DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    tax_tds_pct DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sal_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_salary_user UNIQUE (school_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 44: payroll_records
-- Monthly salary disbursement slips in NPR.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS payroll_records;
CREATE TABLE payroll_records (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    fiscal_year_id VARCHAR(36) NOT NULL,
    month_bs VARCHAR(30) NOT NULL COMMENT 'Bhadra 2083',
    year_bs VARCHAR(10) NOT NULL COMMENT '2083',
    gross_salary_npr DECIMAL(12,2) NOT NULL,
    total_deductions_npr DECIMAL(12,2) NOT NULL,
    net_salary_npr DECIMAL(12,2) NOT NULL,
    payment_status VARCHAR(30) NOT NULL DEFAULT 'PAID' COMMENT 'PENDING, PAID, CANCELLED',
    payment_date DATE NOT NULL,
    payment_mode VARCHAR(50) NOT NULL DEFAULT 'NABIL_BANK_TRANSFER',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pr_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_pr_fiscal FOREIGN KEY (school_id, fiscal_year_id)
        REFERENCES fiscal_years (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_payroll_period UNIQUE (school_id, user_id, month_bs, year_bs)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP H: EXAMINATION & CDC GRADING ENGINE (7 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 45: grading_scales
-- CDC 8-point grading scale definitions.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS grading_scales;
CREATE TABLE grading_scales (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    scale_name VARCHAR(100) NOT NULL COMMENT 'e.g. CDC Nepal 8-Point Letter Grading',
    is_default TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_gs_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_gs_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_scale_name UNIQUE (school_id, scale_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 46: grading_scale_tiers
-- Grade bounds (A+ 90-100%, GP 4.0; ... NG < 35%, GP 0.0).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS grading_scale_tiers;
CREATE TABLE grading_scale_tiers (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    scale_id VARCHAR(36) NOT NULL,
    grade_letter VARCHAR(10) NOT NULL COMMENT 'A+, A, B+, B, C+, C, D, NG',
    grade_point DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    min_percentage DECIMAL(5,2) NOT NULL,
    max_percentage DECIMAL(5,2) NOT NULL,
    description VARCHAR(100) NOT NULL COMMENT 'Outstanding, Excellent, Non-Graded',
    is_pass TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_gst_scale FOREIGN KEY (school_id, scale_id)
        REFERENCES grading_scales (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_tier_bounds UNIQUE (school_id, scale_id, min_percentage)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 47: exams
-- Terminal examination instances (First Term, SEE Pre-Board).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS exams;
CREATE TABLE exams (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    term_id VARCHAR(36) NOT NULL,
    exam_name VARCHAR(150) NOT NULL COMMENT 'e.g. SEE Pre-Board Examination 2083',
    exam_type VARCHAR(50) NOT NULL DEFAULT 'TERMINAL' COMMENT 'TERMINAL, PRE_BOARD, UNIT_TEST',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED' COMMENT 'DRAFT, SCHEDULED, ONGOING, COMPLETED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_exams_session FOREIGN KEY (school_id, session_id)
        REFERENCES academic_sessions (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_exams_term FOREIGN KEY (school_id, term_id)
        REFERENCES academic_terms (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_exams_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_exam_name UNIQUE (school_id, session_id, exam_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 48: exam_schedules
-- Detailed exam timetables mapping date in BS, time, and room allocation.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS exam_schedules;
CREATE TABLE exam_schedules (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    exam_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    exam_date_bs VARCHAR(20) NOT NULL COMMENT 'e.g. 14 Magh 2083',
    exam_date_ad DATE NOT NULL,
    day_name VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    hall_room_number VARCHAR(100) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_es_exam FOREIGN KEY (school_id, exam_id)
        REFERENCES exams (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_es_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_es_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_exam_schedule UNIQUE (school_id, exam_id, class_id, subject_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 49: exam_admit_cards
-- Admit card issuance verified against >=75% attendance and fee clearance.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS exam_admit_cards;
CREATE TABLE exam_admit_cards (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    exam_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    admit_card_barcode VARCHAR(100) NOT NULL,
    seat_desk_number VARCHAR(50) NULL,
    is_attendance_cleared TINYINT(1) NOT NULL DEFAULT 1,
    is_fee_cleared TINYINT(1) NOT NULL DEFAULT 1,
    issue_timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_eac_exam FOREIGN KEY (school_id, exam_id)
        REFERENCES exams (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_eac_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_admit_card UNIQUE (school_id, exam_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 50: exam_marks
-- 75 Theory + 25 Practical CDC marks entry, pass verification, and letter grades.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS exam_marks;
CREATE TABLE exam_marks (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    exam_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    theory_marks_obtained DECIMAL(5,2) NULL,
    practical_marks_obtained DECIMAL(5,2) NULL,
    total_marks_obtained DECIMAL(5,2) GENERATED ALWAYS AS (COALESCE(theory_marks_obtained, 0) + COALESCE(practical_marks_obtained, 0)) STORED,
    grade_letter VARCHAR(10) NOT NULL COMMENT 'A+, A, B+, B, C+, C, D, NG',
    grade_point DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    is_theory_passed TINYINT(1) NOT NULL DEFAULT 1 COMMENT '0 if theory < 27 out of 75',
    is_practical_passed TINYINT(1) NOT NULL DEFAULT 1 COMMENT '0 if practical < 10 out of 25',
    is_passed TINYINT(1) NOT NULL DEFAULT 1 COMMENT '0 if NG',
    is_absent TINYINT(1) NOT NULL DEFAULT 0,
    evaluated_by_teacher_id VARCHAR(36) NULL,
    evaluator_remarks VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_em_exam FOREIGN KEY (school_id, exam_id)
        REFERENCES exams (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_em_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_em_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_em_teacher FOREIGN KEY (school_id, evaluated_by_teacher_id)
        REFERENCES teachers (school_id, id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT uq_student_exam_sub UNIQUE (school_id, exam_id, student_id, subject_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 51: terminal_results
-- Aggregated terminal report cards: GPA (3.92), Rank #1, Distinction, Principal remarks.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS terminal_results;
CREATE TABLE terminal_results (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    exam_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    total_marks_obtained DECIMAL(6,2) NOT NULL,
    max_marks_possible DECIMAL(6,2) NOT NULL,
    gpa DECIMAL(3,2) NOT NULL COMMENT 'Weighted credit-hour GPA',
    division VARCHAR(50) NOT NULL COMMENT 'Distinction (A+), First Division',
    rank_in_class INT NULL,
    attendance_term_pct DECIMAL(5,2) NOT NULL,
    principal_remarks TEXT NULL,
    issue_date_bs VARCHAR(30) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_tr_exam FOREIGN KEY (school_id, exam_id)
        REFERENCES exams (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_tr_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_terminal_result UNIQUE (school_id, exam_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP I: TIMETABLES, LMS & STUDY MATERIALS (7 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 52: timetable_periods
-- Sunday through Friday bell times (Periods 1 to 7, Morning Assembly, Lunch break).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS timetable_periods;
CREATE TABLE timetable_periods (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    period_name VARCHAR(100) NOT NULL COMMENT 'Period 1, National Assembly, Lunch Break',
    period_order INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_break TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tp_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_tp_tenant UNIQUE (school_id, id),
    CONSTRAINT uq_period_order UNIQUE (school_id, period_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 53: timetables
-- Master weekly schedule matrix mapping sections, teachers, subjects, and rooms.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS timetables;
CREATE TABLE timetables (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    section_id VARCHAR(36) NOT NULL,
    day_of_week VARCHAR(20) NOT NULL COMMENT 'Sunday, Monday, Tuesday, Wednesday, Thursday, Friday',
    period_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    classroom_room_number VARCHAR(50) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tt_section FOREIGN KEY (school_id, section_id)
        REFERENCES sections (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_tt_period FOREIGN KEY (school_id, period_id)
        REFERENCES timetable_periods (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_tt_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_tt_teacher FOREIGN KEY (school_id, teacher_id)
        REFERENCES teachers (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_tt_cell UNIQUE (school_id, section_id, day_of_week, period_id),
    CONSTRAINT uq_teacher_slot UNIQUE (school_id, teacher_id, day_of_week, period_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 54: homework
-- Daily subject homework assigned by faculty with deadlines in Bikram Sambat.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS homework;
CREATE TABLE homework (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    section_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    assigned_date_bs VARCHAR(20) NOT NULL,
    due_date_bs VARCHAR(20) NOT NULL,
    due_date_ad DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE, EVALUATED, ARCHIVED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hw_section FOREIGN KEY (school_id, section_id)
        REFERENCES sections (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_hw_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_hw_teacher FOREIGN KEY (school_id, teacher_id)
        REFERENCES teachers (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_hw_tenant UNIQUE (school_id, id),
    INDEX idx_hw_due (school_id, section_id, due_date_ad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 55: homework_submissions
-- Student completion checklist tracking and teacher assessment remarks.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS homework_submissions;
CREATE TABLE homework_submissions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    homework_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    is_completed TINYINT(1) NOT NULL DEFAULT 0,
    completion_timestamp DATETIME NULL,
    student_notes TEXT NULL,
    teacher_feedback VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hws_homework FOREIGN KEY (school_id, homework_id)
        REFERENCES homework (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_hws_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_hw_sub UNIQUE (school_id, homework_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 56: assignments
-- Practical term coursework (e.g. Bagmati River Study, Python SQLite System).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS assignments;
CREATE TABLE assignments (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    max_marks DECIMAL(5,2) NOT NULL DEFAULT 25.00,
    due_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE, CLOSED, GRADED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_asgn_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_asgn_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_assign_tenant UNIQUE (school_id, id),
    INDEX idx_asgn_due (school_id, class_id, due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 57: assignment_submissions
-- Student coursework file uploads, rubric scoring (Methodology, Report, Viva).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS assignment_submissions;
CREATE TABLE assignment_submissions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    assignment_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    submission_file_id VARCHAR(36) NULL,
    marks_obtained DECIMAL(5,2) NULL,
    teacher_feedback TEXT NULL,
    evaluation_status VARCHAR(30) NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING, EVALUATED, RESUBMIT',
    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_asub_assignment FOREIGN KEY (school_id, assignment_id)
        REFERENCES assignments (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_asub_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_assign_sub UNIQUE (school_id, assignment_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 58: study_materials
-- CDC textbook repository, formula cheat-sheets, past board question banks.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS study_materials;
CREATE TABLE study_materials (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    file_id VARCHAR(36) NULL,
    uploader_teacher_id VARCHAR(36) NOT NULL,
    download_count INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sm_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_sm_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_sm_teacher FOREIGN KEY (school_id, uploader_teacher_id)
        REFERENCES teachers (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_sm_lookup (school_id, class_id, subject_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- GROUP J: COMMUNICATIONS, FILES, AI & AUDIT (7 TABLES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 59: file_storage_registry
-- Unified file metadata repository (S3/Local, SHA-256, MIME, size).
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS file_storage_registry;
CREATE TABLE file_storage_registry (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    storage_driver VARCHAR(30) NOT NULL DEFAULT 'LOCAL' COMMENT 'LOCAL, S3, CLOUDFLARE_R2',
    storage_path VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    sha256_checksum VARCHAR(64) NULL,
    uploaded_by_user_id VARCHAR(36) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fsr_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_fsr_tenant UNIQUE (school_id, id),
    INDEX idx_fsr_hash (sha256_checksum)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 60: notices
-- Official school circulars, holiday notices, and examination bulletins.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS notices;
CREATE TABLE notices (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'ACADEMIC' COMMENT 'ACADEMIC, EVENT, FINANCE, HOLIDAY',
    audience VARCHAR(50) NOT NULL DEFAULT 'ALL' COMMENT 'ALL, STUDENTS, TEACHERS, PARENTS',
    published_date_bs VARCHAR(30) NOT NULL,
    published_date_ad DATE NOT NULL,
    author_role VARCHAR(100) NOT NULL DEFAULT 'Administration',
    content TEXT NOT NULL,
    is_urgent TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notices_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_notice_lookup (school_id, published_date_ad, audience)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 61: notifications
-- In-app user notifications with read status and deep-link routing.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(255) NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    read_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (school_id, user_id)
        REFERENCES users (school_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_notif_user (school_id, user_id, is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 62: sparrow_sms_logs
-- Sparrow SMS Nepal gateway dispatch logs, delivery statuses, credit accounting.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS sparrow_sms_logs;
CREATE TABLE sparrow_sms_logs (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    recipient_phone VARCHAR(30) NOT NULL,
    message_type VARCHAR(50) NOT NULL COMMENT 'ATTENDANCE_ABSENT, FEE_CLEARANCE, CIRCULAR',
    sms_text TEXT NOT NULL,
    sparrow_response_code VARCHAR(50) NULL,
    credits_consumed DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    status VARCHAR(30) NOT NULL DEFAULT 'DELIVERED' COMMENT 'QUEUED, DELIVERED, FAILED',
    sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sms_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_sms_date (school_id, sent_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 63: certificates
-- Issued Character Certificates, Bonafide Letters, and Sports Awards.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS certificates;
CREATE TABLE certificates (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    certificate_type VARCHAR(100) NOT NULL COMMENT 'CHARACTER_CERTIFICATE, BONAFIDE_STUDENT, ACADEMIC_EXCELLENCE',
    certificate_number VARCHAR(50) NOT NULL COMMENT 'e.g. CERT-2083-0911',
    issue_date_bs VARCHAR(30) NOT NULL,
    issue_date_ad DATE NOT NULL,
    body_text TEXT NOT NULL,
    issued_by_user_id VARCHAR(36) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cert_student FOREIGN KEY (school_id, student_id)
        REFERENCES students (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_cert_issuer FOREIGN KEY (school_id, issued_by_user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT uq_cert_no UNIQUE (school_id, certificate_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 64: ai_question_papers
-- CDC Specification Grid AI-generated question papers and marking rubrics.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS ai_question_papers;
CREATE TABLE ai_question_papers (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    paper_title VARCHAR(255) NOT NULL,
    specification_grid_json JSON NOT NULL,
    full_marks DECIMAL(5,2) NOT NULL DEFAULT 75.00,
    pass_marks DECIMAL(5,2) NOT NULL DEFAULT 27.00,
    question_paper_text LONGTEXT NOT NULL,
    marking_scheme_text LONGTEXT NULL,
    created_by_user_id VARCHAR(36) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_aiqp_class FOREIGN KEY (school_id, class_id)
        REFERENCES classes (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_aiqp_subject FOREIGN KEY (school_id, subject_id)
        REFERENCES cdc_subjects (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_aiqp_user FOREIGN KEY (school_id, created_by_user_id)
        REFERENCES users (school_id, id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- TABLE 65: school_audit_logs
-- Immutable mutation audit log for school grades, attendance, and financial ledgers.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS school_audit_logs;
CREATE TABLE school_audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    school_id VARCHAR(36) NOT NULL,
    actor_user_id VARCHAR(36) NULL,
    action VARCHAR(50) NOT NULL COMMENT 'UPDATE_MARKS, VOID_RECEIPT, ADJUST_ATTENDANCE',
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(36) NOT NULL,
    before_state_json JSON NULL,
    after_state_json JSON NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sal_school FOREIGN KEY (school_id)
        REFERENCES school_profiles (school_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_sal_actor FOREIGN KEY (school_id, actor_user_id)
        REFERENCES users (school_id, id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_sal_entity (school_id, entity_name, entity_id),
    INDEX idx_sal_time (school_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================================
-- DATABASE TRIGGERS FOR DATA INTEGRITY & IMMUTABILITY
-- ============================================================================

DELIMITER $$

-- Trigger 1: Verify double-entry balance before posting a journal entry
DROP TRIGGER IF EXISTS trg_verify_journal_balance_before_post$$
CREATE TRIGGER trg_verify_journal_balance_before_post
BEFORE UPDATE ON journal_entries
FOR EACH ROW
BEGIN
    DECLARE v_debit_total DECIMAL(12,2) DEFAULT 0.00;
    DECLARE v_credit_total DECIMAL(12,2) DEFAULT 0.00;
    DECLARE v_item_count INT DEFAULT 0;

    -- Trigger balance verification only when transitioning is_posted from 0 to 1
    IF NEW.is_posted = 1 AND OLD.is_posted = 0 THEN
        SELECT COUNT(*), COALESCE(SUM(debit_amount), 0.00), COALESCE(SUM(credit_amount), 0.00)
        INTO v_item_count, v_debit_total, v_credit_total
        FROM journal_entry_items
        WHERE school_id = NEW.school_id AND journal_entry_id = NEW.id;

        IF v_item_count < 2 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Journal entry must contain at least two line items before posting.';
        END IF;

        IF v_debit_total != v_credit_total OR v_debit_total <= 0.00 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Unbalanced journal entry: Total Debit must equal Total Credit and be greater than zero.';
        END IF;
    END IF;

    -- Block modification of already posted journal headers
    IF OLD.is_posted = 1 AND (NEW.is_posted = 0 OR NEW.entry_number != OLD.entry_number OR NEW.fiscal_year_id != OLD.fiscal_year_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot modify an already posted journal entry. Please issue a reversal entry.';
    END IF;
END$$

-- Trigger 2: Prevent modifying line items of posted journal entries
DROP TRIGGER IF EXISTS trg_prevent_posted_journal_item_update$$
CREATE TRIGGER trg_prevent_posted_journal_item_update
BEFORE UPDATE ON journal_entry_items
FOR EACH ROW
BEGIN
    DECLARE v_posted TINYINT DEFAULT 0;
    SELECT is_posted INTO v_posted FROM journal_entries WHERE school_id = OLD.school_id AND id = OLD.journal_entry_id;
    IF v_posted = 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot modify line items of an already posted journal entry.';
    END IF;
END$$

-- Trigger 3: Prevent deleting line items of posted journal entries
DROP TRIGGER IF EXISTS trg_prevent_posted_journal_item_delete$$
CREATE TRIGGER trg_prevent_posted_journal_item_delete
BEFORE DELETE ON journal_entry_items
FOR EACH ROW
BEGIN
    DECLARE v_posted TINYINT DEFAULT 0;
    SELECT is_posted INTO v_posted FROM journal_entries WHERE school_id = OLD.school_id AND id = OLD.journal_entry_id;
    IF v_posted = 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete line items of an already posted journal entry.';
    END IF;
END$$

-- Trigger 4: Prevent hard deletion of fee payment receipts (Immutability guarantee)
DROP TRIGGER IF EXISTS trg_prevent_fee_payment_delete$$
CREATE TRIGGER trg_prevent_fee_payment_delete
BEFORE DELETE ON fee_payments
FOR EACH ROW
BEGIN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Fee payment receipts are immutable and cannot be deleted. Use receipt voiding / reversal instead.';
END$$

DELIMITER ;

-- ============================================================================
-- SEED DATA: sanskaar_school_db (Kathmandu Valley Secondary School KVSS-27014)
-- ============================================================================

-- 1. School Profile
INSERT INTO school_profiles (school_id, school_code, legal_name, nepali_name, motto, affiliation_board, neb_code, education_ministry_reg_no, pan_vat_number, estd_year_bs, estd_year_ad, province, district, municipality, ward_no, address_line, phone_primary, phone_secondary, email_official, website_url, principal_name, vice_principal_name, primary_bank_name, primary_bank_account_no, esewa_merchant_code, khalti_public_key, connect_ips_member_id) VALUES
('SCH-KTM-01', 'KVSS-27014', 'Kathmandu Valley Secondary School', 'काठमाडौँ भ्याली माध्यमिक विद्यालय', 'Discipline, Excellence & Holistic Character', 'NEB', '27014', '14208-BA/068', '301298412', '2054 BS', '1997 AD', 'Bagmati Province', 'Kathmandu', 'Kathmandu Metropolitan City', '4', 'Ward No. 4, Maharajgunj, Kathmandu', '+977 1 4720911', '+977 1 4720200', 'principal@kvss.edu.np', 'https://kvss.edu.np', 'Prof. Dr. Ram Bahadur Thapa', 'Mrs. Ananya Bhattarai', 'Nabil Bank Ltd. - Maharajgunj', '0101017500124', 'ESW_KVSS_9812', 'test_public_key_77a9420b78', 'CIPS_KVSS_01');

-- 2. Academic Sessions
INSERT INTO academic_sessions (id, school_id, session_bs, gregorian_period, start_date, end_date, is_active) VALUES
('SESS-2083', 'SCH-KTM-01', '2083-84 B.S.', 'Apr 2026 - Mar 2027 A.D.', '2026-04-14', '2027-04-13', 1),
('SESS-2082', 'SCH-KTM-01', '2082-83 B.S.', 'Apr 2025 - Mar 2026 A.D.', '2025-04-14', '2026-04-13', 0);

-- 3. Academic Terms
INSERT INTO academic_terms (id, school_id, session_id, term_name, term_order, weightage_percentage, start_date, end_date, status) VALUES
('TERM-1', 'SCH-KTM-01', 'SESS-2083', 'First Term', 1, 20.00, '2026-04-15', '2026-07-15', 'COMPLETED'),
('TERM-2', 'SCH-KTM-01', 'SESS-2083', 'Mid-Term', 2, 25.00, '2026-07-16', '2026-10-15', 'ONGOING'),
('TERM-3', 'SCH-KTM-01', 'SESS-2083', 'Pre-Board', 3, 25.00, '2026-11-05', '2027-01-30', 'SCHEDULED'),
('TERM-4', 'SCH-KTM-01', 'SESS-2083', 'Annual SEE Board', 4, 30.00, '2027-02-15', '2027-04-10', 'SCHEDULED');

-- 4. Fiscal Years
INSERT INTO fiscal_years (id, school_id, fiscal_year_bs, start_date, end_date, is_closed) VALUES
('FY-2083', 'SCH-KTM-01', '2083/84', '2026-07-17', '2027-07-16', 0);

-- 5. Roles
INSERT INTO roles (id, school_id, role_code, role_name, description, is_system_default) VALUES
('ROLE-PRIN', 'SCH-KTM-01', 'PRINCIPAL', 'Principal / Head of School', 'Full administrative authority', 1),
('ROLE-TCH', 'SCH-KTM-01', 'TEACHER', 'Teaching Faculty', 'Classroom marks and attendance access', 1),
('ROLE-ACC', 'SCH-KTM-01', 'ACCOUNTANT', 'Bursar / Accountant', 'Fee POS counter and financial ledgers', 1),
('ROLE-STU', 'SCH-KTM-01', 'STUDENT', 'Student', 'Student and Parent portal access', 1),
('ROLE-PAR', 'SCH-KTM-01', 'PARENT', 'Guardian / Parent', 'Fee payment and student progress tracking', 1);

-- 6. Permissions
INSERT INTO permissions (id, permission_code, module_name, description) VALUES
('PERM-01', 'students.view', 'STUDENTS', 'View student roster and profiles'),
('PERM-02', 'students.create', 'STUDENTS', 'Create student admission record'),
('PERM-03', 'attendance.mark', 'ATTENDANCE', 'Mark and modify daily roll call'),
('PERM-04', 'fees.collect', 'FEES', 'Process fee POS receipts'),
('PERM-05', 'marks.enter', 'EXAMS', 'Enter CDC examination marks'),
('PERM-06', 'marks.publish', 'EXAMS', 'Publish terminal examination report cards');

-- 7. Role Permissions
INSERT INTO role_permissions (id, school_id, role_id, permission_id, can_view, can_create, can_edit, can_delete, can_export) VALUES
('RP-01', 'SCH-KTM-01', 'ROLE-PRIN', 'PERM-01', 1, 1, 1, 1, 1),
('RP-02', 'SCH-KTM-01', 'ROLE-PRIN', 'PERM-04', 1, 1, 1, 1, 1),
('RP-03', 'SCH-KTM-01', 'ROLE-ACC', 'PERM-04', 1, 1, 1, 0, 1),
('RP-04', 'SCH-KTM-01', 'ROLE-TCH', 'PERM-03', 1, 1, 1, 0, 1),
('RP-05', 'SCH-KTM-01', 'ROLE-TCH', 'PERM-05', 1, 1, 1, 0, 1);

-- 8. Users
-- Password Hash below represents standard Argon2id/Bcrypt demo placeholder hash for 'SanskaarKVSS2083#'
INSERT INTO users (id, school_id, username, email, phone_number, password_hash, user_type, status) VALUES
('USR-PRIN-01', 'SCH-KTM-01', 'dr.thapa', 'dr.thapa@kvss.edu.np', '+977 9851044219', '$2y$12$e8752f992100abcdef1234567890abcdef1234567890abcdef123', 'STAFF', 'ACTIVE'),
('USR-TCH-02', 'SCH-KTM-01', 'sunita.shrestha', 'sunita.shrestha@kvss.edu.np', '+977 9841222340', '$2y$12$e8752f992100abcdef1234567890abcdef1234567890abcdef123', 'TEACHER', 'ACTIVE'),
('USR-ACC-03', 'SCH-KTM-01', 'gopal.accountant', 'accounts@kvss.edu.np', '+977 9851099881', '$2y$12$e8752f992100abcdef1234567890abcdef1234567890abcdef123', 'STAFF', 'ACTIVE'),
('USR-STU-04', 'SCH-KTM-01', 'aarav.shrestha', 'aarav.1001@kvss.edu.np', '+977 9851034567', '$2y$12$e8752f992100abcdef1234567890abcdef1234567890abcdef123', 'STUDENT', 'ACTIVE'),
('USR-PAR-05', 'SCH-KTM-01', 'rajesh.parent', 'rajesh.shrestha@gmail.com', '+977 9851023456', '$2y$12$e8752f992100abcdef1234567890abcdef1234567890abcdef123', 'PARENT', 'ACTIVE');

-- 9. User Roles
INSERT INTO user_roles (id, school_id, user_id, role_id) VALUES
('UR-01', 'SCH-KTM-01', 'USR-PRIN-01', 'ROLE-PRIN'),
('UR-02', 'SCH-KTM-01', 'USR-TCH-02', 'ROLE-TCH'),
('UR-03', 'SCH-KTM-01', 'USR-ACC-03', 'ROLE-ACC'),
('UR-04', 'SCH-KTM-01', 'USR-STU-04', 'ROLE-STU'),
('UR-05', 'SCH-KTM-01', 'USR-PAR-05', 'ROLE-PAR');

-- 10. Classes
INSERT INTO classes (id, school_id, class_name, numeric_order, wing) VALUES
('CLS-10', 'SCH-KTM-01', 'Class 10 (SEE)', 10, 'SENIOR'),
('CLS-09', 'SCH-KTM-01', 'Class 9', 9, 'SENIOR'),
('CLS-08', 'SCH-KTM-01', 'Class 8 (BLE)', 8, 'MIDDLE');

-- 11. Sections
INSERT INTO sections (id, school_id, class_id, section_name, room_number, capacity) VALUES
('SEC-10A', 'SCH-KTM-01', 'CLS-10', 'A', 'Room 304, Senior Wing', 45),
('SEC-10B', 'SCH-KTM-01', 'CLS-10', 'B', 'Room 305, Senior Wing', 45);

-- 12. Houses
INSERT INTO school_houses (id, school_id, house_name, house_color) VALUES
('HSE-SAG', 'SCH-KTM-01', 'Sagarmatha', 'Blue'),
('HSE-ANN', 'SCH-KTM-01', 'Annapurna', 'Red'),
('HSE-MAC', 'SCH-KTM-01', 'Machhapuchhre', 'Yellow'),
('HSE-LHO', 'SCH-KTM-01', 'Lhotse', 'Green');

-- 13. CDC Subjects (Class 10 SEE Curriculum)
INSERT INTO cdc_subjects (id, school_id, class_id, subject_code, subject_name, nepali_name, credit_hours, theory_full_marks, practical_full_marks, theory_pass_marks, practical_pass_marks, is_optional) VALUES
('SUB-101', 'SCH-KTM-01', 'CLS-10', 'NEP-101', 'Compulsory Nepali', 'अनिवार्य नेपाली', 4.0, 75.00, 25.00, 27.00, 10.00, 0),
('SUB-102', 'SCH-KTM-01', 'CLS-10', 'ENG-102', 'Compulsory English', 'अंग्रेजी', 4.0, 75.00, 25.00, 27.00, 10.00, 0),
('SUB-103', 'SCH-KTM-01', 'CLS-10', 'MTH-103', 'Compulsory Mathematics', 'गणित', 5.0, 75.00, 25.00, 27.00, 10.00, 0),
('SUB-104', 'SCH-KTM-01', 'CLS-10', 'SCI-104', 'Science and Technology', 'विज्ञान तथा प्रविधि', 5.0, 75.00, 25.00, 27.00, 10.00, 0),
('SUB-105', 'SCH-KTM-01', 'CLS-10', 'SOC-105', 'Social Studies & Human Values', 'सामाजिक अध्ययन', 4.0, 75.00, 25.00, 27.00, 10.00, 0),
('SUB-106', 'SCH-KTM-01', 'CLS-10', 'OPM-106', 'Optional I: Additional Mathematics', 'ऐच्छिक गणित', 4.0, 75.00, 25.00, 27.00, 10.00, 1),
('SUB-107', 'SCH-KTM-01', 'CLS-10', 'CSC-107', 'Optional II: Computer Science & AI', 'कम्प्युटर विज्ञान', 4.0, 50.00, 50.00, 18.00, 20.00, 1);

-- 14. Teachers
INSERT INTO teachers (id, school_id, user_id, teacher_code, full_name, designation, department, qualification, experience_years, phone_number, email, joining_date_bs, basic_salary_npr) VALUES
('TCH-001', 'SCH-KTM-01', 'USR-PRIN-01', 'TCH-001', 'Prof. Dr. Ram Bahadur Thapa', 'Principal & PGT Physics', 'Science', 'M.Sc. Physics (TU), Ph.D., B.Ed.', '24 Years', '+977 9851044219', 'principal@kvss.edu.np', '2062-04-01 BS', 115000.00),
('TCH-002', 'SCH-KTM-01', 'USR-TCH-02', 'TCH-002', 'Mrs. Sunita Shrestha', 'HOD Mathematics & SEE Coordinator', 'Mathematics', 'M.Sc. Pure Mathematics (TU), B.Ed.', '16 Years', '+977 9841222340', 'sunita.shrestha@kvss.edu.np', '2066-06-15 BS', 82000.00);

-- 15. Staff
INSERT INTO staff (id, school_id, user_id, staff_code, full_name, designation, department, phone_number, basic_salary_npr) VALUES
('STF-001', 'SCH-KTM-01', 'USR-ACC-03', 'STF-001', 'Gopal Krishna Shrestha', 'Chief Accountant', 'Accounts & Audit', '+977 9851099881', 65000.00);

-- 16. Students
INSERT INTO students (id, school_id, user_id, admission_no, neb_symbol_no, first_name, last_name, nepali_name, gender, dob_bs, dob_ad, blood_group, house_id, admission_year_bs, address_line, transport_route, status) VALUES
('STU-1001', 'SCH-KTM-01', 'USR-STU-04', 'ADM-2078-1001', '02701429A', 'Aarav', 'Shrestha', 'आरव श्रेष्ठ', 'MALE', '2067-01-12 B.S.', '2010-04-25', 'B+', 'HSE-SAG', '2078 BS', 'House 42, Shanti Marga, Maharajgunj-4, Kathmandu', 'Self / Walk', 'ACTIVE');

-- 17. Guardians
INSERT INTO guardians (id, school_id, user_id, full_name, phone_primary, phone_secondary, email, occupation, workplace_details) VALUES
('GRD-201', 'SCH-KTM-01', 'USR-PAR-05', 'Mr. Rajesh Shrestha', '+977 9851023456', '+977 1 4720999', 'rajesh.shrestha@gmail.com', 'Civil Engineer', 'Department of Roads (DoR), Babarmahal');

-- 18. Student Guardians
INSERT INTO student_guardians (id, school_id, student_id, guardian_id, relationship, is_primary_contact, is_fee_payer, is_emergency_contact, has_portal_access) VALUES
('SG-01', 'SCH-KTM-01', 'STU-1001', 'GRD-201', 'FATHER', 1, 1, 1, 1);

-- 19. Student Enrollments (Session 2083-84 B.S.)
INSERT INTO student_enrollments (id, school_id, session_id, student_id, class_id, section_id, roll_no, enrollment_status, enrollment_date) VALUES
('ENR-2083-001', 'SCH-KTM-01', 'SESS-2083', 'STU-1001', 'CLS-10', 'SEC-10A', 1, 'ENROLLED', '2026-04-15');

-- 20. Fee Heads
INSERT INTO fee_heads (id, school_id, head_code, head_name, description) VALUES
('FH-TUI', 'SCH-KTM-01', 'TUI', 'Monthly Tuition Fee', 'Regular academic teaching tuition'),
('FH-LAB', 'SCH-KTM-01', 'LAB', 'Senior Science & Computer Lab Fee', 'Practical laboratory consumable apparatus'),
('FH-EXM', 'SCH-KTM-01', 'EXM', 'Terminal Examination & SEE Mock Fee', 'Printing question blueprints and marks tabulation'),
('FH-ECA', 'SCH-KTM-01', 'ECA', 'ECA, Sports & Library Fee', 'Extracurricular clubs and library resources');

-- 21. Fee Structures (Class 10)
INSERT INTO fee_structures (id, school_id, session_id, class_id, fee_head_id, amount_npr, billing_frequency) VALUES
('FS-10-TUI', 'SCH-KTM-01', 'SESS-2083', 'CLS-10', 'FH-TUI', 15000.00, 'QUARTERLY'),
('FS-10-LAB', 'SCH-KTM-01', 'SESS-2083', 'CLS-10', 'FH-LAB', 4000.00, 'QUARTERLY'),
('FS-10-EXM', 'SCH-KTM-01', 'SESS-2083', 'CLS-10', 'FH-EXM', 2000.00, 'QUARTERLY'),
('FS-10-ECA', 'SCH-KTM-01', 'SESS-2083', 'CLS-10', 'FH-ECA', 1000.00, 'QUARTERLY');

-- 22. Fee Invoices (Aarav Shrestha Q3 Invoice)
INSERT INTO fee_invoices (id, school_id, invoice_number, student_id, enrollment_id, billing_period_title, issue_date, due_date, subtotal_amount, concession_amount, fine_amount, net_payable_amount, paid_amount, balance_due, status) VALUES
('INV-2083-4414', 'SCH-KTM-01', 'INV-2083-Q3-1001', 'STU-1001', 'ENR-2083-001', 'Quarter 3 (Shrawan - Ashwin 2083)', '2026-07-20', '2026-08-15', 22000.00, 0.00, 0.00, 22000.00, 22000.00, 0.00, 'PAID');

-- 23. Fee Invoice Items
INSERT INTO fee_invoice_items (id, school_id, invoice_id, fee_head_id, head_title, amount_npr) VALUES
('FII-01', 'SCH-KTM-01', 'INV-2083-4414', 'FH-TUI', 'Monthly Tuition Fee (3 Months)', 15000.00),
('FII-02', 'SCH-KTM-01', 'INV-2083-4414', 'FH-LAB', 'Senior Science & Computer Lab Fee', 4000.00),
('FII-03', 'SCH-KTM-01', 'INV-2083-4414', 'FH-EXM', 'Pre-Board Examination Fee', 2000.00),
('FII-04', 'SCH-KTM-01', 'INV-2083-4414', 'FH-ECA', 'Sports & Library Resource Fee', 1000.00);

-- 24. Fee Payments (ConnectIPS Realization)
INSERT INTO fee_payments (id, school_id, invoice_id, receipt_number, amount_paid_npr, payment_date, payment_mode, gateway_transaction_id, cashier_user_id, receipt_status) VALUES
('PAY-2083-4414', 'SCH-KTM-01', 'INV-2083-4414', 'REC-2083-4414', 22000.00, '2026-08-10 11:20:00', 'CONNECT_IPS', 'CIPS/NABIL/8821901', 'USR-ACC-03', 'ISSUED');

-- 25. Chart of Accounts
INSERT INTO chart_of_accounts (id, school_id, account_code, account_name, account_type, normal_balance) VALUES
('COA-1010', 'SCH-KTM-01', '1010', 'Cash in Hand (POS Counter)', 'ASSET', 'DEBIT'),
('COA-1020', 'SCH-KTM-01', '1020', 'Nabil Bank Current Account (NPR)', 'ASSET', 'DEBIT'),
('COA-1030', 'SCH-KTM-01', '1030', 'eSewa / Digital Gateway Clearing', 'ASSET', 'DEBIT'),
('COA-1200', 'SCH-KTM-01', '1200', 'Student Accounts Receivable (Fee Arrears)', 'ASSET', 'DEBIT'),
('COA-4010', 'SCH-KTM-01', '4010', 'Tuition Fee Income', 'REVENUE', 'CREDIT'),
('COA-4020', 'SCH-KTM-01', '4020', 'Laboratory & Exam Fee Income', 'REVENUE', 'CREDIT'),
('COA-5010', 'SCH-KTM-01', '5010', 'Faculty Teaching Salary Expense', 'EXPENSE', 'DEBIT');

-- 26. Journal Entries & Balanced Double-Entry Line Items
INSERT INTO journal_entries (id, school_id, fiscal_year_id, entry_number, entry_date, source_module, source_reference_id, narration, is_posted, posted_by_user_id, posted_at) VALUES
('JV-2083-0001', 'SCH-KTM-01', 'FY-2083', 'JV-2083-0001', '2026-08-10', 'FEES', 'REC-2083-4414', 'Being Quarter 3 fee receipt collected via ConnectIPS for Aarav Shrestha', 1, 'USR-ACC-03', '2026-08-10 11:25:00');

INSERT INTO journal_entry_items (id, school_id, journal_entry_id, account_id, debit_amount, credit_amount, memo) VALUES
('JEI-01', 'SCH-KTM-01', 'JV-2083-0001', 'COA-1020', 22000.00, 0.00, 'Direct Nabil Bank deposit via ConnectIPS'),
('JEI-02', 'SCH-KTM-01', 'JV-2083-0001', 'COA-4010', 0.00, 15000.00, 'Tuition fee income recognized'),
('JEI-03', 'SCH-KTM-01', 'JV-2083-0001', 'COA-4020', 0.00, 7000.00, 'Lab and exam fee income recognized');

-- 27. Grading Scales (CDC 8-Point Scale)
INSERT INTO grading_scales (id, school_id, scale_name, is_default) VALUES
('GS-CDC', 'SCH-KTM-01', 'National Examination Board (CDC) 8-Point Scale', 1);

INSERT INTO grading_scale_tiers (id, school_id, scale_id, grade_letter, grade_point, min_percentage, max_percentage, description, is_pass) VALUES
('GST-01', 'SCH-KTM-01', 'GS-CDC', 'A+', 4.00, 90.00, 100.00, 'Outstanding', 1),
('GST-02', 'SCH-KTM-01', 'GS-CDC', 'A', 3.60, 80.00, 89.99, 'Excellent', 1),
('GST-03', 'SCH-KTM-01', 'GS-CDC', 'B+', 3.20, 70.00, 79.99, 'Very Good', 1),
('GST-04', 'SCH-KTM-01', 'GS-CDC', 'B', 2.80, 60.00, 69.99, 'Good', 1),
('GST-05', 'SCH-KTM-01', 'GS-CDC', 'C+', 2.40, 50.00, 59.99, 'Satisfactory', 1),
('GST-06', 'SCH-KTM-01', 'GS-CDC', 'C', 2.00, 35.00, 49.99, 'Acceptable', 1),
('GST-07', 'SCH-KTM-01', 'GS-CDC', 'NG', 0.00, 0.00, 34.99, 'Non-Graded', 0);

-- 28. Exams
INSERT INTO exams (id, school_id, session_id, term_id, exam_name, exam_type, start_date, end_date, status) VALUES
('EXM-2083-PB', 'SCH-KTM-01', 'SESS-2083', 'TERM-3', 'Class 10 SEE Pre-Board Examination 2083', 'PRE_BOARD', '2027-01-27', '2027-02-05', 'COMPLETED');

-- 29. Exam Marks (Aarav Shrestha SEE Pre-Board Results)
INSERT INTO exam_marks (id, school_id, exam_id, student_id, subject_id, theory_marks_obtained, practical_marks_obtained, grade_letter, grade_point, is_theory_passed, is_practical_passed, is_passed) VALUES
('EM-01', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 'SUB-101', 68.00, 24.00, 'A+', 4.00, 1, 1, 1),
('EM-02', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 'SUB-102', 71.00, 24.00, 'A+', 4.00, 1, 1, 1),
('EM-03', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 'SUB-103', 74.00, 25.00, 'A+', 4.00, 1, 1, 1),
('EM-04', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 'SUB-104', 72.00, 24.00, 'A+', 4.00, 1, 1, 1),
('EM-05', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 'SUB-105', 67.00, 23.00, 'A+', 4.00, 1, 1, 1),
('EM-06', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 'SUB-106', 70.00, 24.00, 'A+', 4.00, 1, 1, 1),
('EM-07', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 'SUB-107', 48.00, 49.00, 'A+', 4.00, 1, 1, 1);

-- 30. Terminal Results (Aarav Shrestha GPA 3.92)
INSERT INTO terminal_results (id, school_id, exam_id, student_id, total_marks_obtained, max_marks_possible, gpa, division, rank_in_class, attendance_term_pct, principal_remarks, issue_date_bs) VALUES
('TR-1001', 'SCH-KTM-01', 'EXM-2083-PB', 'STU-1001', 663.00, 700.00, 3.92, 'Distinction (A+)', 1, 96.80, 'Aarav possesses exceptional intellectual acumen, scientific reasoning, and moral discipline. Outstanding prospect for National SEE Examinations.', '30 Bhadra 2083');

-- 31. Timetable Periods
INSERT INTO timetable_periods (id, school_id, period_name, period_order, start_time, end_time, is_break) VALUES
('TP-01', 'SCH-KTM-01', 'Period 1', 1, '10:00:00', '10:45:00', 0),
('TP-02', 'SCH-KTM-01', 'Period 2', 2, '10:45:00', '11:30:00', 0),
('TP-ASS', 'SCH-KTM-01', 'National Anthem & Assembly', 3, '11:30:00', '11:45:00', 1),
('TP-03', 'SCH-KTM-01', 'Period 3', 4, '11:45:00', '12:30:00', 0),
('TP-04', 'SCH-KTM-01', 'Period 4', 5, '12:30:00', '13:15:00', 0),
('TP-LUN', 'SCH-KTM-01', 'Tiffin / Lunch Break', 6, '13:15:00', '13:50:00', 1),
('TP-05', 'SCH-KTM-01', 'Period 5', 7, '13:50:00', '14:35:00', 0),
('TP-06', 'SCH-KTM-01', 'Period 6', 8, '14:35:00', '15:20:00', 0),
('TP-07', 'SCH-KTM-01', 'Period 7', 9, '15:20:00', '16:00:00', 0);

-- 32. Notices
INSERT INTO notices (id, school_id, title, category, audience, published_date_bs, published_date_ad, author_role, content, is_urgent) VALUES
('NOT-01', 'SCH-KTM-01', 'Schedule for First Terminal Examination & SEE Model Test 2083', 'ACADEMIC', 'ALL', '20 Bhadra 2083', '2026-09-05', 'Examination Controller', 'The First Terminal Examination commences on 28th Ashwin 2083. Full marks 75 Theory + 25 Practical.', 1),
('NOT-02', 'SCH-KTM-01', 'Quarter 2 Fee Settlement Notice & Online Clearance', 'FINANCE', 'PARENTS', '15 Bhadra 2083', '2026-08-31', 'Accounts Department', 'Parents who have pending dues for Quarter 2 are kindly requested to clear them before 30th Bhadra via eSewa, Khalti, or ConnectIPS.', 0);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- VERIFICATION CHECK: sanskaar_school_db
-- ============================================================================
SELECT 'sanskaar_school_db initialized successfully with exactly 65 tables.' AS status;
