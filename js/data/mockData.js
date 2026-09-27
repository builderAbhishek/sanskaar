// Sanskaar Digital School ERP - Mock Database (Indian School Context)
window.ERP_DATA = (function() {
  const schoolProfile = {
    name: "Sanskaar International School",
    tagline: "Empowering Minds, Nurturing Values",
    affiliation: "CBSE Affiliated • Reg. No. CBSE/AFF/2130894",
    schoolCode: "71204",
    board: "Central Board of Secondary Education (CBSE)",
    founded: "2008",
    address: "Plot 42, Institutional Area, Knowledge Park II, Greater Noida, UP - 201310",
    phone: "+91 120 489 2300 / +91 98180 44219",
    email: "info@sanskaarschool.edu.in",
    website: "https://sanskaarschool.edu.in",
    principal: "Dr. Arvind Sharma, M.Sc., M.Ed., Ph.D.",
    currentSession: "2026-2027",
    currency: "₹"
  };

  const firstNamesBoy = ["Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Advait", "Kabir", "Rohan", "Ishaan", "Aryan", "Reyansh", "Atharv", "Dhruv", "Shaurya", "Dev", "Samar", "Arjun", "Krishna", "Manav", "Ayush", "Tejas", "Tanmay", "Raghav", "Yash", "Aditya"];
  const firstNamesGirl = ["Diya", "Saanvi", "Aanya", "Ananya", "Isha", "Riya", "Myra", "Navya", "Tanvi", "Meera", "Avani", "Kavya", "Prisha", "Khushi", "Shruti", "Sneha", "Aditi", "Pooja", "Priya", "Simran", "Tara", "Anika", "Bhavna", "Divya", "Gauri"];
  const lastNames = ["Sharma", "Verma", "Gupta", "Patel", "Mehra", "Joshi", "Singh", "Sengupta", "Roy", "Das", "Rao", "Bhatt", "Malhotra", "Iyer", "Kapoor", "Saxena", "Tiwari", "Chopra", "Choudhury", "Mishra", "Pandey", "Agarwal", "Bansal", "Kulkarni", "Deshmukh"];
  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-"];
  const houses = ["Tagore", "Ashoka", "Shivaji", "Raman"];
  const classesList = ["Nursery", "KG", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X", "Class XI", "Class XII"];
  const sectionsList = ["A", "B", "C"];

  // Generate 105 realistic students
  const students = [];
  let idCounter = 1;

  for (let cIdx = 0; cIdx < classesList.length; cIdx++) {
    const cls = classesList[cIdx];
    const isHighSchool = ["Class IX", "Class X", "Class XI", "Class XII"].includes(cls);
    
    for (let sIdx = 0; sIdx < 3; sIdx++) {
      const sec = sectionsList[sIdx];
      // Generate 2-3 students per class section
      const count = (cIdx === 11 || cIdx === 10) ? 4 : 2; // more students in class 10 & 9 for demo
      
      for (let k = 0; k < count; k++) {
        const isBoy = (idCounter % 2 === 1);
        const fName = isBoy ? firstNamesBoy[(idCounter * 3) % firstNamesBoy.length] : firstNamesGirl[(idCounter * 7) % firstNamesGirl.length];
        const lName = lastNames[(idCounter * 5) % lastNames.length];
        const fullName = `${fName} ${lName}`;
        const rollNo = (k + 1).toString().padStart(2, '0');
        const studentId = `STU-2026-${idCounter.toString().padStart(3, '0')}`;
        const phone = `+91 ${9810000000 + (idCounter * 12347) % 89999999}`;
        const fatherName = `Rajesh ${lName}`;
        const motherName = `Sunita ${lName}`;
        const feeStatusList = ["Paid", "Paid", "Paid", "Partial", "Overdue"];
        const feeStatus = feeStatusList[idCounter % feeStatusList.length];
        const attendance = 72 + ((idCounter * 13) % 27); // between 72% and 99%
        const balance = feeStatus === "Paid" ? 0 : (feeStatus === "Partial" ? 7500 : 21000);
        const house = houses[idCounter % houses.length];
        const bg = bloodGroups[idCounter % bloodGroups.length];
        
        students.push({
          id: studentId,
          rollNo: rollNo,
          name: fullName,
          gender: isBoy ? "Male" : "Female",
          class: cls,
          section: sec,
          admissionNo: `ADM-${2020 + (cIdx % 6)}-${1000 + idCounter}`,
          admissionYear: 2022 + (idCounter % 4),
          dob: "2010-08-15",
          bloodGroup: bg,
          house: house,
          fatherName: fatherName,
          motherName: motherName,
          parentPhone: phone,
          email: `${fName.toLowerCase()}.${studentId.toLowerCase()}@sanskaarschool.edu.in`,
          address: `Flat ${101 + idCounter}, Block ${String.fromCharCode(65 + (idCounter % 6))}, Express Green Heights, Sector 14, Noida`,
          transportRoute: (idCounter % 4 === 0) ? "Self / Walk" : `Bus Route #${(idCounter % 8) + 1} (Alpha-Beta-Gamma Route)`,
          attendancePct: attendance,
          feeStatus: feeStatus,
          feeDue: balance,
          status: "Active",
          cgpa: (7.2 + ((idCounter * 7) % 28) / 10).toFixed(1),
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

  // Primary student for deep profile / parent portal demo
  students[0] = {
    ...students[0],
    id: "STU-2026-001",
    name: "Aarav Sharma",
    rollNo: "01",
    class: "Class X",
    section: "A",
    admissionNo: "ADM-2020-1001",
    gender: "Male",
    admissionYear: 2020,
    dob: "2010-04-12",
    bloodGroup: "B+",
    house: "Tagore",
    fatherName: "Mr. Rajesh Sharma (Sr. Software Architect)",
    motherName: "Dr. Anjali Sharma (Pediatrician)",
    parentPhone: "+91 98112 34567",
    email: "aarav.sharma@sanskaarschool.edu.in",
    address: "Villa 14, Lotus Boulevard, Sector 100, Noida, UP - 201304",
    transportRoute: "Bus Route #04 (Sector 100 Express)",
    attendancePct: 96.4,
    feeStatus: "Paid",
    feeDue: 0,
    status: "Active",
    cgpa: "9.6",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  };

  // Ensure an overdue and partial student in top list for testing
  students[1] = {
    ...students[1],
    id: "STU-2026-002",
    name: "Diya Patel",
    rollNo: "02",
    class: "Class X",
    section: "A",
    admissionNo: "ADM-2020-1002",
    gender: "Female",
    attendancePct: 92.0,
    feeStatus: "Partial",
    feeDue: 8500,
    house: "Ashoka"
  };

  students[2] = {
    ...students[2],
    id: "STU-2026-003",
    name: "Vihaan Verma",
    rollNo: "03",
    class: "Class X",
    section: "A",
    admissionNo: "ADM-2020-1003",
    gender: "Male",
    attendancePct: 73.5, // Low attendance trigger for AI insight
    feeStatus: "Overdue",
    feeDue: 24000,
    house: "Shivaji"
  };

  // Teachers Database (24 comprehensive staff)
  const teachers = [
    {
      id: "TCH-001",
      name: "Dr. Arvind Sharma",
      designation: "Principal & PGT Physics",
      department: "Science",
      qualification: "M.Sc. Physics, Ph.D., B.Ed.",
      experience: "21 Years",
      phone: "+91 98180 44219",
      email: "principal@sanskaarschool.edu.in",
      joiningDate: "2012-04-01",
      assignedClasses: ["Class XII-A", "Class XI-A"],
      subjects: ["Physics", "Applied Mechanics"],
      salary: 115000,
      status: "Active",
      attendance: "98.5%",
      leaveBalance: { casual: 8, medical: 10, earned: 14 },
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-002",
      name: "Mrs. Sunita Rao",
      designation: "HOD Mathematics & PGT",
      department: "Mathematics",
      qualification: "M.Sc. Applied Mathematics, B.Ed.",
      experience: "15 Years",
      phone: "+91 98711 22340",
      email: "sunita.rao@sanskaarschool.edu.in",
      joiningDate: "2015-06-15",
      assignedClasses: ["Class X-A", "Class XII-B"],
      subjects: ["Mathematics", "Calculus & Geometry"],
      salary: 82000,
      status: "Active",
      attendance: "96.0%",
      leaveBalance: { casual: 6, medical: 8, earned: 12 },
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-003",
      name: "Mr. Rajesh Verma",
      designation: "PGT Chemistry",
      department: "Science",
      qualification: "M.Sc. Organic Chemistry, B.Ed.",
      experience: "12 Years",
      phone: "+91 98990 11456",
      email: "rajesh.verma@sanskaarschool.edu.in",
      joiningDate: "2017-07-10",
      assignedClasses: ["Class IX-A", "Class X-A", "Class XI-B"],
      subjects: ["Chemistry", "Science"],
      salary: 76000,
      status: "Active",
      attendance: "94.2%",
      leaveBalance: { casual: 7, medical: 9, earned: 10 },
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-004",
      name: "Mrs. Ananya Sen",
      designation: "HOD English & PGT",
      department: "Humanities & Languages",
      qualification: "M.A. English Literature (Gold Medalist), B.Ed.",
      experience: "14 Years",
      phone: "+91 99102 33455",
      email: "ananya.sen@sanskaarschool.edu.in",
      joiningDate: "2016-04-01",
      assignedClasses: ["Class X-A", "Class X-B", "Class XII-A"],
      subjects: ["English Language & Literature", "Creative Writing"],
      salary: 78000,
      status: "Active",
      attendance: "97.1%",
      leaveBalance: { casual: 9, medical: 10, earned: 15 },
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-005",
      name: "Mr. Vikramaditya Singh",
      designation: "HOD Computer Science & AI",
      department: "Information Technology",
      qualification: "M.Tech CSE, B.Tech, MCA",
      experience: "10 Years",
      phone: "+91 98119 55678",
      email: "vikram.singh@sanskaarschool.edu.in",
      joiningDate: "2019-03-01",
      assignedClasses: ["Class IX-A", "Class X-A", "Class XI-A", "Class XII-A"],
      subjects: ["Artificial Intelligence", "Python Programming", "Computer Applications"],
      salary: 85000,
      status: "Active",
      attendance: "99.0%",
      leaveBalance: { casual: 10, medical: 10, earned: 18 },
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-006",
      name: "Mrs. Priya Nambiar",
      designation: "TGT Social Science",
      department: "Social Sciences",
      qualification: "M.A. History, B.Ed.",
      experience: "9 Years",
      phone: "+91 98223 44556",
      email: "priya.nambiar@sanskaarschool.edu.in",
      joiningDate: "2019-07-15",
      assignedClasses: ["Class VIII-A", "Class IX-A", "Class X-A"],
      subjects: ["History & Civics", "Geography"],
      salary: 68000,
      status: "Active",
      attendance: "95.5%",
      leaveBalance: { casual: 5, medical: 8, earned: 10 },
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-007",
      name: "Dr. Hemant Joshi",
      designation: "PGT Biology",
      department: "Science",
      qualification: "Ph.D. Botany, M.Sc. Life Sciences",
      experience: "16 Years",
      phone: "+91 98334 55667",
      email: "hemant.joshi@sanskaarschool.edu.in",
      joiningDate: "2014-08-01",
      assignedClasses: ["Class X-A", "Class XI-A", "Class XII-A"],
      subjects: ["Biology", "Biotechnology"],
      salary: 80000,
      status: "Active",
      attendance: "93.8%",
      leaveBalance: { casual: 4, medical: 7, earned: 8 },
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "TCH-008",
      name: "Coach Gurpreet Singh",
      designation: "Director of Physical Education & Sports",
      department: "Sports & Fitness",
      qualification: "M.P.Ed., NIS Certified Athletic Coach",
      experience: "13 Years",
      phone: "+91 98445 66778",
      email: "sports@sanskaarschool.edu.in",
      joiningDate: "2018-05-10",
      assignedClasses: ["All Classes", "House Coordinator"],
      subjects: ["Physical Education", "Athletics", "Cricket Coaching"],
      salary: 72000,
      status: "Active",
      attendance: "99.2%",
      leaveBalance: { casual: 8, medical: 10, earned: 12 },
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
    }
  ];

  // Non-teaching staff
  const staff = [
    { id: "STF-001", name: "Suresh Chandra Gupta", designation: "Chief Accountant", department: "Accounts & Finance", phone: "+91 98110 99881", salary: 65000, status: "Active", attendance: "97.5%" },
    { id: "STF-002", name: "Meenakshi Sundaram", designation: "Chief Librarian", department: "Library", phone: "+91 98110 99882", salary: 52000, status: "Active", attendance: "96.0%" },
    { id: "STF-003", name: "Dharmendra Singh Yadav", designation: "Transport & Fleet Supervisor", department: "Operations", phone: "+91 98110 99883", salary: 45000, status: "Active", attendance: "98.0%" },
    { id: "STF-004", name: "Sister Maria Fernandez", designation: "Resident Medical Officer / Nurse", department: "Infirmary", phone: "+91 98110 99884", salary: 48000, status: "Active", attendance: "99.0%" },
    { id: "STF-005", name: "Satish Kumar Rawat", designation: "Senior Science Lab In-Charge", department: "Laboratories", phone: "+91 98110 99885", salary: 42000, status: "Active", attendance: "95.5%" },
    { id: "STF-006", name: "Pooja Malhotra", designation: "Front Desk & Admissions Counselor", department: "Administration", phone: "+91 98110 99886", salary: 38000, status: "Active", attendance: "98.8%" }
  ];

  // Fee Structure & Collection Ledger
  const feeRecords = [
    {
      invoiceNo: "INV-2026-0891",
      studentId: "STU-2026-001",
      studentName: "Aarav Sharma",
      class: "Class X-A",
      quarter: "Quarter 2 (Jul - Sep 2026)",
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
      paymentDate: "2026-07-08",
      paymentMode: "UPI (Google Pay)",
      transactionId: "UPI/260708119023/OKAXIS",
      receiptNo: "REC-2026-4412"
    },
    {
      invoiceNo: "INV-2026-0892",
      studentId: "STU-2026-002",
      studentName: "Diya Patel",
      class: "Class X-A",
      quarter: "Quarter 2 (Jul - Sep 2026)",
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
      paymentDate: "2026-07-15",
      paymentMode: "Net Banking (HDFC)",
      transactionId: "NEFT/HDFC/992817263",
      receiptNo: "REC-2026-4413"
    },
    {
      invoiceNo: "INV-2026-0893",
      studentId: "STU-2026-003",
      studentName: "Vihaan Verma",
      class: "Class X-A",
      quarter: "Quarter 2 (Jul - Sep 2026)",
      tuitionFee: 18000,
      transportFee: 0,
      labFee: 2000,
      activityFee: 1500,
      totalAmount: 21500,
      discount: 0,
      fine: 1500,
      netPayable: 23000,
      paidAmount: 0,
      status: "Overdue",
      paymentDate: null,
      paymentMode: null,
      transactionId: null,
      receiptNo: null
    },
    {
      invoiceNo: "INV-2026-0894",
      studentId: "STU-2026-004",
      studentName: "Ananya Gupta",
      class: "Class IX-B",
      quarter: "Quarter 2 (Jul - Sep 2026)",
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
      paymentDate: "2026-07-04",
      paymentMode: "UPI (PhonePe)",
      transactionId: "UPI/260704981122/YBL",
      receiptNo: "REC-2026-4414"
    },
    {
      invoiceNo: "INV-2026-0895",
      studentId: "STU-2026-005",
      studentName: "Rohan Mehra",
      class: "Class XII-A",
      quarter: "Quarter 2 (Jul - Sep 2026)",
      tuitionFee: 21000,
      transportFee: 5000,
      labFee: 3500,
      activityFee: 2000,
      totalAmount: 31500,
      discount: 0,
      fine: 0,
      netPayable: 31500,
      paidAmount: 31500,
      status: "Paid",
      paymentDate: "2026-07-02",
      paymentMode: "Bank Cheque (#410291 SBI)",
      transactionId: "CHQ/410291/CLEARED",
      receiptNo: "REC-2026-4415"
    },
    {
      invoiceNo: "INV-2026-0896",
      studentId: "STU-2026-006",
      studentName: "Ishaan Joshi",
      class: "Class VIII-A",
      quarter: "Quarter 2 (Jul - Sep 2026)",
      tuitionFee: 15000,
      transportFee: 4200,
      labFee: 1500,
      activityFee: 1200,
      totalAmount: 21900,
      discount: 0,
      fine: 0,
      netPayable: 21900,
      paidAmount: 0,
      status: "Pending",
      paymentDate: null,
      paymentMode: null,
      transactionId: null,
      receiptNo: null
    },
    {
      invoiceNo: "INV-2026-0897",
      studentId: "STU-2026-007",
      studentName: "Priya Nair",
      class: "Class XI-B",
      quarter: "Quarter 2 (Jul - Sep 2026)",
      tuitionFee: 20000,
      transportFee: 4800,
      labFee: 3000,
      activityFee: 1500,
      totalAmount: 29300,
      discount: 2000,
      fine: 0,
      netPayable: 27300,
      paidAmount: 27300,
      status: "Paid",
      paymentDate: "2026-07-09",
      paymentMode: "Cash (Receipt at Counter)",
      transactionId: "CASH/CTR/2026/089",
      receiptNo: "REC-2026-4416"
    }
  ];

  // Daily Class Attendance Matrix (Today's Date: 10 Sep 2026)
  const todayAttendance = {
    date: "10 September 2026",
    totalEnrolled: 1482,
    totalPresent: 1402,
    totalAbsent: 56,
    totalLate: 14,
    totalLeave: 10,
    overallPercentage: 94.6,
    classWise: [
      { class: "Class XII", present: 96, absent: 4, pct: 96.0 },
      { class: "Class XI", present: 108, absent: 7, pct: 93.9 },
      { class: "Class X", present: 132, absent: 5, pct: 96.3 },
      { class: "Class IX", present: 128, absent: 8, pct: 94.1 },
      { class: "Class VIII", present: 135, absent: 4, pct: 97.1 },
      { class: "Class VII", present: 129, absent: 6, pct: 95.5 },
      { class: "Class VI", present: 134, absent: 5, pct: 96.4 },
      { class: "Class V", present: 126, absent: 4, pct: 96.9 },
      { class: "Class IV", present: 118, absent: 5, pct: 95.9 },
      { class: "Class III", present: 110, absent: 3, pct: 97.3 },
      { class: "Class II", present: 98, absent: 3, pct: 97.0 },
      { class: "Class I", present: 94, absent: 2, pct: 97.9 }
    ]
  };

  // Class X-A Live Attendance Sheet (for the interactive attendance marking UI)
  const classXAttendance = [
    { rollNo: "01", id: "STU-2026-001", name: "Aarav Sharma", status: "P", remark: "On time" },
    { rollNo: "02", id: "STU-2026-002", name: "Diya Patel", status: "P", remark: "On time" },
    { rollNo: "03", id: "STU-2026-003", name: "Vihaan Verma", status: "A", remark: "Informed sick leave" },
    { rollNo: "04", id: "STU-2026-004", name: "Ananya Gupta", status: "P", remark: "On time" },
    { rollNo: "05", id: "STU-2026-005", name: "Rohan Mehra", status: "L", remark: "Bus delayed 10m" },
    { rollNo: "06", id: "STU-2026-006", name: "Ishaan Joshi", status: "P", remark: "On time" },
    { rollNo: "07", id: "STU-2026-007", name: "Priya Nair", status: "P", remark: "On time" },
    { rollNo: "08", id: "STU-2026-008", name: "Kabir Singh", status: "P", remark: "On time" },
    { rollNo: "09", id: "STU-2026-009", name: "Riya Sengupta", status: "HD", remark: "Doctor appointment 12pm" },
    { rollNo: "10", id: "STU-2026-010", name: "Aryan Roy", status: "P", remark: "On time" },
    { rollNo: "11", id: "STU-2026-011", name: "Saanvi Das", status: "LV", remark: "Family function approved" },
    { rollNo: "12", id: "STU-2026-012", name: "Advait Rao", status: "P", remark: "On time" }
  ];

  // Examination Data & Report Card Mockup
  const exams = [
    {
      id: "EXAM-2026-01",
      title: "CBSE Mid-Term / Periodic Test II (2026-27)",
      session: "2026-2027",
      startDate: "2026-09-22",
      endDate: "2026-09-30",
      classes: "Classes IX to XII",
      status: "Upcoming",
      totalSubjects: 6,
      maxMarks: 80
    },
    {
      id: "EXAM-2026-02",
      title: "Term 1 / Half-Yearly Examination",
      session: "2026-2027",
      startDate: "2026-07-15",
      endDate: "2026-07-28",
      classes: "Classes I to XII",
      status: "Completed & Published",
      totalSubjects: 6,
      maxMarks: 100
    },
    {
      id: "EXAM-2026-03",
      title: "Pre-Board Examination I (Class X & XII)",
      session: "2026-2027",
      startDate: "2026-11-18",
      endDate: "2026-11-28",
      classes: "Classes X, XII",
      status: "Scheduled",
      totalSubjects: 5,
      maxMarks: 80
    }
  ];

  // Detailed Report Card record for Aarav Sharma (Class X-A)
  const reportCardAarav = {
    school: schoolProfile,
    student: {
      name: "Aarav Sharma",
      rollNo: "01",
      admissionNo: "ADM-2020-1001",
      cbseRollNo: "14689201",
      class: "Class X",
      section: "A",
      fatherName: "Mr. Rajesh Sharma",
      motherName: "Dr. Anjali Sharma",
      dob: "12 April 2010",
      house: "Tagore House",
      academicYear: "2026-2027",
      attendanceTerm: "118 / 122 Days (96.7%)"
    },
    scholasticMarks: [
      { code: "184", subject: "English Language & Literature", term1Theory: 74, term1Internal: 19, total: 93, grade: "A1", gp: 10 },
      { code: "085", subject: "Hindi Course - A", term1Theory: 69, term1Internal: 18, total: 87, grade: "A2", gp: 9 },
      { code: "041", subject: "Mathematics (Standard)", term1Theory: 77, term1Internal: 20, total: 97, grade: "A1", gp: 10 },
      { code: "086", subject: "Science (Physics, Chem, Bio)", term1Theory: 76, term1Internal: 19, total: 95, grade: "A1", gp: 10 },
      { code: "087", subject: "Social Science", term1Theory: 71, term1Internal: 19, total: 90, grade: "A1", gp: 10 },
      { code: "417", subject: "Artificial Intelligence (Skill Subject)", term1Theory: 48, term1Internal: 50, total: 98, grade: "A1", gp: 10 }
    ],
    coScholastic: [
      { area: "Work Education / Pre-Vocational", grade: "A" },
      { area: "Art Education", grade: "A" },
      { area: "Health & Physical Education", grade: "A" },
      { area: "Discipline & Value Orientation", grade: "A" }
    ],
    aggregateMarks: "560 / 600",
    percentage: "93.3%",
    cgpa: "9.8",
    classRank: "1st in Class X-A",
    remarks: "Aarav is an exceptionally inquisitive and conscientious student. Shows extraordinary mathematical rigor, problem-solving prowess, and team leadership. Promoted with Honors.",
    classTeacher: "Mrs. Sunita Rao, M.Sc., B.Ed.",
    principal: "Dr. Arvind Sharma, Ph.D.",
    issueDate: "30 July 2026"
  };

  // Timetable Matrix for Class X-A
  const timetableClassX = {
    class: "Class X-A",
    room: "Room 304, Senior Block",
    classTeacher: "Mrs. Sunita Rao",
    periods: [
      { id: "P1", time: "08:00 - 08:45 AM", name: "Period 1" },
      { id: "P2", time: "08:45 - 09:30 AM", name: "Period 2" },
      { id: "ASS", time: "09:30 - 09:50 AM", name: "Morning Assembly & Value Talk", isBreak: true },
      { id: "P3", time: "09:50 - 10:35 AM", name: "Period 3" },
      { id: "P4", time: "10:35 - 11:20 AM", name: "Period 4" },
      { id: "LUN", time: "11:20 - 11:55 AM", name: "Recess / Nutrition Break", isBreak: true },
      { id: "P5", time: "11:55 - 12:40 PM", name: "Period 5" },
      { id: "P6", time: "12:40 - 01:25 PM", name: "Period 6" },
      { id: "P7", time: "01:25 - 02:10 PM", name: "Period 7" }
    ],
    schedule: {
      "Monday": [
        { subject: "Mathematics", teacher: "Mrs. Sunita Rao", room: "304", tag: "math" },
        { subject: "Physics", teacher: "Dr. Arvind Sharma", room: "Physics Lab", tag: "science" },
        { subject: "Chemistry", teacher: "Mr. Rajesh Verma", room: "Chem Lab", tag: "science" },
        { subject: "English", teacher: "Mrs. Ananya Sen", room: "304", tag: "lang" },
        { subject: "Social Science", teacher: "Mrs. Priya Nambiar", room: "304", tag: "social" },
        { subject: "Artificial Intelligence", teacher: "Mr. Vikram Singh", room: "Computer Lab 1", tag: "tech" },
        { subject: "Physical Education", teacher: "Coach Gurpreet", room: "Sports Ground", tag: "sports" }
      ],
      "Tuesday": [
        { subject: "Physics", teacher: "Dr. Arvind Sharma", room: "304", tag: "science" },
        { subject: "Mathematics", teacher: "Mrs. Sunita Rao", room: "304", tag: "math" },
        { subject: "Biology", teacher: "Dr. Hemant Joshi", room: "Bio Lab", tag: "science" },
        { subject: "Hindi", teacher: "Mr. R. K. Dwivedi", room: "304", tag: "lang" },
        { subject: "English", teacher: "Mrs. Ananya Sen", room: "304", tag: "lang" },
        { subject: "Social Science", teacher: "Mrs. Priya Nambiar", room: "304", tag: "social" },
        { subject: "Library & Reading", teacher: "Ms. Meenakshi", room: "Central Library", tag: "library" }
      ],
      "Wednesday": [
        { subject: "Mathematics", teacher: "Mrs. Sunita Rao", room: "304", tag: "math" },
        { subject: "Social Science", teacher: "Mrs. Priya Nambiar", room: "304", tag: "social" },
        { subject: "Chemistry", teacher: "Mr. Rajesh Verma", room: "304", tag: "science" },
        { subject: "English", teacher: "Mrs. Ananya Sen", room: "304", tag: "lang" },
        { subject: "Artificial Intelligence", teacher: "Mr. Vikram Singh", room: "Computer Lab 1", tag: "tech" },
        { subject: "Hindi", teacher: "Mr. R. K. Dwivedi", room: "304", tag: "lang" },
        { subject: "Art & Craft", teacher: "Mr. Manjit Kumar", room: "Art Studio", tag: "arts" }
      ],
      "Thursday": [
        { subject: "Biology", teacher: "Dr. Hemant Joshi", room: "304", tag: "science" },
        { subject: "Mathematics", teacher: "Mrs. Sunita Rao", room: "304", tag: "math" },
        { subject: "Physics", teacher: "Dr. Arvind Sharma", room: "Physics Lab", tag: "science" },
        { subject: "Social Science", teacher: "Mrs. Priya Nambiar", room: "304", tag: "social" },
        { subject: "English", teacher: "Mrs. Ananya Sen", room: "304", tag: "lang" },
        { subject: "Physical Education", teacher: "Coach Gurpreet", room: "Sports Ground", tag: "sports" },
        { subject: "Value Education / House Club", teacher: "Mrs. Sunita Rao", room: "304", tag: "club" }
      ],
      "Friday": [
        { subject: "Mathematics", teacher: "Mrs. Sunita Rao", room: "304", tag: "math" },
        { subject: "Chemistry", teacher: "Mr. Rajesh Verma", room: "Chem Lab", tag: "science" },
        { subject: "Artificial Intelligence", teacher: "Mr. Vikram Singh", room: "Computer Lab 1", tag: "tech" },
        { subject: "Biology", teacher: "Dr. Hemant Joshi", room: "304", tag: "science" },
        { subject: "Hindi", teacher: "Mr. R. K. Dwivedi", room: "304", tag: "lang" },
        { subject: "Social Science", teacher: "Mrs. Priya Nambiar", room: "304", tag: "social" },
        { subject: "Music & Performing Arts", teacher: "Pandit S. Mishra", room: "Auditorium", tag: "arts" }
      ],
      "Saturday": [
        { subject: "Remedial & Doubts Clinic", teacher: "Mrs. Sunita Rao", room: "304", tag: "math" },
        { subject: "Science Olympiad Prep", teacher: "Dr. Arvind Sharma", room: "Physics Lab", tag: "science" },
        { subject: "Robotics & STEM Club", teacher: "Mr. Vikram Singh", room: "STEM Lab", tag: "tech" },
        { subject: "Inter-House Debate / Quiz", teacher: "Mrs. Ananya Sen", room: "AV Hall", tag: "club" },
        { subject: "Zero Period & Weekly Review", teacher: "Mrs. Sunita Rao", room: "304", tag: "review" },
        { subject: "Dispersal", teacher: "Staff", room: "-", tag: "break" },
        { subject: "-", teacher: "-", room: "-", tag: "-" }
      ]
    }
  };

  // Homework & Assignments
  const homeworkList = [
    {
      id: "HW-101",
      title: "CBSE Sample Questions: Quadratic Equations & AP Series",
      subject: "Mathematics",
      class: "Class X-A",
      teacher: "Mrs. Sunita Rao",
      assignedDate: "08 Sep 2026",
      dueDate: "12 Sep 2026",
      totalStudents: 42,
      submitted: 38,
      pending: 4,
      status: "Active",
      priority: "High",
      description: "Solve NCERT Exemplar Chapter 4 Exercises 4.3 and 4.4 in your math registers. Prepare for surprise mock quiz."
    },
    {
      id: "HW-102",
      title: "Lab Practical Record: Verification of Ohm's Law & Resistance",
      subject: "Physics",
      class: "Class X-A",
      teacher: "Dr. Arvind Sharma",
      assignedDate: "07 Sep 2026",
      dueDate: "11 Sep 2026",
      totalStudents: 42,
      submitted: 41,
      pending: 1,
      status: "Active",
      priority: "Medium",
      description: "Complete graph plot between V and I, determine slope, and write sources of experimental error."
    },
    {
      id: "HW-103",
      title: "Article Writing: Impact of Generative AI on Education",
      subject: "English",
      class: "Class X-A",
      teacher: "Mrs. Ananya Sen",
      assignedDate: "06 Sep 2026",
      dueDate: "10 Sep 2026",
      totalStudents: 42,
      submitted: 42,
      pending: 0,
      status: "Evaluated",
      priority: "Medium",
      description: "Draft a 150-word formal article adhering to CBSE Word Limit and rubric."
    },
    {
      id: "HW-104",
      title: "Map Work: Major River Systems & Soil Types of India",
      subject: "Social Science",
      class: "Class X-A",
      teacher: "Mrs. Priya Nambiar",
      assignedDate: "09 Sep 2026",
      dueDate: "14 Sep 2026",
      totalStudents: 42,
      submitted: 19,
      pending: 23,
      status: "Active",
      priority: "Normal",
      description: "Locate and label alluvial, black, and red soils on political outline map of India."
    }
  ];

  // Study Materials Repository
  const studyMaterials = [
    { id: "MAT-01", title: "Class 10 Science Formula Sheet & Diagram Compendium", subject: "Science", class: "Class X", format: "PDF (4.8 MB)", downloads: 342, date: "28 Aug 2026" },
    { id: "MAT-02", title: "Math Master Class: 50 High-Frequency CBSE Board Problems", subject: "Mathematics", class: "Class X", format: "PDF (6.2 MB)", downloads: 418, date: "02 Sep 2026" },
    { id: "MAT-03", title: "Python Basics & Machine Learning Model Cheatsheet", subject: "Artificial Intelligence", class: "Class X", format: "PDF (2.1 MB)", downloads: 189, date: "01 Sep 2026" },
    { id: "MAT-04", title: "Nationalism in India: Quick Revision Timeline & Mindmap", subject: "Social Science", class: "Class X", format: "PDF (3.5 MB)", downloads: 275, date: "24 Aug 2026" }
  ];

  // Notices & School Circulars
  const notices = [
    {
      id: "NOT-2026-081",
      title: "Schedule for CBSE Periodic Test 2 (Classes IX to XII)",
      category: "Academic / Exam",
      audience: "Students & Parents",
      publishedDate: "08 Sep 2026",
      expiryDate: "30 Sep 2026",
      author: "Examination Controller",
      status: "Active",
      views: 1240,
      content: "The Periodic Test 2 examinations for Classes 9th through 12th will commence on 22nd September 2026. Hall tickets and seating arrangements will be published on the portal 3 days prior. Maximum marks: 80."
    },
    {
      id: "NOT-2026-080",
      title: "16th Annual Inter-School Tech & AI Conclave 'Sanskaar Innovate 2026'",
      category: "Event",
      audience: "All School",
      publishedDate: "05 Sep 2026",
      expiryDate: "20 Sep 2026",
      author: "Dept of Computer Science",
      status: "Active",
      views: 980,
      content: "We invite nominations for Hackathon, Drone Simulator Challenge, and Robotics Arena. Over 35 schools across NCR are participating. Contact Mr. Vikram Singh for registrations."
    },
    {
      id: "NOT-2026-079",
      title: "Quarter 2 Fee Clearance Notification & Late Fee Waiver Extension",
      category: "Finance",
      audience: "Parents",
      publishedDate: "01 Sep 2026",
      expiryDate: "15 Sep 2026",
      author: "Accounts Department",
      status: "Urgent",
      views: 1450,
      content: "Parents who have not cleared the Quarter 2 tuition and transport dues are requested to do so before 15th September to avoid late fee surcharges. Online payment via UPI/Net Banking is encouraged."
    },
    {
      id: "NOT-2026-078",
      title: "CBSE Advisory: Dengue Prevention & Full-Sleeve Uniform Mandate",
      category: "Health & Safety",
      audience: "All School",
      publishedDate: "28 Aug 2026",
      expiryDate: "30 Sep 2026",
      author: "Infirmary & Principal",
      status: "Active",
      views: 1890,
      content: "As per District Health Department directives, all students must wear full-sleeve school shirts and trousers until 15th October. School premises are fogged every alternate evening."
    }
  ];

  // Accounting & Financial Data
  const accounting = {
    overview: {
      totalIncomeYTD: 48250000,
      totalExpensesYTD: 36120000,
      netReserve: 12130000,
      pendingFeeReceivable: 2840000,
      cashInBankSBI: 8450000,
      cashInBankHDFC: 3200000,
      pettyCashCounter: 480000
    },
    expenseCategories: [
      { category: "Staff & Faculty Payroll", amount: 24800000, pct: 68.6, icon: "users" },
      { category: "Campus Infrastructure & Maintenance", amount: 4200000, pct: 11.6, icon: "building" },
      { category: "Transport Fuel, GPS & Fleet Maintenance", amount: 3100000, pct: 8.6, icon: "bus" },
      { category: "Electricity, Water & Utilities", amount: 1850000, pct: 5.1, icon: "zap" },
      { category: "Science & AI Computer Laboratories", amount: 1250000, pct: 3.5, icon: "cpu" },
      { category: "Library Books, Sports & Curriculars", amount: 920000, pct: 2.6, icon: "book-open" }
    ],
    recentTransactions: [
      { id: "TXN-8821", date: "09 Sep 2026", type: "Income", category: "Quarter 2 Tuition Collection", voucher: "RV-4412", amount: 185000, mode: "UPI Gateway", status: "Cleared" },
      { id: "TXN-8820", date: "08 Sep 2026", type: "Expense", category: "Fleet Diesel & CNG Refill (14 Buses)", voucher: "PV-1109", amount: 78500, mode: "Corporate Fleet Card", status: "Approved" },
      { id: "TXN-8819", date: "05 Sep 2026", type: "Expense", category: "Teacher Salary Disbursement (Aug 2026)", voucher: "PV-1108", amount: 3180000, mode: "Direct NEFT", status: "Completed" },
      { id: "TXN-8818", date: "04 Sep 2026", type: "Income", category: "New Admission Security Deposit", voucher: "RV-4411", amount: 95000, mode: "Demand Draft", status: "Cleared" },
      { id: "TXN-8817", date: "02 Sep 2026", type: "Expense", category: "High-Speed Lease Line Internet & AWS Hosting", voucher: "PV-1107", amount: 34500, mode: "Net Banking", status: "Completed" }
    ]
  };

  // AI Insights Mock Data
  const aiInsights = {
    schoolHealthScore: 94,
    predictedBoardPassRate: 98.8,
    atRiskStudentsCount: 14,
    remedialRecommendedCount: 22,
    keyFindings: [
      {
        title: "CBSE Mathematics Board Alert",
        level: "warning",
        description: "Quadratic Equations test scores in Section X-C are 14% lower than historical benchmarks. AI recommends scheduling 3 supplementary doubt clinics before Term 2 exams."
      },
      {
        title: "Attendance & Dropout Early Warning",
        level: "danger",
        description: "5 students have breached the critical 75% CBSE attendance threshold this week. Automated parent notification and counselor intervention dispatched."
      },
      {
        title: "High Aptitude Science Recognition",
        level: "success",
        description: "18 students from Class IX and X demonstrated superior scores (>96%) in AI & Physics. Recommended for National Science Olympiad training."
      }
    ],
    studentSpecificInsight: {
      studentName: "Aarav Sharma (Class X-A)",
      predictedPercentile: "98.5% - 99.2%",
      strengths: ["Complex Problem Solving in Coordinate Geometry", "Structured Essay & Analytical English", "Python Logic & Algorithmic Design"],
      areasForImprovement: ["Speed in balancing Organic Chemistry equations", "Historical chronology dates in Social Science"],
      actionPlan: "Provide 3 timed mock tests for Science Section B to optimize exam completion time."
    }
  };

  // Automation Triggers & Rules
  const automationRules = [
    {
      id: "AUTO-01",
      name: "Daily Student Absentee SMS to Parents",
      description: "Sends automated SMS & WhatsApp message at 09:30 AM to guardians of all absent students.",
      trigger: "09:30 AM Every School Day",
      channel: "SMS & WhatsApp Gateway",
      active: true,
      lastRun: "Today, 09:30 AM (56 messages sent)",
      successRate: "99.8%"
    },
    {
      id: "AUTO-02",
      name: "Upcoming Fee Due WhatsApp Reminders",
      description: "Sends personalized payment links to parents 5 days and 1 day prior to fee due dates.",
      trigger: "25th of Every Month",
      channel: "WhatsApp Business API",
      active: true,
      lastRun: "25 Aug 2026 (182 reminders sent)",
      successRate: "100%"
    },
    {
      id: "AUTO-03",
      name: "Automated Late Fee Surcharge Engine",
      description: "Applies ₹50/day fine automatically on invoices unpaid after the 10th of every month.",
      trigger: "Midnight on 11th of Month",
      channel: "Billing Ledger",
      active: true,
      lastRun: "11 Aug 2026 (34 invoices updated)",
      successRate: "100%"
    },
    {
      id: "AUTO-04",
      name: "Student Birthday Greeting & Morning Assembly Flash",
      description: "Generates student e-birthday card on parent portal and sends SMS to parents.",
      trigger: "07:00 AM Daily",
      channel: "SMS & Portal Notification",
      active: true,
      lastRun: "Today, 07:00 AM (4 students celebrated)",
      successRate: "100%"
    },
    {
      id: "AUTO-05",
      name: "Monthly Staff Payroll Slip Generation",
      description: "Computes biometric attendance, leaves, PF, and generates downloadable digital pay slips.",
      trigger: "1st of Every Month at 06:00 AM",
      channel: "Staff Portal & Email",
      active: true,
      lastRun: "01 Sep 2026 (84 slips dispatched)",
      successRate: "100%"
    }
  ];

  // House Points Leaderboard
  const housePoints = [
    { house: "Tagore House", captain: "Aarav Sharma", points: 1420, color: "#EAB308", badge: "Yellow Tigers" },
    { house: "Ashoka House", captain: "Diya Patel", points: 1380, color: "#3B82F6", badge: "Blue Eagles" },
    { house: "Shivaji House", captain: "Kabir Singh", points: 1310, color: "#EF4444", badge: "Red Hawks" },
    { house: "Raman House", captain: "Ananya Sen", points: 1290, color: "#10B981", badge: "Green Challengers" }
  ];

  return {
    schoolProfile,
    classesList,
    sectionsList,
    students,
    teachers,
    staff,
    feeRecords,
    todayAttendance,
    classXAttendance,
    exams,
    reportCardAarav,
    timetableClassX,
    homeworkList,
    studyMaterials,
    notices,
    accounting,
    aiInsights,
    automationRules,
    housePoints
  };
})();
