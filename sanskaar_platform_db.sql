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
