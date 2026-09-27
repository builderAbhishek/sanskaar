// Sanskaar Digital School ERP - Core Application Controller
window.App = (function() {
  let currentView = 'dashboard';
  let viewParams = null;
  let viewMode = 'admin'; // 'admin' | 'parent'

  const breadcrumbMap = {
    'dashboard': { title: 'Executive Dashboard', parent: 'Overview' },
    'students': { title: 'Student Directory', parent: 'Academics' },
    'student-profile': { title: 'Student 360 Profile', parent: 'Academics' },
    'classes': { title: 'Classes & Sections', parent: 'Academics' },
    'timetable': { title: 'Timetable Matrix', parent: 'Academics' },
    'homework': { title: 'Homework & Study Materials', parent: 'Academics' },
    'fees': { title: 'Fee Management & Collection', parent: 'Finance' },
    'fee-receipt': { title: 'Official Fee Receipt', parent: 'Finance' },
    'accounting': { title: 'Institutional Accounting', parent: 'Finance' },
    'attendance': { title: 'Daily Attendance Marking', parent: 'Attendance' },
    'attendance-analytics': { title: 'Attendance Retention Analytics', parent: 'Attendance' },
    'examination': { title: 'Examinations & Marks Entry', parent: 'Examination' },
    'report-cards': { title: 'Official CBSE Report Card', parent: 'Examination' },
    'teachers': { title: 'Faculty & Staff Directory', parent: 'People' },
    'id-cards': { title: 'Digital ID Card Studio', parent: 'Documents' },
    'certificates': { title: 'Official Certificate Generator', parent: 'Documents' },
    'communication': { title: 'Notice Board & SMS Alerts', parent: 'Communication' },
    'parent-portal': { title: 'Parent Mobile Portal', parent: 'Portal' },
    'admin': { title: 'School Administration & Security', parent: 'Administration' },
    'reports': { title: 'Reports & Intelligence', parent: 'Analytics' },
    'ai-smart': { title: 'AI Question Paper & Insights', parent: 'Smart AI' },
    'automation': { title: 'Automation Engine & Schedulers', parent: 'Smart AI' }
  };

  function init() {
    // Render initial Shell
    Sidebar.render('dashboard');
    Navbar.render('Executive Dashboard', 'Overview');
    CommandPalette.init();

    // Render Dashboard
    navigate('dashboard');
  }

  function navigate(viewName, params = null) {
    currentView = viewName;
    viewParams = params;

    // Close mobile sidebar drawer if open
    Sidebar.closeMobile();

    // Update breadcrumb & active nav
    const meta = breadcrumbMap[viewName] || { title: viewName, parent: 'Sanskaar ERP' };
    Sidebar.render(viewName);
    Navbar.render(meta.title, meta.parent);

    const viewport = document.getElementById('main-content-viewport');
    if (!viewport) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render appropriate view module
    if (viewName === 'dashboard') {
      viewport.innerHTML = DashboardView.render();
      setTimeout(() => DashboardView.initCharts(), 50);
    } else if (viewName === 'students') {
      viewport.innerHTML = StudentListView.render();
    } else if (viewName === 'student-profile') {
      viewport.innerHTML = StudentProfileView.render(params);
    } else if (viewName === 'classes') {
      viewport.innerHTML = ClassesView.render();
    } else if (viewName === 'timetable') {
      viewport.innerHTML = TimetableView.render();
    } else if (viewName === 'homework') {
      viewport.innerHTML = HomeworkView.render();
    } else if (viewName === 'fees') {
      viewport.innerHTML = FeeDashboardView.render();
    } else if (viewName === 'fee-receipt') {
      viewport.innerHTML = FeeReceiptView.render(params);
    } else if (viewName === 'accounting') {
      viewport.innerHTML = AccountingView.render();
    } else if (viewName === 'attendance') {
      viewport.innerHTML = AttendanceView.render('marking');
    } else if (viewName === 'attendance-analytics') {
      viewport.innerHTML = AttendanceView.render('analytics');
    } else if (viewName === 'examination') {
      viewport.innerHTML = ExaminationView.render();
    } else if (viewName === 'report-cards') {
      viewport.innerHTML = ReportCardView.render(params);
    } else if (viewName === 'teachers') {
      viewport.innerHTML = TeachersView.render();
    } else if (viewName === 'id-cards') {
      viewport.innerHTML = IdCardView.render(params);
    } else if (viewName === 'certificates') {
      viewport.innerHTML = CertificatesView.render();
    } else if (viewName === 'communication') {
      viewport.innerHTML = CommunicationView.render();
    } else if (viewName === 'parent-portal') {
      viewport.innerHTML = ParentPortalView.render();
    } else if (viewName === 'admin') {
      viewport.innerHTML = AdminSettingsView.render();
    } else if (viewName === 'reports') {
      viewport.innerHTML = ReportsView.render();
    } else if (viewName === 'ai-smart') {
      viewport.innerHTML = AiFeaturesView.render();
    } else if (viewName === 'automation') {
      viewport.innerHTML = AutomationView.render();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function switchViewMode(mode) {
    viewMode = mode;
    if (mode === 'parent') {
      navigate('parent-portal');
      Toast.info('Parent View Mode', 'Viewing portal for Aarav Sharma (Class X-A)');
    } else {
      navigate('dashboard');
      Toast.info('Admin View Restored', 'Full administrative authority active');
    }
  }

  function viewStudentProfile(studentId) {
    navigate('student-profile', studentId);
  }

  function openReportCard(studentId) {
    navigate('report-cards', studentId);
  }

  function openFeeReceipt(invoiceNo) {
    navigate('fee-receipt', invoiceNo);
  }

  function openIdCard(studentId) {
    navigate('id-cards', studentId);
  }

  function openCertificate(type, studentId) {
    navigate('certificates');
    setTimeout(() => {
      CertificatesView.setCertType(type);
      if (studentId) CertificatesView.setStudent(studentId);
    }, 50);
  }

  function refreshCurrentView() {
    navigate(currentView, viewParams);
  }

  return {
    init,
    navigate,
    switchViewMode,
    viewStudentProfile,
    openReportCard,
    openFeeReceipt,
    openIdCard,
    openCertificate,
    refreshCurrentView
  };
})();

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
