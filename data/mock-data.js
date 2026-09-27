// Sanskaar ERP - Central Mock Database (Nepal Market & SaaS Architecture)
window.SANSKAAR_DATA = (function() {
  
  // 1. Platform / SaaS Admin Data
  const platform = {
    name: "SANSKAAR ERP Platform",
    tagline: "Nepal's Leading Cloud School Operating System",
    currency: "रू",
    currencyCode: "NPR",
    kpis: {
      totalSchools: 42,
      activeSchools: 39,
      totalStudentsPlatform: 48250,
      totalTeachersPlatform: 2480,
      mrr: 1485000,
      arr: 17820000,
      activeSubscriptions: 39,
      growthRate: "+18.4%"
    },
    schools: [
      {
        id: "SCH-KTM-01",
        name: "Kathmandu Valley Secondary School",
        code: "KVSS-27014",
        city: "Maharajgunj, Kathmandu",
        province: "Bagmati Province",
        contactPerson: "Dr. Ram Bahadur Thapa",
        phone: "+977 1 4720911",
        email: "principal@kvss.edu.np",
        students: 1482,
        teachers: 78,
        plan: "Enterprise Plan",
        monthlyBilling: 65000,
        status: "Active",
        joinedDate: "2022-04-14",
        renewalDate: "2027-04-13",
        logo: "K"
      },
      {
        id: "SCH-PKR-02",
        name: "Pokhara Modern Academy",
        code: "PMA-33018",
        city: "Lakeside-6, Pokhara",
        province: "Gandaki Province",
        contactPerson: "Mrs. Meena Gurung",
        phone: "+977 61 520441",
        email: "info@pokharamodern.edu.np",
        students: 1240,
        teachers: 64,
        plan: "Professional Plan",
        monthlyBilling: 35000,
        status: "Active",
        joinedDate: "2023-01-10",
        renewalDate: "2027-01-09",
        logo: "P"
      },
      {
        id: "SCH-BRT-03",
        name: "Biratnagar Public Model Higher Secondary",
        code: "BPM-56012",
        city: "Main Road, Biratnagar",
        province: "Koshi Province",
        contactPerson: "Mr. Narayan Prasad Karki",
        phone: "+977 21 462100",
        email: "admin@biratpublic.edu.np",
        students: 1420,
        teachers: 70,
        plan: "Professional Plan",
        monthlyBilling: 35000,
        status: "Active",
        joinedDate: "2023-03-20",
        renewalDate: "2027-03-19",
        logo: "B"
      },
      {
        id: "SCH-LAL-04",
        name: "Lalitpur Heritage International Academy",
        code: "LHA-28009",
        city: "Jawalakhel, Lalitpur",
        province: "Bagmati Province",
        contactPerson: "Dr. Suman Shakya",
        phone: "+977 1 5539201",
        email: "office@lalitpurheritage.edu.np",
        students: 1150,
        teachers: 62,
        plan: "Enterprise Plan",
        monthlyBilling: 65000,
        status: "Active",
        joinedDate: "2022-08-01",
        renewalDate: "2026-11-01",
        logo: "L"
      },
      {
        id: "SCH-BTW-05",
        name: "Butwal Model Secondary School",
        code: "BMS-41005",
        city: "Traffic Chowk, Butwal",
        province: "Lumbini Province",
        contactPerson: "Mr. Hari Krishna Pandey",
        phone: "+977 71 540882",
        email: "contact@butwalmodel.edu.np",
        students: 980,
        teachers: 48,
        plan: "Basic Plan",
        monthlyBilling: 15000,
        status: "Active",
        joinedDate: "2024-02-15",
        renewalDate: "2027-02-14",
        logo: "B"
      },
      {
        id: "SCH-DHN-06",
        name: "Dharan Adarsha Secondary School",
        code: "DAS-57004",
        city: "Bhanu Chowk, Dharan",
        province: "Koshi Province",
        contactPerson: "Mrs. Kamala Rai",
        phone: "+977 25 521890",
        email: "info@dharanadarsha.edu.np",
        students: 820,
        teachers: 42,
        plan: "Basic Plan",
        monthlyBilling: 15000,
        status: "Trial",
        joinedDate: "2026-08-01",
        renewalDate: "2026-09-30",
        logo: "D"
      }
    ],
    plans: [
      {
        id: "plan-basic",
        name: "Basic Plan",
        priceNpr: 15000,
        billingCycle: "Monthly",
        studentCap: "Up to 1,000 Students",
        features: [
          "Student Information & Admission System",
          "Attendance Marking & SMS Gateway",
          "Basic Fee Ledger & Counter Receipts",
          "Standard Exam Routine & Marksheet",
          "Standard Email Support"
        ],
        activeSchoolsCount: 14,
        badge: "Essential"
      },
      {
        id: "plan-pro",
        name: "Professional Plan",
        priceNpr: 35000,
        billingCycle: "Monthly",
        studentCap: "Up to 2,000 Students",
        features: [
          "Everything in Basic Plan",
          "eSewa & Khalti Online Fee Gateway Integration",
          "Biometric Attendance Integration",
          "Mobile-Friendly Student & Parent Portal",
          "Accounting & Payroll Management",
          "AI Question Paper Generator (Standard)",
          "Priority 24/7 Helpline"
        ],
        activeSchoolsCount: 18,
        badge: "Most Popular",
        highlight: true
      },
      {
        id: "plan-enterprise",
        name: "Enterprise Plan",
        priceNpr: 65000,
        billingCycle: "Monthly",
        studentCap: "Unlimited Students & Branches",
        features: [
          "Everything in Professional Plan",
          "Multi-Wing & Multi-Campus Hierarchy",
          "AI Student Diagnostic & Early Warning Engine",
          "Automated NEB/SEE Marks Ledger Export",
          "Dedicated Account Manager in Kathmandu",
          "Custom School Branding & Android App",
          "Daily Geo-Redundant Cloud Backups"
        ],
        activeSchoolsCount: 7,
        badge: "Advanced"
      }
    ],
    payments: [
      { txnId: "TXN-NP-9981", school: "Kathmandu Valley Secondary School", amount: 65000, plan: "Enterprise", method: "ConnectIPS / Nabil Bank", date: "2026-09-01", status: "Completed" },
      { txnId: "TXN-NP-9980", school: "Pokhara Modern Academy", amount: 35000, plan: "Professional", method: "eSewa Corporate", date: "2026-09-01", status: "Completed" },
      { txnId: "TXN-NP-9979", school: "Biratnagar Public Model", amount: 35000, plan: "Professional", method: "Khalti Merchant Pay", date: "2026-08-28", status: "Completed" },
      { txnId: "TXN-NP-9978", school: "Lalitpur Heritage International", amount: 65000, plan: "Enterprise", method: "Direct Bank NEFT (Global IME)", date: "2026-08-25", status: "Completed" },
      { txnId: "TXN-NP-9977", school: "Butwal Model Secondary", amount: 15000, plan: "Basic", method: "ConnectIPS", date: "2026-08-20", status: "Completed" }
    ],
    supportTickets: [
      { id: "TCK-401", school: "Pokhara Modern Academy", subject: "eSewa Webhook sync timeout during peak admission", priority: "High", status: "In Progress", date: "Today, 08:30 AM" },
      { id: "TCK-400", school: "Butwal Model Secondary", subject: "Request for custom SEE character certificate template", priority: "Medium", status: "Open", date: "Yesterday" },
      { id: "TCK-399", school: "Kathmandu Valley Secondary School", subject: "Upgraded subscription tier to Enterprise", priority: "Low", status: "Resolved", date: "05 Sep 2026" }
    ],
    activityLogs: [
      { user: "admin@sanskaar.com.np", action: "Updated Enterprise Plan features", module: "Billing", ip: "27.34.20.11 (Kathmandu)", time: "10 mins ago", status: "Success" },
      { user: "ram.thapa@kvss.edu.np", action: "Dispatched Term 2 Attendance SMS (1,402 delivered)", module: "SMS Gateway", ip: "103.10.29.4 (NTC Fiber)", time: "45 mins ago", status: "Success" },
      { user: "system_daemon", action: "Nightly automated cloud snapshot verified (412 MB)", module: "Backup", ip: "10.0.4.1 (AWS Mumbai)", time: "03:00 AM", status: "Success" }
    ]
  };

  // 2. Main School ERP Data (Kathmandu Valley Secondary School)
  const schoolProfile = {
    name: "Kathmandu Valley Secondary School",
    nepaliName: "काठमाडौँ भ्याली माध्यमिक विद्यालय",
    tagline: "Empowering Minds, Preserving Sanskaar",
    affiliation: "Affiliated with National Examinations Board (NEB), Nepal",
    nebCode: "NEB-KTM-27014",
    board: "National Examinations Board (NEB), Government of Nepal",
    founded: "2054 BS (1997 AD)",
    address: "Maharajgunj-3, Ring Road, Kathmandu, Nepal",
    phone: "+977 1 4720911 / +977 98510 44219",
    email: "info@kvss.edu.np",
    website: "https://kvss.edu.np",
    principal: "Prof. Dr. Ram Bahadur Thapa, M.Sc., Ph.D.",
    academicSession: "2083-84 BS (2026-27 AD)",
    currency: "रू",
    currencyCode: "NPR",
    houses: ["Sagarmatha", "Annapurna", "Machhapuchhre", "Lhotse"]
  };

  // 105+ Nepali Students Dataset
  const nepaliFirstNamesBoy = ["Aarav", "Rohan", "Bibek", "Sujan", "Anup", "Kiran", "Prashant", "Roshan", "Dipesh", "Santosh", "Manish", "Bikash", "Samir", "Bishal", "Nabin", "Ashish", "Suraj", "Umesh", "Sanjay", "Milan"];
  const nepaliFirstNamesGirl = ["Diya", "Ananya", "Pooja", "Prativa", "Shristi", "Alina", "Sushma", "Pabitra", "Manisha", "Kritika", "Smarika", "Bandana", "Bipana", "Swastika", "Archana", "Rejina", "Sneha", "Kusum", "Deepa", "Pooja"];
  const nepaliLastNames = ["Shrestha", "Shakya", "Adhikari", "Thapa", "Poudel", "Karki", "Basnet", "Sharma", "Gurung", "Tamang", "Magar", "Rai", "Bhattarai", "Pandey", "Bhandari", "Maharjan", "Bajracharya", "Dahal", "Ghimire", "Acharya"];
  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-"];
  const houses = ["Sagarmatha", "Annapurna", "Machhapuchhre", "Lhotse"];
  const classesList = ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8 (BLE)", "Class 9", "Class 10 (SEE)", "Class 11 (NEB)", "Class 12 (NEB)"];
  const sectionsList = ["A", "B", "C"];

  const students = [];
  let idCounter = 1;

  for (let cIdx = 0; cIdx < classesList.length; cIdx++) {
    const cls = classesList[cIdx];
    for (let sIdx = 0; sIdx < 3; sIdx++) {
      const sec = sectionsList[sIdx];
      const count = (cIdx === 12 || cIdx === 13) ? 4 : 2;
      
      for (let k = 0; k < count; k++) {
        const isBoy = (idCounter % 2 === 1);
        const fName = isBoy ? nepaliFirstNamesBoy[(idCounter * 3) % nepaliFirstNamesBoy.length] : nepaliFirstNamesGirl[(idCounter * 7) % nepaliFirstNamesGirl.length];
        const lName = nepaliLastNames[(idCounter * 5) % nepaliLastNames.length];
        const fullName = `${fName} ${lName}`;
        const rollNo = (k + 1).toString().padStart(2, '0');
        const studentId = `KVSS-2083-${idCounter.toString().padStart(3, '0')}`;
        const phone = `+977 98${41000000 + (idCounter * 12347) % 8999999}`;
        const fatherName = `Mr. Ramesh ${lName}`;
        const motherName = `Mrs. Gita ${lName}`;
        const feeStatusList = ["Paid", "Paid", "Paid", "Partial", "Overdue"];
        const feeStatus = feeStatusList[idCounter % feeStatusList.length];
        const attendance = 72 + ((idCounter * 13) % 27);
        const balance = feeStatus === "Paid" ? 0 : (feeStatus === "Partial" ? 8500 : 26000);
        const house = houses[idCounter % houses.length];
        const bg = bloodGroups[idCounter % bloodGroups.length];
        
        students.push({
          id: studentId,
          rollNo: rollNo,
          name: fullName,
          gender: isBoy ? "Male" : "Female",
          class: cls,
          section: sec,
          admissionNo: `ADM-2079-${1000 + idCounter}`,
          admissionYear: "2079 BS",
          dob: "2067-04-15 BS (2010 AD)",
          bloodGroup: bg,
          house: house,
          fatherName: fatherName,
          motherName: motherName,
          parentPhone: phone,
          email: `${fName.toLowerCase()}.${idCounter}@kvss.edu.np`,
          address: `Ward No. ${(idCounter % 15) + 1}, Maharajgunj, Kathmandu`,
          transportRoute: (idCounter % 4 === 0) ? "Self / Walk" : `Bus Route #${(idCounter % 6) + 1} (Budhanilkantha - Ring Road)`,
          attendancePct: attendance,
          feeStatus: feeStatus,
          feeDue: balance,
          status: "Active",
          gpa: (3.2 + ((idCounter * 7) % 8) / 10).toFixed(2),
          photo: isBoy 
            ? `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80` 
            : `https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80`
        });
        
        idCounter++;
        if (idCounter > 105) break;
      }
      if (idCounter > 105) break;
    }
    if (idCounter > 105) break;
  }

  // Student 0: Aarav Shrestha (Class 10-A SEE Candidate)
  students[0] = {
    ...students[0],
    id: "KVSS-2083-001",
    name: "Aarav Shrestha",
    nepaliName: "आरव श्रेष्ठ",
    rollNo: "01",
    class: "Class 10 (SEE)",
    section: "A",
    admissionNo: "ADM-2078-1001",
    gender: "Male",
    admissionYear: "2078 BS",
    dob: "2067-01-12 BS (2010 AD)",
    bloodGroup: "B+",
    house: "Sagarmatha",
    fatherName: "Mr. Rajesh Shrestha (Civil Engineer, DoR)",
    motherName: "Dr. Anjali Shrestha (Senior Consultant, TUTH)",
    parentPhone: "+977 98510 34567",
    email: "aarav.shrestha@kvss.edu.np",
    address: "House 42, Shanti Marga, Maharajgunj-3, Kathmandu",
    transportRoute: "Bus Route #02 (Budhanilkantha - Narayangopal Chowk)",
    attendancePct: 96.8,
    feeStatus: "Paid",
    feeDue: 0,
    status: "Active",
    gpa: "3.92 (A+)",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  };

  // Student 1: Diya Shakya (Partial Fee)
  students[1] = {
    ...students[1],
    id: "KVSS-2083-002",
    name: "Diya Shakya",
    rollNo: "02",
    class: "Class 10 (SEE)",
    section: "A",
    feeStatus: "Partial",
    feeDue: 8500,
    house: "Annapurna",
    attendancePct: 92.5
  };

  // Student 2: Vihaan Poudel (Overdue Fee & Low Attendance Alert)
  students[2] = {
    ...students[2],
    id: "KVSS-2083-003",
    name: "Vihaan Poudel",
    rollNo: "03",
    class: "Class 10 (SEE)",
    section: "A",
    feeStatus: "Overdue",
    feeDue: 26000,
    house: "Machhapuchhre",
    attendancePct: 73.2 // Triggers <75% NEB Warning
  };

  // Teaching Faculty (Nepal Context)
  const teachers = [
    {
      id: "TCH-001",
      name: "Prof. Dr. Ram Bahadur Thapa",
      designation: "Principal & PGT Physics",
      department: "Science",
      qualification: "M.Sc. Physics (TU), Ph.D., B.Ed.",
      experience: "24 Years",
      phone: "+977 98510 44219",
      email: "principal@kvss.edu.np",
      joiningDate: "2062-04-01 BS",
      assignedClasses: ["Class 12-A", "Class 11-A"],
      subjects: ["Physics", "Applied Mechanics"],
      salary: 115000,
      status: "Active",
      attendance: "98.5%",
      leaveBalance: { casual: 8, medical: 10, earned: 14 },
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-002",
      name: "Mrs. Sunita Shrestha",
      designation: "HOD Mathematics & SEE Coordinator",
      department: "Mathematics",
      qualification: "M.Sc. Pure Mathematics (TU), B.Ed.",
      experience: "16 Years",
      phone: "+977 98412 22340",
      email: "sunita.shrestha@kvss.edu.np",
      joiningDate: "2066-06-15 BS",
      assignedClasses: ["Class 10-A", "Class 10-B"],
      subjects: ["Compulsory Mathematics", "Optional Mathematics"],
      salary: 82000,
      status: "Active",
      attendance: "96.4%",
      leaveBalance: { casual: 6, medical: 8, earned: 12 },
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-003",
      name: "Mr. Rajesh Adhikari",
      designation: "PGT Chemistry & Science Lead",
      department: "Science",
      qualification: "M.Sc. Chemistry (TU), B.Ed.",
      experience: "14 Years",
      phone: "+977 98413 11456",
      email: "rajesh.adhikari@kvss.edu.np",
      joiningDate: "2069-07-10 BS",
      assignedClasses: ["Class 9-A", "Class 10-A", "Class 11-B"],
      subjects: ["Chemistry", "Science & Technology"],
      salary: 76000,
      status: "Active",
      attendance: "94.5%",
      leaveBalance: { casual: 7, medical: 9, earned: 10 },
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-004",
      name: "Mrs. Ananya Bhattarai",
      designation: "HOD English & Vice-Principal",
      department: "Languages & Humanities",
      qualification: "M.A. English (Gold Medalist, TU), M.Ed.",
      experience: "17 Years",
      phone: "+977 98511 33455",
      email: "ananya.bhattarai@kvss.edu.np",
      joiningDate: "2067-04-01 BS",
      assignedClasses: ["Class 10-A", "Class 12-A"],
      subjects: ["Compulsory English", "Creative Writing"],
      salary: 85000,
      status: "Active",
      attendance: "97.8%",
      leaveBalance: { casual: 9, medical: 10, earned: 15 },
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-005",
      name: "Mr. Bikram Gurung",
      designation: "HOD Computer Science & AI",
      department: "Information Technology",
      qualification: "M.Sc. CSIT (TU), B.E. Computer",
      experience: "11 Years",
      phone: "+977 98419 55678",
      email: "bikram.gurung@kvss.edu.np",
      joiningDate: "2072-03-01 BS",
      assignedClasses: ["Class 9-A", "Class 10-A", "Class 11-A", "Class 12-A"],
      subjects: ["Computer Science", "Artificial Intelligence", "Python Programming"],
      salary: 82000,
      status: "Active",
      attendance: "99.0%",
      leaveBalance: { casual: 10, medical: 10, earned: 18 },
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-006",
      name: "Pandit Dilli Prasad Dahal",
      designation: "HOD Nepali & Sanskrit",
      department: "Nepali & Oriental Studies",
      qualification: "M.A. Nepali Literature, Acharya Sanskrit, B.Ed.",
      experience: "21 Years",
      phone: "+977 98414 77889",
      email: "dilli.dahal@kvss.edu.np",
      joiningDate: "2064-05-15 BS",
      assignedClasses: ["Class 9-A", "Class 10-A", "Class 11-A"],
      subjects: ["अनिवार्य नेपाली (Compulsory Nepali)", "नेपाली व्याकरण"],
      salary: 78000,
      status: "Active",
      attendance: "98.2%",
      leaveBalance: { casual: 8, medical: 10, earned: 12 },
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    }
  ];

  // Non-teaching Support Staff
  const staff = [
    { id: "STF-001", name: "Gopal Krishna Shrestha", designation: "Chief Accountant", department: "Accounts & Audit", phone: "+977 98510 99881", salary: 65000, status: "Active", attendance: "98.0%" },
    { id: "STF-002", name: "Meena Kumari Shakya", designation: "Chief Librarian", department: "Library", phone: "+977 98410 99882", salary: 52000, status: "Active", attendance: "96.5%" },
    { id: "STF-003", name: "Dhan Bahadur Magar", designation: "Transport & Fleet In-Charge", department: "Operations", phone: "+977 98410 99883", salary: 45000, status: "Active", attendance: "99.0%" },
    { id: "STF-004", name: "Sister Rita Tamang", designation: "Senior Staff Nurse", department: "School Infirmary", phone: "+977 98410 99884", salary: 48000, status: "Active", attendance: "99.2%" },
    { id: "STF-005", name: "Rameshwor Maharjan", designation: "Senior Science Lab Specialist", department: "Laboratories", phone: "+977 98410 99885", salary: 42000, status: "Active", attendance: "96.0%" }
  ];

  // Fee Structure & Collection Records (In NPR)
  const feeRecords = [
    {
      invoiceNo: "INV-2083-0891",
      studentId: "KVSS-2083-001",
      studentName: "Aarav Shrestha",
      class: "Class 10-A (SEE)",
      quarter: "Quarter 2 (Shrawan - Ashwin 2083)",
      tuitionFee: 18000,
      transportFee: 4500,
      labFee: 2000,
      activityFee: 1500,
      totalAmount: 26000,
      discount: 1000,
      fine: 0,
      netPayable: 25000,
      paidAmount: 25000,
      status: "Paid",
      paymentDate: "2026-08-15",
      paymentMode: "eSewa Wallet (Digital Pay)",
      transactionId: "ESEWA/9928172630/NP",
      receiptNo: "REC-2083-4412"
    },
    {
      invoiceNo: "INV-2083-0892",
      studentId: "KVSS-2083-002",
      studentName: "Diya Shakya",
      class: "Class 10-A (SEE)",
      quarter: "Quarter 2 (Shrawan - Ashwin 2083)",
      tuitionFee: 18000,
      transportFee: 4500,
      labFee: 2000,
      activityFee: 1500,
      totalAmount: 26000,
      discount: 0,
      fine: 500,
      netPayable: 26500,
      paidAmount: 18000,
      status: "Partial",
      paymentDate: "2026-08-20",
      paymentMode: "Khalti Wallet",
      transactionId: "KHALTI/44810291/CLEARED",
      receiptNo: "REC-2083-4413"
    },
    {
      invoiceNo: "INV-2083-0893",
      studentId: "KVSS-2083-003",
      studentName: "Vihaan Poudel",
      class: "Class 10-A (SEE)",
      quarter: "Quarter 2 (Shrawan - Ashwin 2083)",
      tuitionFee: 18000,
      transportFee: 4500,
      labFee: 2000,
      activityFee: 1500,
      totalAmount: 26000,
      discount: 0,
      fine: 1500,
      netPayable: 27500,
      paidAmount: 0,
      status: "Overdue",
      paymentDate: null,
      paymentMode: null,
      transactionId: null,
      receiptNo: null
    },
    {
      invoiceNo: "INV-2083-0894",
      studentId: "KVSS-2083-004",
      studentName: "Ananya Thapa",
      class: "Class 9-B",
      quarter: "Quarter 2 (Shrawan - Ashwin 2083)",
      tuitionFee: 16500,
      transportFee: 4000,
      labFee: 1800,
      activityFee: 1200,
      totalAmount: 23500,
      discount: 1500,
      fine: 0,
      netPayable: 22000,
      paidAmount: 22000,
      status: "Paid",
      paymentDate: "2026-08-10",
      paymentMode: "ConnectIPS (Nabil Bank A/C)",
      transactionId: "CIPS/NABIL/8821901",
      receiptNo: "REC-2083-4414"
    }
  ];

  // NEB SEE Report Card for Aarav Shrestha
  const reportCardAarav = {
    school: schoolProfile,
    student: {
      name: "Aarav Shrestha",
      nepaliName: "आरव श्रेष्ठ",
      rollNo: "01",
      admissionNo: "ADM-2078-1001",
      nebSymbolNo: "02701429A",
      class: "Class 10 (SEE)",
      section: "A",
      fatherName: "Mr. Rajesh Shrestha",
      motherName: "Dr. Anjali Shrestha",
      dob: "2067-01-12 BS (2010 AD)",
      house: "Sagarmatha House",
      academicYear: "2083-84 BS (2026-27 AD)",
      attendanceTerm: "118 / 122 Days (96.8%)"
    },
    subjects: [
      { code: "NEP-101", name: "अनिवार्य नेपाली (Compulsory Nepali)", creditHour: 4, theoryTh: 68, practicalPr: 24, total: 92, grade: "A+", gradePoint: 4.0 },
      { code: "ENG-102", name: "Compulsory English", creditHour: 4, theoryTh: 71, practicalPr: 24, total: 95, grade: "A+", gradePoint: 4.0 },
      { code: "MTH-103", name: "Compulsory Mathematics", creditHour: 5, theoryTh: 74, practicalPr: 25, total: 99, grade: "A+", gradePoint: 4.0 },
      { code: "SCI-104", name: "Science and Technology (विज्ञान तथा प्रविधि)", creditHour: 5, theoryTh: 72, practicalPr: 24, total: 96, grade: "A+", gradePoint: 4.0 },
      { code: "SOC-105", name: "Social Studies & Human Values (सामाजिक अध्ययन)", creditHour: 4, theoryTh: 67, practicalPr: 23, total: 90, grade: "A+", gradePoint: 4.0 },
      { code: "OPM-106", name: "Optional I: Additional Mathematics", creditHour: 4, theoryTh: 70, practicalPr: 24, total: 94, grade: "A+", gradePoint: 4.0 },
      { code: "CSC-107", name: "Optional II: Computer Science & AI", creditHour: 4, theoryTh: 48, practicalPr: 49, total: 97, grade: "A+", gradePoint: 4.0 }
    ],
    gpa: "3.92",
    aggregateScore: "663 / 700 (94.7%)",
    resultRank: "1st in Class 10-A (School Topper)",
    division: "Distinction (A+)",
    remarks: "Aarav possesses exceptional intellectual acumen, scientific reasoning, and moral discipline. Outstanding prospect for National SEE Examinations.",
    classTeacher: "Mrs. Sunita Shrestha",
    principal: "Prof. Dr. Ram Bahadur Thapa",
    issueDate: "30 Bhadra 2083 (15 Sep 2026)"
  };

  // Timetable for Class 10-A
  const timetableClass10 = {
    class: "Class 10-A (SEE)",
    room: "Room 304, Senior Wing",
    classTeacher: "Mrs. Sunita Shrestha",
    periods: [
      { id: "P1", time: "10:00 - 10:45 AM", name: "Period 1" },
      { id: "P2", time: "10:45 - 11:30 AM", name: "Period 2" },
      { id: "ASS", time: "11:30 - 11:45 AM", name: "National Anthem & Value Talk", isBreak: true },
      { id: "P3", time: "11:45 - 12:30 PM", name: "Period 3" },
      { id: "P4", time: "12:30 - 01:15 PM", name: "Period 4" },
      { id: "LUN", time: "01:15 - 01:50 PM", name: "Tiffin / Lunch Break", isBreak: true },
      { id: "P5", time: "01:50 - 02:35 PM", name: "Period 5" },
      { id: "P6", time: "02:35 - 03:20 PM", name: "Period 6" },
      { id: "P7", time: "03:20 - 04:00 PM", name: "Period 7" }
    ],
    schedule: {
      "Sunday": [
        { subject: "Compulsory Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Physics (Science)", teacher: "Prof. Dr. Ram Thapa", room: "Lab 1", tag: "science" },
        { subject: "Compulsory English", teacher: "Mrs. Ananya Bhattarai", room: "304", tag: "lang" },
        { subject: "अनिवार्य नेपाली", teacher: "Pt. Dilli Dahal", room: "304", tag: "lang" },
        { subject: "Optional Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Computer Science & AI", teacher: "Mr. Bikram Gurung", room: "IT Lab", tag: "tech" },
        { subject: "Social Studies", teacher: "Mr. Deepak Karki", room: "304", tag: "social" }
      ],
      "Monday": [
        { subject: "Chemistry (Science)", teacher: "Mr. Rajesh Adhikari", room: "Chem Lab", tag: "science" },
        { subject: "Compulsory Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "अनिवार्य नेपाली", teacher: "Pt. Dilli Dahal", room: "304", tag: "lang" },
        { subject: "Compulsory English", teacher: "Mrs. Ananya Bhattarai", room: "304", tag: "lang" },
        { subject: "Social Studies", teacher: "Mr. Deepak Karki", room: "304", tag: "social" },
        { subject: "Optional Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Library & Research", teacher: "Ms. Meena Shakya", room: "Library", tag: "library" }
      ],
      "Tuesday": [
        { subject: "Compulsory Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Biology (Science)", teacher: "Dr. Hemant Joshi", room: "Bio Lab", tag: "science" },
        { subject: "Compulsory English", teacher: "Mrs. Ananya Bhattarai", room: "304", tag: "lang" },
        { subject: "Computer Science & AI", teacher: "Mr. Bikram Gurung", room: "IT Lab", tag: "tech" },
        { subject: "Social Studies", teacher: "Mr. Deepak Karki", room: "304", tag: "social" },
        { subject: "अनिवार्य नेपाली", teacher: "Pt. Dilli Dahal", room: "304", tag: "lang" },
        { subject: "Physical Education & Games", teacher: "Coach Dhan Magar", room: "Ground", tag: "sports" }
      ],
      "Wednesday": [
        { subject: "Physics (Science)", teacher: "Prof. Dr. Ram Thapa", room: "Lab 1", tag: "science" },
        { subject: "Compulsory Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Optional Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Compulsory English", teacher: "Mrs. Ananya Bhattarai", room: "304", tag: "lang" },
        { subject: "Social Studies", teacher: "Mr. Deepak Karki", room: "304", tag: "social" },
        { subject: "Chemistry (Science)", teacher: "Mr. Rajesh Adhikari", room: "304", tag: "science" },
        { subject: "House Club & Debate", teacher: "Mrs. Ananya Bhattarai", room: "Hall", tag: "club" }
      ],
      "Thursday": [
        { subject: "Compulsory Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Biology (Science)", teacher: "Dr. Hemant Joshi", room: "Bio Lab", tag: "science" },
        { subject: "Computer Science & AI", teacher: "Mr. Bikram Gurung", room: "IT Lab", tag: "tech" },
        { subject: "अनिवार्य नेपाली", teacher: "Pt. Dilli Dahal", room: "304", tag: "lang" },
        { subject: "Optional Math", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "math" },
        { subject: "Compulsory English", teacher: "Mrs. Ananya Bhattarai", room: "304", tag: "lang" },
        { subject: "SEE Revision Clinic", teacher: "Mrs. Sunita Shrestha", room: "304", tag: "review" }
      ],
      "Friday": [
        { subject: "Weekly Mock Test (SEE Pattern)", teacher: "Exam Dept", room: "304", tag: "review" },
        { subject: "Weekly Mock Test (Science)", teacher: "Science Dept", room: "304", tag: "review" },
        { subject: "Co-Curricular / ECA Competition", teacher: "ECA Head", room: "Auditorium", tag: "club" },
        { subject: "Music & Cultural Arts", teacher: "Mr. Subash Rai", room: "Music Room", tag: "arts" },
        { subject: "Clean Campus Initiative", teacher: "House Captains", room: "Ground", tag: "break" },
        { subject: "Early Dispersal (02:30 PM)", teacher: "Staff", room: "-", tag: "break" },
        { subject: "-", teacher: "-", room: "-", tag: "-" }
      ]
    }
  };

  // Homework Records
  const homeworkList = [
    {
      id: "HW-101",
      title: "SEE Model Problems: Quadratic Equations & Circle Theorems",
      subject: "Compulsory Mathematics",
      class: "Class 10-A (SEE)",
      teacher: "Mrs. Sunita Shrestha",
      assignedDate: "22 Bhadra 2083",
      dueDate: "26 Bhadra 2083",
      totalStudents: 42,
      submitted: 39,
      pending: 3,
      status: "Active",
      description: "Solve CDC Curriculum Chapter 4 Exercises 4.2 & 4.3 in math registers. Prepare for Friday mock quiz."
    },
    {
      id: "HW-102",
      title: "Lab Practical: Ohm's Law Verification & Equivalent Resistance",
      subject: "Science & Technology",
      class: "Class 10-A (SEE)",
      teacher: "Prof. Dr. Ram Thapa",
      assignedDate: "20 Bhadra 2083",
      dueDate: "25 Bhadra 2083",
      totalStudents: 42,
      submitted: 41,
      pending: 1,
      status: "Active",
      description: "Plot V-I linear curve on graph sheet and determine circuit resistance with error analysis."
    },
    {
      id: "HW-103",
      title: "व्याकरण अभ्यास: पदवर्ग पहिचान र वाक्य संश्लेषण",
      subject: "अनिवार्य नेपाली",
      class: "Class 10-A (SEE)",
      teacher: "Pt. Dilli Dahal",
      assignedDate: "19 Bhadra 2083",
      dueDate: "24 Bhadra 2083",
      totalStudents: 42,
      submitted: 42,
      pending: 0,
      status: "Evaluated",
      description: "पाठ्यपुस्तक पाठ ५ बाट २५ वटा नाम, सर्वनाम र विशेषण पहिचान गरी लेख्नुहोस्।"
    }
  ];

  // School Notices & Circulars
  const notices = [
    {
      id: "NOT-2083-042",
      title: "Schedule for First Terminal Examination & SEE Model Test 2083",
      category: "Academic / Exam",
      audience: "Students & Parents",
      publishedDate: "20 Bhadra 2083 (05 Sep 2026)",
      author: "Examination Controller",
      status: "Active",
      views: 1420,
      content: "The First Terminal Examination for Classes 1 to 12 commences on 28th Ashwin 2083. Class 10 candidates will appear for SEE mock blueprint papers. Full marks: 75 Theory + 25 Practical."
    },
    {
      id: "NOT-2083-041",
      title: "Quarter 2 Fee Settlement Notice & eSewa/Khalti Online Clearance",
      category: "Finance",
      audience: "Parents",
      publishedDate: "15 Bhadra 2083",
      author: "Accounts Department",
      status: "Urgent",
      views: 1890,
      content: "Parents who have pending dues for Quarter 2 are kindly requested to clear them before 30th Bhadra. Online payments via eSewa, Khalti, and ConnectIPS are available with instant digital receipt."
    },
    {
      id: "NOT-2083-040",
      title: "Inter-School Science, Robotics & AI Conclave 'Valley Innovate 2083'",
      category: "Event",
      audience: "All School",
      publishedDate: "10 Bhadra 2083",
      author: "IT Department",
      status: "Active",
      views: 1120,
      content: "KVSS is proud to host 28 Valley schools for the Drone Simulator and AI Innovation Arena on 12th Ashwin 2083. Contact Mr. Bikram Gurung for registrations."
    }
  ];

  return {
    platform,
    schoolProfile,
    classesList,
    sectionsList,
    students,
    teachers,
    staff,
    feeRecords,
    reportCardAarav,
    timetableClass10,
    homeworkList,
    notices
  };
})();
