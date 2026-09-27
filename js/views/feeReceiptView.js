// Official Printable Fee Receipt Component
window.FeeReceiptView = (function() {
  function render(invoiceNo = 'INV-2026-0891') {
    const fee = window.ERP_DATA.feeRecords.find(f => f.invoiceNo === invoiceNo) || window.ERP_DATA.feeRecords[0];
    const s = window.ERP_DATA.students.find(x => x.id === fee.studentId) || window.ERP_DATA.students[0];
    const school = window.ERP_DATA.schoolProfile;

    return `
      <div class="max-w-3xl mx-auto space-y-5 animate-fade-in">
        
        <!-- Action Toolbar (No Print) -->
        <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 card-shadow no-print">
          <div class="flex items-center gap-2">
            <button onclick="App.navigate('fees')" class="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </button>
            <div>
              <h2 class="font-bold text-slate-800 text-sm">Official Fee Receipt Preview</h2>
              <p class="text-xs text-slate-400">Receipt No: ${fee.receiptNo || 'REC-2026-4412'} • Invoice: ${fee.invoiceNo}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="window.print()"
              class="flex items-center gap-2 px-4 py-2 bg-[#E8752F] hover:bg-[#D46320] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>Print Official Receipt</span>
            </button>
            <button 
              onclick="Toast.success('Receipt Downloaded', 'Official receipt saved in PDF format')"
              class="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <!-- Printable Receipt (Authentic Indian School 3-Part or Single Clean Format) -->
        <div id="printable-document" class="bg-white p-8 md:p-10 rounded-2xl border-2 border-slate-300 shadow-xl text-slate-900 text-xs">
          
          <!-- Receipt Header -->
          <div class="text-center pb-4 border-b-2 border-slate-800">
            <div class="flex items-center justify-center gap-3 mb-1">
              <div class="w-12 h-12 rounded-xl bg-[#E8752F] text-white flex items-center justify-center font-black text-2xl">
                S
              </div>
              <div class="text-left">
                <h1 class="text-xl md:text-2xl font-black tracking-tight uppercase">${school.name}</h1>
                <p class="text-[11px] text-slate-600 font-medium">${school.affiliation} | School Code: ${school.schoolCode}</p>
                <p class="text-[10px] text-slate-500">${school.address}</p>
              </div>
            </div>

            <div class="mt-3 pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
              <span class="font-bold uppercase tracking-wider text-[#E8752F]">FEE PAYMENT RECEIPT (STUDENT COPY)</span>
              <span class="font-mono font-bold text-slate-800">RECEIPT NO: ${fee.receiptNo || 'REC-2026-4412'}</span>
            </div>
          </div>

          <!-- Particulars Row -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-200 bg-slate-50/60 p-3 rounded-xl mt-3">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
              <span class="font-bold text-slate-900 text-sm">${fee.studentName}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Student ID / Roll</span>
              <span class="font-bold text-slate-900 font-mono">${fee.studentId} (Roll ${s.rollNo})</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Class & Section</span>
              <span class="font-bold text-slate-900">${fee.class}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Payment Date</span>
              <span class="font-bold text-slate-900">${fee.paymentDate || '10 Sep 2026'}</span>
            </div>
          </div>

          <!-- Fee Component Breakdown Table -->
          <div class="mt-4 border border-slate-300 rounded-lg overflow-hidden">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 text-[11px]">
                  <th class="p-2.5 w-12 text-center">#</th>
                  <th class="p-2.5">Fee Head Description</th>
                  <th class="p-2.5 text-right w-32">Amount (₹)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr>
                  <td class="p-2.5 text-center text-slate-400">1</td>
                  <td class="p-2.5 font-medium">Tuition & Pedagogical Development Fee (${fee.quarter})</td>
                  <td class="p-2.5 text-right font-semibold">₹${fee.tuitionFee.toLocaleString('en-IN')}.00</td>
                </tr>
                <tr>
                  <td class="p-2.5 text-center text-slate-400">2</td>
                  <td class="p-2.5 font-medium">School Transport Bus Facility & Fuel Levy</td>
                  <td class="p-2.5 text-right font-semibold">₹${fee.transportFee.toLocaleString('en-IN')}.00</td>
                </tr>
                <tr>
                  <td class="p-2.5 text-center text-slate-400">3</td>
                  <td class="p-2.5 font-medium">Science Laboratory, STEM & Robotics Lab Fee</td>
                  <td class="p-2.5 text-right font-semibold">₹${fee.labFee.toLocaleString('en-IN')}.00</td>
                </tr>
                <tr>
                  <td class="p-2.5 text-center text-slate-400">4</td>
                  <td class="p-2.5 font-medium">Sports, Library & Annual Co-Curricular Fee</td>
                  <td class="p-2.5 text-right font-semibold">₹${fee.activityFee.toLocaleString('en-IN')}.00</td>
                </tr>
                ${fee.discount > 0 ? `
                  <tr class="text-emerald-700 bg-emerald-50/40">
                    <td class="p-2.5 text-center">5</td>
                    <td class="p-2.5 font-medium">Early Payment / Sibling Concession Discount</td>
                    <td class="p-2.5 text-right font-semibold">- ₹${fee.discount.toLocaleString('en-IN')}.00</td>
                  </tr>
                ` : ''}
                ${fee.fine > 0 ? `
                  <tr class="text-rose-700 bg-rose-50/40">
                    <td class="p-2.5 text-center">6</td>
                    <td class="p-2.5 font-medium">Late Fee Surcharge</td>
                    <td class="p-2.5 text-right font-semibold">+ ₹${fee.fine.toLocaleString('en-IN')}.00</td>
                  </tr>
                ` : ''}
                <tr class="bg-slate-50 font-black text-sm border-t-2 border-slate-400">
                  <td colspan="2" class="p-2.5 text-right uppercase">Total Net Amount Paid:</td>
                  <td class="p-2.5 text-right text-emerald-700 font-bold">₹${fee.paidAmount.toLocaleString('en-IN')}.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- In Words & Transaction Details -->
          <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div>
              <span class="text-slate-400 uppercase text-[10px] font-bold">Amount in Words:</span>
              <span class="font-bold text-slate-900 block">Rupees Twenty-Five Thousand Only</span>
            </div>
            <div class="flex flex-wrap items-center justify-between text-[11px] pt-1 border-t border-slate-200 text-slate-600">
              <span><strong>Payment Method:</strong> ${fee.paymentMode || 'UPI / Net Banking'}</span>
              <span><strong>Ref / Txn ID:</strong> <span class="font-mono">${fee.transactionId || 'UPI/260708119023/OKAXIS'}</span></span>
              <span><strong>Status:</strong> <span class="text-emerald-700 font-bold uppercase">${fee.status}</span></span>
            </div>
          </div>

          <!-- Signatures & Disclaimer -->
          <div class="pt-8 mt-6 border-t border-slate-300 flex items-center justify-between text-xs">
            <div>
              <div class="font-mono text-[10px] text-slate-400">Generated by Sanskaar Digital ERP</div>
              <div class="text-[10px] text-slate-500 mt-0.5">Fees once paid are non-refundable & non-transferable.</div>
            </div>

            <div class="text-center w-48">
              <div class="w-16 h-16 border border-emerald-500/30 rounded-full mx-auto flex items-center justify-center text-[9px] text-emerald-600 font-black uppercase rotate-6 mb-1">
                PAID & VERIFIED
              </div>
              <div class="font-bold text-slate-900">Suresh Chandra Gupta</div>
              <div class="text-[10px] text-slate-400 border-t border-dashed border-slate-300 pt-1">Chief Accounts Officer</div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  return {
    render
  };
})();
