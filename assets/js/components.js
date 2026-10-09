// Sanskaar ERP - Reusable Shell & UI Component Loader
window.Sanskaar = (function() {
  
  // Navigation structure for Admin Panel
  const adminNav = [
    {
      titleKey: "nav_overview",
      items: [
        { id: "dashboard", labelKey: "nav_dashboard", icon: "layout-dashboard", href: "index.html" }
      ]
    },
    {
      titleKey: "admin_schools",
      items: [
        { id: "schools", labelKey: "admin_schools", icon: "building", href: "schools.html", badge: "42" },
        { id: "school-details", labelKey: "admin_school_details", icon: "building-2", href: "school-details.html" }
      ]
    },
    {
      titleKey: "admin_users",
      items: [
        { id: "users", labelKey: "admin_users", icon: "users", href: "users.html" }
      ]
    },
    {
      titleKey: "nav_finance",
      items: [
        { id: "plans", labelKey: "admin_plans", icon: "layers", href: "plans.html" },
        { id: "subscriptions", labelKey: "admin_subscriptions", icon: "credit-card", href: "subscriptions.html", badge: "NPR 14.8L", badgeColor: "emerald" },
        { id: "payments", labelKey: "admin_payments", icon: "wallet", href: "payments.html" }
      ]
    },
    {
      titleKey: "admin_support",
      items: [
        { id: "support", labelKey: "admin_support", icon: "help-circle", href: "support.html", badge: "3 Open", badgeColor: "rose" }
      ]
    },
    {
      titleKey: "nav_reports",
      items: [
        { id: "reports", labelKey: "admin_reports", icon: "bar-chart-3", href: "reports.html" }
      ]
    },
    {
      titleKey: "admin_system_settings",
      items: [
        { id: "activity-logs", labelKey: "admin_activity_logs", icon: "activity", href: "activity-logs.html" },
        { id: "system-settings", labelKey: "admin_system_settings", icon: "settings", href: "system-settings.html" }
      ]
    }
  ];

  // Navigation structure for School ERP Panel
  const schoolNav = [
    {
      titleKey: "nav_overview",
      items: [
        { id: "dashboard", labelKey: "nav_dashboard", icon: "layout-dashboard", href: "index.html" }
      ]
    },
    {
      titleKey: "nav_academics",
      items: [
        { id: "students", labelKey: "nav_students", icon: "graduation-cap", href: "students.html", badge: "105+" },
        { id: "admissions", labelKey: "nav_admissions", icon: "user-plus", href: "admissions.html" },
        { id: "classes", labelKey: "nav_classes", icon: "layers", href: "classes.html" },
        { id: "sections", labelKey: "nav_sections", icon: "grid", href: "sections.html" },
        { id: "subjects", labelKey: "nav_subjects", icon: "book", href: "subjects.html" },
        { id: "timetable", labelKey: "nav_timetable", icon: "clock", href: "timetable.html" },
        { id: "homework", labelKey: "nav_homework", icon: "book-open", href: "homework.html" },
        { id: "assignments", labelKey: "nav_assignments", icon: "clipboard-list", href: "assignments.html" },
        { id: "study-materials", labelKey: "nav_study_materials", icon: "folder", href: "study-materials.html" }
      ]
    },
    {
      titleKey: "nav_attendance",
      items: [
        { id: "attendance", labelKey: "nav_student_attendance", icon: "calendar-check", href: "attendance.html", badge: "96.8%", badgeColor: "orange" },
        { id: "teacher-attendance", labelKey: "nav_teacher_attendance", icon: "user-check", href: "teacher-attendance.html" },
        { id: "staff-attendance", labelKey: "nav_staff_attendance", icon: "check-circle", href: "staff-attendance.html" },
        { id: "attendance-analytics", labelKey: "nav_attendance_analytics", icon: "activity", href: "attendance-analytics.html" }
      ]
    },
    {
      titleKey: "nav_finance",
      items: [
        { id: "fees", labelKey: "nav_fees", icon: "credit-card", href: "fees.html" },
        { id: "fee-collection", labelKey: "nav_fee_collection", icon: "wallet", href: "fee-collection.html" },
        { id: "fee-structure", labelKey: "nav_fee_structure", icon: "list", href: "fee-structure.html" },
        { id: "fee-receipt", labelKey: "nav_fee_receipt", icon: "printer", href: "fee-receipt.html" },
        { id: "expenses", labelKey: "nav_expenses", icon: "arrow-up-right", href: "expenses.html" },
        { id: "salary", labelKey: "nav_salary", icon: "banknote", href: "salary.html" },
        { id: "accounting", labelKey: "nav_accounting", icon: "pie-chart", href: "accounting.html" }
      ]
    },
    {
      titleKey: "nav_examination",
      items: [
        { id: "exams", labelKey: "nav_exams", icon: "file-spreadsheet", href: "exams.html" },
        { id: "exam-schedule", labelKey: "nav_exam_schedule", icon: "calendar", href: "exam-schedule.html" },
        { id: "marks-entry", labelKey: "nav_marks_entry", icon: "edit-3", href: "marks-entry.html" },
        { id: "results", labelKey: "nav_results", icon: "award", href: "results.html" },
        { id: "report-card", labelKey: "nav_report_cards", icon: "file-check", href: "report-card.html", badge: "NEB" }
      ]
    },
    {
      titleKey: "nav_people",
      items: [
        { id: "teachers", labelKey: "nav_teachers", icon: "briefcase", href: "teachers.html" },
        { id: "staff", labelKey: "nav_staff", icon: "users", href: "staff.html" },
        { id: "parents", labelKey: "nav_parents", icon: "contact", href: "parents.html" }
      ]
    },
    {
      titleKey: "nav_documents",
      items: [
        { id: "id-cards", labelKey: "nav_id_cards", icon: "contact-2", href: "id-cards.html" },
        { id: "certificates", labelKey: "nav_certificates", icon: "award", href: "certificates.html" },
        { id: "documents", labelKey: "nav_doc_repo", icon: "file-text", href: "documents.html" }
      ]
    },
    {
      titleKey: "nav_communication",
      items: [
        { id: "notices", labelKey: "nav_notices", icon: "bell", href: "notices.html", badge: "3 New", badgeColor: "rose" },
        { id: "circulars", labelKey: "nav_circulars", icon: "mail", href: "circulars.html" },
        { id: "notifications", labelKey: "nav_notifications", icon: "send", href: "notifications.html" }
      ]
    },
    {
      titleKey: "nav_reports",
      items: [
        { id: "reports", labelKey: "nav_general_reports", icon: "bar-chart-3", href: "reports.html" },
        { id: "financial-reports", labelKey: "nav_financial_reports", icon: "trending-up", href: "financial-reports.html" },
        { id: "exam-analytics", labelKey: "nav_exam_analytics", icon: "line-chart", href: "exam-analytics.html" }
      ]
    },
    {
      titleKey: "nav_smart",
      items: [
        { id: "ai-insights", labelKey: "nav_ai_insights", icon: "sparkles", href: "ai-insights.html", badge: "AI", badgeColor: "orange" },
        { id: "ai-question-paper", labelKey: "nav_ai_question_paper", icon: "file-question", href: "ai-question-paper.html" },
        { id: "ai-worksheet", labelKey: "nav_ai_worksheet", icon: "file-text", href: "ai-worksheet.html" },
        { id: "ai-study-assistant", labelKey: "nav_ai_assistant", icon: "bot", href: "ai-study-assistant.html" }
      ]
    },
    {
      titleKey: "nav_automation",
      items: [
        { id: "automation", labelKey: "nav_automation", icon: "cpu", href: "automation.html" }
      ]
    },
    {
      titleKey: "nav_administration",
      items: [
        { id: "school-profile", labelKey: "nav_school_profile", icon: "building", href: "school-profile.html" },
        { id: "academic-session", labelKey: "nav_academic_session", icon: "calendar-days", href: "academic-session.html" },
        { id: "roles-permissions", labelKey: "nav_roles_permissions", icon: "lock", href: "roles-permissions.html" },
        { id: "school-settings", labelKey: "nav_settings", icon: "settings", href: "school-settings.html" }
      ]
    }
  ];

  // Navigation structure for Student / Parent Portal
  const studentNav = [
    {
      titleKey: "nav_overview",
      items: [
        { id: "dashboard", labelKey: "nav_dashboard", icon: "layout-dashboard", href: "index.html" },
        { id: "profile", labelKey: "student_my_profile", icon: "user", href: "profile.html" }
      ]
    },
    {
      titleKey: "nav_academics",
      items: [
        { id: "attendance", labelKey: "student_attendance", icon: "calendar-check", href: "attendance.html", badge: "96.8%", badgeColor: "emerald" },
        { id: "timetable", labelKey: "student_timetable", icon: "clock", href: "timetable.html" },
        { id: "homework", labelKey: "student_homework", icon: "book-open", href: "homework.html", badge: "1 Due", badgeColor: "orange" },
        { id: "assignments", labelKey: "student_assignments", icon: "clipboard-list", href: "assignments.html" },
        { id: "study-materials", labelKey: "student_materials", icon: "folder", href: "study-materials.html" }
      ]
    },
    {
      titleKey: "nav_finance",
      items: [
        { id: "fees", labelKey: "student_fees", icon: "credit-card", href: "fees.html" },
        { id: "fee-receipts", labelKey: "student_fee_receipts", icon: "printer", href: "fee-receipts.html" }
      ]
    },
    {
      titleKey: "nav_examination",
      items: [
        { id: "exams", labelKey: "student_exams", icon: "calendar", href: "exams.html" },
        { id: "results", labelKey: "student_results", icon: "award", href: "results.html", badge: "GPA 3.92", badgeColor: "emerald" }
      ]
    },
    {
      titleKey: "nav_communication",
      items: [
        { id: "notices", labelKey: "student_notices", icon: "bell", href: "notices.html" },
        { id: "notifications", labelKey: "nav_notifications", icon: "message-square", href: "notifications.html" }
      ]
    },
    {
      titleKey: "nav_documents",
      items: [
        { id: "certificates", labelKey: "student_certificates", icon: "file-check", href: "certificates.html" }
      ]
    }
  ];


  // Navigation structure for Principal Panel
  const principalNav = [
    {
      titleKey: "nav_overview",
      items: [
        { id: "dashboard", labelKey: "nav_dashboard", icon: "layout-dashboard", href: "index.html" }
      ]
    },
    {
      titleKey: "nav_academics",
      items: [
        { id: "students", labelKey: "nav_students", icon: "graduation-cap", href: "students.html" },
        { id: "classes", labelKey: "nav_classes", icon: "layers", href: "classes.html" },
        { id: "sections", labelKey: "nav_sections", icon: "grid", href: "sections.html" },
        { id: "subjects", labelKey: "nav_subjects", icon: "book", href: "subjects.html" },
        { id: "timetable", labelKey: "nav_timetable", icon: "clock", href: "timetable.html" },
        { id: "homework", labelKey: "nav_homework", icon: "book-open", href: "homework.html" },
        { id: "assignments", labelKey: "nav_assignments", icon: "clipboard-list", href: "assignments.html" },
        { id: "study-materials", labelKey: "nav_study_materials", icon: "folder", href: "study-materials.html" }
      ]
    },
    {
      titleKey: "nav_attendance",
      items: [
        { id: "attendance", labelKey: "nav_student_attendance", icon: "calendar-check", href: "attendance.html" },
        { id: "staff-attendance", labelKey: "nav_staff_attendance", icon: "check-circle", href: "staff-attendance.html" }
      ]
    },
    {
      titleKey: "nav_examination",
      items: [
        { id: "exams", labelKey: "nav_exams", icon: "file-spreadsheet", href: "exams.html" },
        { id: "exam-schedule", labelKey: "nav_exam_schedule", icon: "calendar", href: "exam-schedule.html" },
        { id: "marks-entry", labelKey: "nav_marks_entry", icon: "edit-3", href: "marks-entry.html" },
        { id: "results", labelKey: "nav_results", icon: "award", href: "results.html" },
        { id: "report-card", labelKey: "nav_report_cards", icon: "file-check", href: "report-card.html" }
      ]
    },
    {
      titleKey: "nav_people",
      items: [
        { id: "teachers", labelKey: "nav_teachers", icon: "briefcase", href: "teachers.html" },
        { id: "parent-communication", labelKey: "nav_parents", icon: "contact", href: "parent-communication.html" }
      ]
    },
    {
      titleKey: "nav_communication",
      items: [
        { id: "notices", labelKey: "nav_notices", icon: "bell", href: "notices.html" },
        { id: "circulars", labelKey: "nav_circulars", icon: "mail", href: "circulars.html" }
      ]
    },
    {
      titleKey: "nav_reports",
      items: [
        { id: "academic-reports", labelKey: "nav_general_reports", icon: "bar-chart-3", href: "academic-reports.html" }
      ]
    },
    {
      titleKey: "nav_smart",
      items: [
        { id: "ai-insights", labelKey: "nav_ai_insights", icon: "sparkles", href: "ai-insights.html", badge: "AI", badgeColor: "orange" }
      ]
    },
    {
      titleKey: "nav_administration",
      items: [
        { id: "school-profile", labelKey: "nav_school_profile", icon: "building", href: "school-profile.html" },
        { id: "academic-session", labelKey: "nav_academic_session", icon: "calendar-days", href: "academic-session.html" },
        { id: "admissions", labelKey: "nav_admissions", icon: "user-plus", href: "admissions.html" },
        { id: "promotions", labelKey: "nav_promotions", icon: "trending-up", href: "promotions.html" },
        { id: "certificates", labelKey: "nav_certificates", icon: "award", href: "certificates.html" }
      ]
    }
  ];

  // Navigation structure for Accountant Panel
  const accountantNav = [
    {
      titleKey: "nav_overview",
      items: [
        { id: "dashboard", labelKey: "nav_dashboard", icon: "layout-dashboard", href: "index.html" }
      ]
    },
    {
      titleKey: "nav_fee_collection",
      items: [
        { id: "fee-collection", labelKey: "nav_fee_collection", icon: "wallet", href: "fee-collection.html" },
        { id: "daily-collection", labelKey: "nav_daily_collection", icon: "calendar", href: "daily-collection.html" },
        { id: "fee-receipts", labelKey: "nav_fee_receipt", icon: "printer", href: "fee-receipts.html" },
        { id: "pending-fees", labelKey: "nav_pending_fees", icon: "alert-circle", href: "pending-fees.html" }
      ]
    },
    {
      titleKey: "nav_fee_management",
      items: [
        { id: "fee-structure", labelKey: "nav_fee_structure", icon: "list", href: "fee-structure.html" },
        { id: "fee-records", labelKey: "nav_fee_records", icon: "file-text", href: "fee-records.html" },
        { id: "discounts", labelKey: "nav_discounts", icon: "percent", href: "discounts.html" },
        { id: "fines", labelKey: "nav_fines", icon: "alert-triangle", href: "fines.html" }
      ]
    },
    {
      titleKey: "nav_accounting",
      items: [
        { id: "accounting", labelKey: "nav_accounting", icon: "pie-chart", href: "accounting.html" },
        { id: "income", labelKey: "nav_income", icon: "trending-up", href: "income.html" },
        { id: "expenses", labelKey: "nav_expenses", icon: "arrow-up-right", href: "expenses.html" },
        { id: "ledger", labelKey: "nav_ledger", icon: "book", href: "ledger.html" },
        { id: "journal-entries", labelKey: "nav_journal", icon: "file-edit", href: "journal-entries.html" },
        { id: "vouchers", labelKey: "nav_vouchers", icon: "file", href: "vouchers.html" }
      ]
    },
    {
      titleKey: "nav_banking",
      items: [
        { id: "bank-transactions", labelKey: "nav_bank_transactions", icon: "landmark", href: "bank-transactions.html" },
        { id: "bank-reconciliation", labelKey: "nav_reconciliation", icon: "refresh-cw", href: "bank-reconciliation.html" }
      ]
    },
    {
      titleKey: "nav_payroll",
      items: [
        { id: "salary", labelKey: "nav_salary", icon: "banknote", href: "salary.html" },
        { id: "payroll", labelKey: "nav_payroll", icon: "users", href: "payroll.html" }
      ]
    },
    {
      titleKey: "nav_reports",
      items: [
        { id: "financial-reports", labelKey: "nav_financial_reports", icon: "bar-chart-3", href: "financial-reports.html" },
        { id: "audit-reports", labelKey: "nav_audit_reports", icon: "shield-check", href: "audit-reports.html" }
      ]
    },
    {
      titleKey: "nav_administration",
      items: [
        { id: "notices", labelKey: "nav_notices", icon: "bell", href: "notices.html" },
        { id: "profile", labelKey: "nav_profile", icon: "user", href: "profile.html" },
        { id: "settings", labelKey: "nav_settings", icon: "settings", href: "settings.html" }
      ]
    }
  ];

  // Navigation structure for Teacher Panel
  const teacherNav = [
    {
      titleKey: "nav_overview",
      items: [
        { id: "dashboard", labelKey: "nav_dashboard", icon: "layout-dashboard", href: "index.html" },
        { id: "my-profile", labelKey: "nav_my_profile", icon: "user", href: "my-profile.html" }
      ]
    },
    {
      titleKey: "nav_academics",
      items: [
        { id: "my-classes", labelKey: "nav_my_classes", icon: "layers", href: "my-classes.html" },
        { id: "my-subjects", labelKey: "nav_my_subjects", icon: "book", href: "my-subjects.html" },
        { id: "my-students", labelKey: "nav_my_students", icon: "users", href: "my-students.html" },
        { id: "timetable", labelKey: "nav_timetable", icon: "clock", href: "timetable.html" }
      ]
    },
    {
      titleKey: "nav_attendance",
      items: [
        { id: "class-attendance", labelKey: "nav_student_attendance", icon: "calendar-check", href: "class-attendance.html" },
        { id: "attendance-history", labelKey: "nav_attendance_history", icon: "history", href: "attendance-history.html" }
      ]
    },
    {
      titleKey: "nav_assignments",
      items: [
        { id: "assignments", labelKey: "nav_assignments", icon: "clipboard-list", href: "assignments.html" },
        { id: "create-assignment", labelKey: "nav_create_assignment", icon: "plus-circle", href: "create-assignment.html" },
        { id: "homework", labelKey: "nav_homework", icon: "book-open", href: "homework.html" },
        { id: "create-homework", labelKey: "nav_create_homework", icon: "plus-square", href: "create-homework.html" }
      ]
    },
    {
      titleKey: "nav_examination",
      items: [
        { id: "exams", labelKey: "nav_exams", icon: "file-spreadsheet", href: "exams.html" },
        { id: "exam-schedule", labelKey: "nav_exam_schedule", icon: "calendar", href: "exam-schedule.html" },
        { id: "marks-entry", labelKey: "nav_marks_entry", icon: "edit-3", href: "marks-entry.html" },
        { id: "results", labelKey: "nav_results", icon: "award", href: "results.html" },
        { id: "report-cards", labelKey: "nav_report_cards", icon: "file-check", href: "report-cards.html" }
      ]
    },
    {
      titleKey: "nav_resources",
      items: [
        { id: "study-materials", labelKey: "nav_study_materials", icon: "folder", href: "study-materials.html" },
        { id: "lesson-plans", labelKey: "nav_lesson_plans", icon: "file-text", href: "lesson-plans.html" },
        { id: "question-papers", labelKey: "nav_question_papers", icon: "file-question", href: "question-papers.html" },
        { id: "worksheets", labelKey: "nav_worksheets", icon: "layout", href: "worksheets.html" }
      ]
    },
    {
      titleKey: "nav_communication",
      items: [
        { id: "notices", labelKey: "nav_notices", icon: "bell", href: "notices.html" },
        { id: "notifications", labelKey: "nav_notifications", icon: "message-square", href: "notifications.html" },
        { id: "parent-communication", labelKey: "nav_parents", icon: "contact", href: "parent-communication.html" }
      ]
    },
    {
      titleKey: "nav_administration",
      items: [
        { id: "leave-application", labelKey: "nav_leave_application", icon: "calendar-minus", href: "leave-application.html" },
        { id: "certificates", labelKey: "nav_certificates", icon: "award", href: "certificates.html" }
      ]
    }
  ];

  function renderShell(options) {

    const panel = options.panel || 'school'; // 'admin' | 'school' | 'student'
    const activeNav = options.activeNav || 'dashboard';
    const pageTitle = options.pageTitle || 'Dashboard';
    const breadcrumb = options.breadcrumb || 'Overview';
    const rootPrefix = options.rootPrefix || '../';

    const shellContainer = document.getElementById('app-shell');
    const pageContent = document.getElementById('page-content');
    if (!shellContainer || !pageContent) return;

    // Pick appropriate nav groups
    const navGroups = panel === 'admin' ? adminNav : panel === 'student' ? studentNav : panel === 'principal' ? principalNav : panel === 'accountant' ? accountantNav : panel === 'teacher' ? teacherNav : schoolNav;
    const portalNameKey = panel === 'admin' ? 'portal_admin' : panel === 'student' ? 'portal_student' : panel === 'principal' ? 'portal_principal' : panel === 'accountant' ? 'portal_accountant' : panel === 'teacher' ? 'portal_teacher' : 'portal_school';
    const userRole = panel === 'admin' ? 'SaaS Super Admin' : panel === 'student' ? 'Aarav Shrestha (Class 10-A)' : panel === 'principal' ? 'Dr. Ram Bahadur Thapa' : panel === 'accountant' ? 'Hari Prasad Sharma' : panel === 'teacher' ? 'Sita Sharma (Maths)' : 'Prof. Dr. Ram Bahadur Thapa';
    const userSub = panel === 'admin' ? 'Platform Administrator' : panel === 'student' ? 'Student & Guardian View' : panel === 'principal' ? 'Principal' : panel === 'accountant' ? 'Chief Accountant' : panel === 'teacher' ? 'Senior Teacher' : 'School Administrator';
    const userAvatar = panel === 'admin'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      : panel === 'student'
      ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';

    // Saved content innerHTML
    const contentHTML = pageContent.innerHTML;

    shellContainer.innerHTML = `
      <!-- Mobile Sidebar Backdrop Overlay -->
      <div 
        id="mobile-backdrop" 
        class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden hidden transition-opacity"
        onclick="Sanskaar.closeMobileNav()"
      ></div>

      <!-- App Shell Layout Wrapper -->
      <div class="flex h-screen overflow-hidden">
        
        <!-- Left Sidebar -->
        <aside 
          id="app-sidebar" 
          class="fixed lg:static inset-y-0 left-0 z-50 w-64 xl:w-72 bg-white border-r border-slate-200/80 flex flex-col shrink-0 transition-all duration-300 transform -translate-x-full lg:translate-x-0"
        >
          <!-- Sidebar Brand Header -->
          <div class="h-16 px-4 flex items-center justify-between border-b border-slate-200/80 shrink-0 bg-white">
            <a href="index.html" class="flex items-center gap-3 overflow-hidden">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E8752F] to-[#F97316] flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
                <span>S</span>
              </div>
              <div class="truncate">
                <div class="font-black text-slate-900 text-sm tracking-tight" data-i18n="brand_name">SANSKAAR ERP</div>
                <div class="text-[10px] font-medium text-slate-400 truncate" data-i18n="${portalNameKey}">School ERP System</div>
              </div>
            </a>

            <!-- Mobile Close Button -->
            <button 
              class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              onclick="Sanskaar.closeMobileNav()"
            >
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Academic Session Badge -->
          <div class="px-4 py-2 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-500 font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span data-i18n="session">Session</span>
            </span>
            <span class="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]" data-i18n="active_session">
              2083-84 BS (2026-27)
            </span>
          </div>

          <!-- Navigation Links Group -->
          <div class="flex-1 overflow-y-auto px-3 py-3 space-y-4 select-none">
            ${navGroups.map(group => `
              <div>
                <div class="px-3 mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase" data-i18n="${group.titleKey}">
                  ${group.titleKey}
                </div>
                <div class="space-y-0.5">
                  ${group.items.map(item => {
                    const isActive = item.id === activeNav;
                    let badgeHTML = '';
                    if (item.badge) {
                      let bColors = 'bg-slate-100 text-slate-600';
                      if (item.badgeColor === 'emerald') bColors = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                      if (item.badgeColor === 'orange') bColors = 'bg-orange-50 text-[#E8752F] border border-orange-200 font-bold';
                      if (item.badgeColor === 'rose') bColors = 'bg-rose-50 text-rose-600 border border-rose-200';
                      badgeHTML = `<span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${bColors} ml-auto">${item.badge}</span>`;
                    }

                    return `
                      <a
                        href="${item.href}"
                        class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-orange-50 text-[#E8752F] font-bold shadow-2xs border border-orange-200/80'
                            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                        }"
                      >
                        <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0 ${isActive ? 'text-[#E8752F]' : 'text-slate-400'}"></i>
                        <span class="truncate" data-i18n="${item.labelKey}">${item.labelKey}</span>
                        ${badgeHTML}
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Sidebar Footer: Panel Switcher Widget -->
          <div class="p-3 border-t border-slate-200/80 bg-slate-50/60 shrink-0">
            <div class="p-2.5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50/40 border border-orange-200/60 flex items-center justify-between">
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-lg bg-orange-100 text-[#E8752F] flex items-center justify-center shrink-0">
                  <i data-lucide="layers" class="w-4 h-4"></i>
                </div>
                <div class="truncate">
                  <div class="text-[11px] font-bold text-slate-800 leading-tight" data-i18n="switch_panel">Switch Panel</div>
                  <div class="text-[9px] text-slate-400 truncate">Admin • School • Student</div>
                </div>
              </div>
              <button 
                onclick="Sanskaar.togglePanelMenu()"
                class="px-2 py-1 text-[11px] font-bold bg-[#E8752F] text-white rounded-md hover:bg-[#D46320] transition-colors shadow-2xs shrink-0"
              >
                Switch
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Viewport Area -->
        <div id="main-wrapper" class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          
          <!-- Sticky Topbar Header -->
          <header class="h-16 px-4 md:px-6 flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 shrink-0">
            
            <!-- Left: Mobile Menu & Breadcrumbs -->
            <div class="flex items-center gap-3 min-w-0">
              <button 
                onclick="Sanskaar.toggleMobileNav()" 
                class="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Toggle Navigation"
              >
                <i data-lucide="menu" class="w-5 h-5"></i>
              </button>

              <div class="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
                <span>${breadcrumb}</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-300"></i>
                <span class="text-slate-900 font-bold text-sm truncate">${pageTitle}</span>
              </div>
              <div class="sm:hidden text-slate-900 font-bold text-base truncate">
                ${pageTitle}
              </div>
            </div>

            <!-- Center Search Bar (Command Palette Trigger) -->
            <div class="flex-1 max-w-md hidden md:block">
              <button 
                onclick="Sanskaar.openCommandPalette()"
                class="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200 text-slate-400 text-xs transition-all group"
              >
                <div class="flex items-center gap-2 truncate">
                  <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors"></i>
                  <span class="text-slate-500 font-medium truncate" data-i18n="search_placeholder">Search students, staff, modules, fee receipts (Ctrl + K)...</span>
                </div>
                <kbd class="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-500 shadow-2xs shrink-0">Ctrl K</kbd>
              </button>
            </div>

            <!-- Right Controls: Language Switcher, Panel Selector, Notifications, User -->
            <div class="flex items-center gap-2 md:gap-3 shrink-0">
              
              <!-- Language Switcher: English | नेपाली -->
              <div class="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/80">
                <button 
                  id="btn-lang-en" 
                  onclick="SanskaarLanguage.setLang('en')"
                  class="px-2 py-0.5 rounded text-[11px] font-bold transition-all ${SanskaarLanguage.getLang() === 'en' ? 'bg-[#E8752F] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'}"
                >
                  English
                </button>
                <button 
                  id="btn-lang-ne" 
                  onclick="SanskaarLanguage.setLang('ne')"
                  class="px-2 py-0.5 rounded text-[11px] font-bold transition-all ${SanskaarLanguage.getLang() === 'ne' ? 'bg-[#E8752F] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'}"
                >
                  नेपाली
                </button>
              </div>

              <!-- Panel Switcher Dropdown -->
              <div class="relative" id="panel-switcher-dropdown-container">
                <button 
                  onclick="Sanskaar.togglePanelMenu()"
                  class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
                  title="Switch Application Panel"
                >
                  <i data-lucide="layers" class="w-3.5 h-3.5 text-[#E8752F]"></i>
                  <span class="capitalize">${panel} Panel</span>
                  <i data-lucide="chevron-down" class="w-3 h-3 opacity-60"></i>
                </button>

                <!-- Panel Menu Dropdown -->
                <div id="panel-switcher-menu" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-slide-down">
                  <div class="px-4 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider" data-i18n="switch_panel">
                    Select Active Panel
                  </div>
                  <a href="${rootPrefix}admin/index.html" class="px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 transition-colors ${panel === 'admin' ? 'bg-orange-50/60 font-bold text-[#E8752F]' : 'text-slate-700'}">
                    <div class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <i data-lucide="shield" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <div class="text-xs font-bold leading-tight" data-i18n="portal_admin">Admin SaaS Panel</div>
                      <div class="text-[10px] text-slate-400">Platform & School Manager</div>
                    </div>
                  </a>
                  <a href="${rootPrefix}school/index.html" class="px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 transition-colors ${panel === 'school' ? 'bg-orange-50/60 font-bold text-[#E8752F]' : 'text-slate-700'}">
                    <div class="w-8 h-8 rounded-lg bg-orange-50 text-[#E8752F] flex items-center justify-center shrink-0">
                      <i data-lucide="school" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <div class="text-xs font-bold leading-tight" data-i18n="portal_school">School ERP System</div>
                      <div class="text-[10px] text-slate-400">Operations, Fees & Exams</div>
                    </div>
                  </a>
                  <a href="${rootPrefix}student/index.html" class="px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 transition-colors ${panel === 'student' ? 'bg-orange-50/60 font-bold text-[#E8752F]' : 'text-slate-700'}">
                    <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <i data-lucide="smartphone" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <div class="text-xs font-bold leading-tight" data-i18n="portal_student">Student Portal</div>
                      <div class="text-[10px] text-slate-400">Mobile-first parent experience</div>
                    </div>
                  </a>
                  <a href="${rootPrefix}principal/index.html" class="px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 transition-colors ${panel === 'principal' ? 'bg-orange-50/60 font-bold text-[#E8752F]' : 'text-slate-700'}">
                    <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <i data-lucide="crown" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <div class="text-xs font-bold leading-tight">Principal Portal</div>
                      <div class="text-[10px] text-slate-400">Academic Overview</div>
                    </div>
                  </a>
                  <a href="${rootPrefix}accountant/index.html" class="px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 transition-colors ${panel === 'accountant' ? 'bg-orange-50/60 font-bold text-[#E8752F]' : 'text-slate-700'}">
                    <div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <i data-lucide="calculator" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <div class="text-xs font-bold leading-tight">Accountant Portal</div>
                      <div class="text-[10px] text-slate-400">Finance & Fee Management</div>
                    </div>
                  </a>
                  <a href="${rootPrefix}teacher/index.html" class="px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 transition-colors ${panel === 'teacher' ? 'bg-orange-50/60 font-bold text-[#E8752F]' : 'text-slate-700'}">
                    <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <i data-lucide="book-open" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <div class="text-xs font-bold leading-tight">Teacher Portal</div>
                      <div class="text-[10px] text-slate-400">Academics & Evaluation</div>
                    </div>
                  </a>
                </div>
              </div>

              <!-- Notification Bell -->
              <div class="relative" id="notifications-container">
                <button 
                  onclick="Sanskaar.toggleNotifications()"
                  class="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="Notifications"
                >
                  <i data-lucide="bell" class="w-5 h-5"></i>
                  <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8752F] ring-2 ring-white"></span>
                </button>

                <div id="notifications-menu" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-slide-down">
                  <div class="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 class="font-bold text-slate-900 text-sm" data-i18n="notifications">Notifications</h4>
                      <p class="text-[11px] text-slate-400">Nepal Education Operations</p>
                    </div>
                    <button onclick="Toast.info('Marked Read', 'All updates cleared')" class="text-xs text-[#E8752F] font-semibold hover:underline" data-i18n="mark_all_read">Mark all read</button>
                  </div>
                  <div class="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                    <div class="p-3.5 hover:bg-slate-50 flex gap-3 cursor-pointer">
                      <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <i data-lucide="check-circle" class="w-4 h-4"></i>
                      </div>
                      <div>
                        <div class="font-bold text-slate-900">eSewa Fee Cleared: NPR 25,000</div>
                        <p class="text-[11px] text-slate-500 mt-0.5">Aarav Shrestha (Class 10-A) Quarter 2 settled.</p>
                        <span class="text-[10px] text-slate-400">12 mins ago</span>
                      </div>
                    </div>
                    <div class="p-3.5 hover:bg-slate-50 flex gap-3 cursor-pointer">
                      <div class="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                      </div>
                      <div>
                        <div class="font-bold text-slate-900">NEB Routine Published</div>
                        <p class="text-[11px] text-slate-500 mt-0.5">Class 10 SEE Model Exam starting 28 Ashwin.</p>
                        <span class="text-[10px] text-slate-400">1 hour ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- User Profile Menu -->
              <div class="relative" id="user-profile-container">
                <button 
                  onclick="Sanskaar.toggleUserMenu()"
                  class="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img src="${userAvatar}" alt="User" class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200">
                  <div class="hidden md:block text-left">
                    <div class="text-xs font-bold text-slate-800 leading-tight">${userRole}</div>
                    <div class="text-[10px] font-medium text-slate-400">${userSub}</div>
                  </div>
                  <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 hidden md:block"></i>
                </button>

                <div id="user-profile-menu" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-slide-down">
                  <div class="px-4 py-2 border-b border-slate-100">
                    <div class="font-bold text-sm text-slate-900">${userRole}</div>
                    <div class="text-xs text-slate-400">${userSub}</div>
                    <span class="inline-block mt-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">Session Active</span>
                  </div>
                  <div class="py-1">
                    <a href="${rootPrefix}${panel === 'admin' ? 'admin/school-details.html' : panel === 'teacher' ? 'teacher/my-profile.html' : panel === 'accountant' ? 'accountant/profile.html' : panel === 'principal' ? 'principal/school-profile.html' : panel === 'student' ? 'student/profile.html' : 'school/school-profile.html'}" class="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5">
                      <i data-lucide="user" class="w-4 h-4 text-slate-400"></i>
                      <span>My Profile</span>
                    </a>
                  </div>
                  <div class="border-t border-slate-100 pt-1">
                    <a href="${rootPrefix}login/school.html" class="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5">
                      <i data-lucide="log-out" class="w-4 h-4 text-rose-500"></i>
                      <span data-i18n="logout">Sign Out</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </header>

          <!-- Main Viewport Page Content -->
          <main class="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/70 p-4 sm:p-6 lg:p-8">
            <div class="max-w-7xl mx-auto w-full">
              ${contentHTML}
            </div>

            <!-- Standardized Footer -->
            <footer class="max-w-7xl mx-auto w-full mt-12 pt-6 pb-6 border-t border-slate-200/80 text-center text-xs text-slate-400 no-print flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span class="font-bold text-slate-700" data-i18n="brand_name">SANSKAAR ERP</span>
                <span>•</span>
                <span data-i18n="powered_by">Nepal's Leading Cloud School ERP</span>
              </div>
              <div class="flex items-center gap-4">
                <a href="${rootPrefix}school/school-profile.html" class="hover:text-slate-600 transition-colors">Kathmandu Valley Secondary School</a>
                <span>•</span>
                <span>NEB Code: 27014</span>
              </div>
            </footer>
          </main>

        </div>

      </div>

      <!-- Command Palette Modal (Ctrl + K) -->
      <div id="command-palette-modal" class="modal-container fixed inset-0 z-50 hidden flex items-start justify-center pt-16 sm:pt-24 p-4">
        <div class="modal-backdrop fixed inset-0 bg-slate-900/50 backdrop-blur-xs opacity-0 transition-opacity" onclick="Sanskaar.closeCommandPalette()"></div>
        <div class="modal-dialog relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform scale-95 opacity-0 transition-all z-10">
          <div class="p-3.5 border-b border-slate-100 flex items-center gap-3">
            <i data-lucide="search" class="w-5 h-5 text-[#E8752F] shrink-0"></i>
            <input 
              id="palette-search-input" 
              type="text" 
              autocomplete="off"
              placeholder="Search students, teachers, modules, fees (e.g. Aarav, Fees, Routine)..." 
              oninput="Sanskaar.filterPalette(this.value)"
              class="w-full text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
            >
            <button onclick="Sanskaar.closeCommandPalette()" class="text-slate-400 hover:text-slate-600 p-1 rounded-md">
              <kbd class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">ESC</kbd>
            </button>
          </div>
          <div id="palette-results-list" class="max-h-80 overflow-y-auto p-2 space-y-1">
            <!-- Results dynamically generated -->
          </div>
          <div class="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Press <kbd class="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">↵</kbd> to select</span>
            <span>SANSKAAR ERP Global Search</span>
          </div>
        </div>
      </div>
    `;

    // Initialize Lucide Icons & Localization
    if (window.lucide) {
      window.lucide.createIcons();
    }
    if (window.SanskaarLanguage) {
      window.SanskaarLanguage.applyLanguage(window.SanskaarLanguage.getLang());
    }

    // Keyboard shortcut for Command Palette
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        openCommandPalette();
      }
    });

    // Close menus on outside click
    document.addEventListener('click', (e) => {
      const panelDropdown = document.getElementById('panel-switcher-dropdown-container');
      const notif = document.getElementById('notifications-container');
      const user = document.getElementById('user-profile-container');
      if (panelDropdown && !panelDropdown.contains(e.target)) {
        document.getElementById('panel-switcher-menu')?.classList.add('hidden');
      }
      if (notif && !notif.contains(e.target)) {
        document.getElementById('notifications-menu')?.classList.add('hidden');
      }
      if (user && !user.contains(e.target)) {
        document.getElementById('user-profile-menu')?.classList.add('hidden');
      }
    });
  }

  function toggleMobileNav() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (sidebar && backdrop) {
      sidebar.classList.toggle('-translate-x-full');
      backdrop.classList.toggle('hidden');
    }
  }

  function closeMobileNav() {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }

  function togglePanelMenu() {
    const menu = document.getElementById('panel-switcher-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  function toggleNotifications() {
    const menu = document.getElementById('notifications-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  function toggleUserMenu() {
    const menu = document.getElementById('user-profile-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  function openCommandPalette() {
    ModalManager.open('command-palette-modal');
    const input = document.getElementById('palette-search-input');
    if (input) {
      input.value = '';
      input.focus();
      filterPalette('');
    }
  }

  function closeCommandPalette() {
    ModalManager.close('command-palette-modal');
  }

  function filterPalette(query) {
    const q = (query || '').toLowerCase().trim();
    const list = document.getElementById('palette-results-list');
    if (!list) return;

    let items = [
      { type: "Nav", title: "Students Directory", href: "students.html" },
      { type: "Nav", title: "Fee Collection & Invoices", href: "fees.html" },
      { type: "Nav", title: "Daily Attendance Marking", href: "attendance.html" },
      { type: "Nav", title: "Class Timetable Routine", href: "timetable.html" },
      { type: "Nav", title: "AI Question Paper Studio", href: "ai-question-paper.html" },
      { type: "Nav", title: "Official Report Cards (NEB)", href: "report-card.html" },
      { type: "Nav", title: "Digital ID Card Studio", href: "id-cards.html" }
    ];

    if (window.SANSKAAR_DATA && window.SANSKAAR_DATA.students && q.length >= 2) {
      const studentMatches = window.SANSKAAR_DATA.students
        .filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.class.toLowerCase().includes(q))
        .slice(0, 4)
        .map(s => ({
          type: "Student",
          title: `${s.name} (${s.class}-${s.section}) • Roll ${s.rollNo}`,
          subtitle: `ID: ${s.id} • Fee: ${s.feeStatus}`,
          href: `student-profile.html?id=${s.id}`
        }));
      items = [...studentMatches, ...items];
    }

    const filtered = q ? items.filter(x => x.title.toLowerCase().includes(q) || (x.subtitle && x.subtitle.toLowerCase().includes(q))) : items.slice(0, 6);

    list.innerHTML = filtered.map(item => `
      <a href="${item.href}" class="flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-orange-50/80 transition-colors text-slate-700">
        <div class="flex items-center gap-3 min-w-0">
          <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${item.type === 'Student' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-orange-50 text-[#E8752F] border-orange-200'}">
            ${item.type}
          </span>
          <div class="truncate">
            <div class="text-xs font-bold text-slate-800 truncate">${item.title}</div>
            ${item.subtitle ? `<div class="text-[10px] text-slate-400 truncate">${item.subtitle}</div>` : ''}
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
      </a>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  return {
    renderShell,
    toggleMobileNav,
    closeMobileNav,
    togglePanelMenu,
    toggleNotifications,
    toggleUserMenu,
    openCommandPalette,
    closeCommandPalette,
    filterPalette
  };
})();
