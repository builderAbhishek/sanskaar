// Form Submission & Modal Operations Handler
window.ModalForms = (function() {
  function handleAddStudent(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.student_name.value.trim();
    const cls = form.student_class.value;
    const sec = form.student_section.value;
    const gender = form.student_gender.value;
    const father = form.father_name.value.trim();
    const phone = form.parent_phone.value.trim();
    const house = form.student_house.value;

    if (!name || !father || !phone) {
      Toast.warning('Validation Error', 'Please complete all required fields.');
      return;
    }

    const newId = `STU-2026-${(window.ERP_DATA.students.length + 1).toString().padStart(3, '0')}`;
    const newRoll = (window.ERP_DATA.students.filter(s => s.class === cls && s.section === sec).length + 1).toString().padStart(2, '0');

    const newStudent = {
      id: newId,
      rollNo: newRoll,
      name: name,
      gender: gender,
      class: cls,
      section: sec,
      admissionNo: `ADM-2026-${2000 + window.ERP_DATA.students.length}`,
      admissionYear: 2026,
      dob: "2011-05-20",
      bloodGroup: "O+",
      house: house,
      fatherName: father,
      motherName: "Mrs. " + father.split(' ').slice(1).join(' '),
      parentPhone: phone,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@sanskaarschool.edu.in`,
      address: "Sector 14, Greater Noida, UP",
      transportRoute: "Bus Route #02",
      attendancePct: 100,
      feeStatus: "Paid",
      feeDue: 0,
      status: "Active",
      cgpa: "9.0",
      photo: gender === "Male" 
        ? "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" 
        : "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    };

    window.ERP_DATA.students.unshift(newStudent);
    form.reset();
    ModalManager.close('modal-add-student');
    Toast.success('Admission Completed', `Enrolled ${name} in ${cls}-${sec} (ID: ${newId})`);
    App.refreshCurrentView();
  }

  function handleCollectFee(e) {
    e.preventDefault();
    const form = e.target;
    const studentId = form.fee_student_id.value;
    const paymentMode = form.payment_mode.value;
    const amount = parseInt(form.amount_paid.value) || 25000;
    const txnRef = form.txn_ref.value.trim() || `UPI/${Date.now().toString().slice(-10)}/OKAXIS`;

    const student = window.ERP_DATA.students.find(s => s.id === studentId) || window.ERP_DATA.students[0];
    const newInv = `INV-2026-${(window.ERP_DATA.feeRecords.length + 891)}`;
    const newRec = `REC-2026-${(window.ERP_DATA.feeRecords.length + 4417)}`;

    const newFeeRecord = {
      invoiceNo: newInv,
      studentId: student.id,
      studentName: student.name,
      class: `${student.class}-${student.section}`,
      quarter: "Quarter 2 (Jul - Sep 2026)",
      tuitionFee: 18000,
      transportFee: 4500,
      labFee: 2000,
      activityFee: 1500,
      totalAmount: 26000,
      discount: 1000,
      fine: 0,
      netPayable: amount,
      paidAmount: amount,
      status: "Paid",
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMode: paymentMode,
      transactionId: txnRef,
      receiptNo: newRec
    };

    window.ERP_DATA.feeRecords.unshift(newFeeRecord);
    student.feeStatus = "Paid";
    student.feeDue = 0;

    form.reset();
    ModalManager.close('modal-collect-fee');
    Toast.success('Payment Recorded', `Received ₹${amount.toLocaleString('en-IN')} from ${student.name}. Generating receipt...`);
    
    // Auto-open printable receipt
    setTimeout(() => {
      App.openFeeReceipt(newInv);
    }, 400);
  }

  function handleCreateNotice(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.notice_title.value.trim();
    const category = form.notice_category.value;
    const audience = form.notice_audience.value;
    const content = form.notice_content.value.trim();

    if (!title || !content) {
      Toast.warning('Validation Error', 'Please provide a circular title and content.');
      return;
    }

    const newNotice = {
      id: `NOT-2026-0${82 + window.ERP_DATA.notices.length}`,
      title: title,
      category: category,
      audience: audience,
      publishedDate: "Today, 10 Sep 2026",
      expiryDate: "30 Sep 2026",
      author: "Principal & Admin",
      status: "Active",
      views: 1,
      content: content
    };

    window.ERP_DATA.notices.unshift(newNotice);
    form.reset();
    ModalManager.close('modal-create-notice');
    Toast.success('Circular Published', `Dispatched "${title}" to ${audience} via SMS & Portal.`);
    App.refreshCurrentView();
  }

  return {
    handleAddStudent,
    handleCollectFee,
    handleCreateNotice
  };
})();
