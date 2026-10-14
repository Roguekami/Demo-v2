// ===========================================================
// Alimo EduCloud Portal — Mock Data
// ===========================================================

// --- Demo accounts -----------------------------------------
export const demoAccounts = {
  admin:   { id: 1, name: 'Adewale Johnson',  initials: 'AJ', role: 'admin',   email: 'admin@lincolnacademy.edu.ng' },
  teacher: { id: 2, name: 'Mrs. Ngozi Okafor', initials: 'NO', role: 'teacher', email: 'ngozi@lincolnacademy.edu.ng' },
  student: { id: 3, name: 'Chidera Eze',       initials: 'CE', role: 'student', studentId: 1, email: 'chidera@lincolnacademy.edu.ng', class: 'SS2', admissionNo: 'LA/2024/0342' },
};

// --- Classes -----------------------------------------------
export const classes = [
  { id: 1, name: 'JSS1', level: 'junior', studentCount: 45 },
  { id: 2, name: 'JSS2', level: 'junior', studentCount: 42 },
  { id: 3, name: 'JSS3', level: 'junior', studentCount: 38 },
  { id: 4, name: 'SS1',  level: 'senior', studentCount: 35 },
  { id: 5, name: 'SS2',  level: 'senior', studentCount: 33 },
  { id: 6, name: 'SS3',  level: 'senior', studentCount: 30 },
];

// --- Subjects ----------------------------------------------
export const subjects = [
  { id: 1,  name: 'Mathematics' },
  { id: 2,  name: 'English Language' },
  { id: 3,  name: 'Physics' },
  { id: 4,  name: 'Chemistry' },
  { id: 5,  name: 'Biology' },
  { id: 6,  name: 'Computer Science' },
  { id: 7,  name: 'Civic Education' },
  { id: 8,  name: 'Economics' },
  { id: 9,  name: 'Geography' },
  { id: 10, name: 'Literature in English' },
  { id: 11, name: 'Further Mathematics' },
  { id: 12, name: 'Agricultural Science' },
];

// --- Teachers ----------------------------------------------
export const teachers = [
  { id: 1, name: 'Mrs. Ngozi Okafor',     email: 'ngozi@lincolnacademy.edu.ng',    phone: '0812 345 6789', subjects: ['Mathematics', 'Further Mathematics'],   classes: ['SS1', 'SS2'],              status: 'active' },
  { id: 2, name: 'Mr. Emeka Nwankwo',     email: 'emeka@lincolnacademy.edu.ng',    phone: '0803 456 7890', subjects: ['English Language'],                      classes: ['JSS1', 'JSS2', 'JSS3'],   status: 'active' },
  { id: 3, name: 'Mrs. Funke Adesanya',   email: 'funke@lincolnacademy.edu.ng',    phone: '0816 789 0123', subjects: ['Physics'],                               classes: ['SS1', 'SS2', 'SS3'],       status: 'active' },
  { id: 4, name: 'Mr. Ibrahim Musa',      email: 'ibrahim@lincolnacademy.edu.ng',  phone: '0807 890 1234', subjects: ['Chemistry'],                             classes: ['SS1', 'SS2', 'SS3'],       status: 'active' },
  { id: 5, name: 'Mrs. Blessing Udoh',    email: 'blessing@lincolnacademy.edu.ng', phone: '0814 901 2345', subjects: ['Biology'],                               classes: ['JSS3', 'SS1', 'SS2'],      status: 'active' },
  { id: 6, name: 'Mr. Chinedu Okonkwo',   email: 'chinedu@lincolnacademy.edu.ng',  phone: '0805 012 3456', subjects: ['Computer Science'],                      classes: ['SS1', 'SS2', 'SS3'],       status: 'active' },
  { id: 7, name: 'Mrs. Halima Abdullahi', email: 'halima@lincolnacademy.edu.ng',   phone: '0811 123 4567', subjects: ['Civic Education'],                       classes: ['JSS1', 'JSS2', 'JSS3'],   status: 'inactive' },
  { id: 8, name: 'Mr. Segun Alabi',       email: 'segun@lincolnacademy.edu.ng',    phone: '0808 234 5678', subjects: ['Economics', 'Geography'],                 classes: ['SS1', 'SS2', 'SS3'],       status: 'active' },
];

// --- Students ----------------------------------------------
export const students = [
  { id: 1,  name: 'Chidera Eze',        class: 'SS2',  admissionNo: 'LA/2024/0342', guardian: 'Mr. Obiora Eze',       guardianPhone: '0815 678 1234', feeStatus: 'paid',    dob: '2008-03-15', amountDue: 75000, amountPaid: 75000 },
  { id: 2,  name: 'Adaeze Nwosu',       class: 'SS2',  admissionNo: 'LA/2024/0298', guardian: 'Mrs. Chidinma Nwosu',  guardianPhone: '0803 789 2345', feeStatus: 'paid',    dob: '2008-07-22', amountDue: 75000, amountPaid: 75000 },
  { id: 3,  name: 'Tunde Bakare',       class: 'SS1',  admissionNo: 'LA/2024/0315', guardian: 'Mr. Adebayo Bakare',   guardianPhone: '0816 890 3456', feeStatus: 'overdue', dob: '2009-01-10', amountDue: 75000, amountPaid: 45000 },
  { id: 4,  name: 'Amina Yusuf',        class: 'SS1',  admissionNo: 'LA/2024/0287', guardian: 'Alhaji Yusuf Musa',    guardianPhone: '0807 901 4567', feeStatus: 'paid',    dob: '2009-05-18', amountDue: 75000, amountPaid: 75000 },
  { id: 5,  name: 'Obinna Chukwu',      class: 'SS2',  admissionNo: 'LA/2024/0301', guardian: 'Chief Emeka Chukwu',   guardianPhone: '0814 012 5678', feeStatus: 'overdue', dob: '2008-11-03', amountDue: 75000, amountPaid: 25000 },
  { id: 6,  name: 'Folake Adeyemi',     class: 'JSS3', admissionNo: 'LA/2024/0356', guardian: 'Mrs. Funmi Adeyemi',   guardianPhone: '0805 123 6789', feeStatus: 'paid',    dob: '2010-02-28', amountDue: 60000, amountPaid: 60000 },
  { id: 7,  name: 'Emeka Obi',          class: 'SS1',  admissionNo: 'LA/2024/0320', guardian: 'Mr. Ikenna Obi',       guardianPhone: '0811 234 7890', feeStatus: 'paid',    dob: '2009-08-14', amountDue: 75000, amountPaid: 75000 },
  { id: 8,  name: 'Zainab Ibrahim',     class: 'JSS3', admissionNo: 'LA/2024/0348', guardian: 'Mrs. Hauwa Ibrahim',   guardianPhone: '0808 345 8901', feeStatus: 'overdue', dob: '2010-06-09', amountDue: 60000, amountPaid: 35000 },
  { id: 9,  name: 'Kelechi Nnadi',      class: 'SS2',  admissionNo: 'LA/2024/0333', guardian: 'Mr. Okechukwu Nnadi',  guardianPhone: '0812 456 9012', feeStatus: 'paid',    dob: '2008-12-01', amountDue: 75000, amountPaid: 75000 },
  { id: 10, name: 'Aisha Okoro',        class: 'JSS2', admissionNo: 'LA/2024/0367', guardian: 'Mrs. Fatima Okoro',    guardianPhone: '0803 567 0123', feeStatus: 'paid',    dob: '2011-04-25', amountDue: 55000, amountPaid: 55000 },
  { id: 11, name: 'Babajide Ogunleye',  class: 'SS3',  admissionNo: 'LA/2024/0275', guardian: 'Chief Olu Ogunleye',   guardianPhone: '0816 678 1234', feeStatus: 'paid',    dob: '2007-09-17', amountDue: 80000, amountPaid: 80000 },
  { id: 12, name: 'Hauwa Bello',        class: 'JSS1', admissionNo: 'LA/2024/0389', guardian: 'Alhaji Bello Usman',   guardianPhone: '0807 789 2345', feeStatus: 'overdue', dob: '2012-01-30', amountDue: 50000, amountPaid: 20000 },
  { id: 13, name: 'Chukwudi Onuoha',    class: 'SS3',  admissionNo: 'LA/2024/0280', guardian: 'Mr. Nnamdi Onuoha',    guardianPhone: '0814 890 3456', feeStatus: 'paid',    dob: '2007-07-12', amountDue: 80000, amountPaid: 80000 },
  { id: 14, name: 'Temitope Adeleke',   class: 'JSS2', admissionNo: 'LA/2024/0371', guardian: 'Mrs. Sade Adeleke',    guardianPhone: '0805 901 4567', feeStatus: 'paid',    dob: '2011-10-05', amountDue: 55000, amountPaid: 55000 },
  { id: 15, name: 'Uchenna Igwe',       class: 'SS1',  admissionNo: 'LA/2024/0309', guardian: 'Mr. Chidi Igwe',       guardianPhone: '0811 012 5678', feeStatus: 'paid',    dob: '2009-03-21', amountDue: 75000, amountPaid: 75000 },
  { id: 16, name: 'Fatima Abubakar',    class: 'JSS1', admissionNo: 'LA/2024/0392', guardian: 'Hajiya Amina Abubakar',guardianPhone: '0808 123 6789', feeStatus: 'paid',    dob: '2012-05-14', amountDue: 50000, amountPaid: 50000 },
  { id: 17, name: 'Damilola Oladipo',   class: 'SS3',  admissionNo: 'LA/2024/0268', guardian: 'Mr. Kayode Oladipo',   guardianPhone: '0812 234 7890', feeStatus: 'overdue', dob: '2007-11-28', amountDue: 80000, amountPaid: 50000 },
  { id: 18, name: 'Blessing Etim',      class: 'JSS3', admissionNo: 'LA/2024/0360', guardian: 'Mrs. Grace Etim',      guardianPhone: '0803 345 8901', feeStatus: 'paid',    dob: '2010-08-19', amountDue: 60000, amountPaid: 60000 },
  { id: 19, name: 'Yusuf Garba',        class: 'JSS2', admissionNo: 'LA/2024/0378', guardian: 'Alhaji Musa Garba',    guardianPhone: '0816 456 9012', feeStatus: 'paid',    dob: '2011-02-07', amountDue: 55000, amountPaid: 55000 },
  { id: 20, name: 'Chioma Nwachukwu',   class: 'SS2',  admissionNo: 'LA/2024/0340', guardian: 'Mrs. Nneka Nwachukwu', guardianPhone: '0807 567 0123', feeStatus: 'paid',    dob: '2008-06-11', amountDue: 75000, amountPaid: 75000 },
];

// --- Class ↔ Subject ↔ Teacher mapping ---------------------
export const classSubjects = [
  { classId: 4, subjectId: 1,  teacherId: 1 },
  { classId: 5, subjectId: 1,  teacherId: 1 },
  { classId: 4, subjectId: 11, teacherId: 1 },
  { classId: 5, subjectId: 11, teacherId: 1 },
  { classId: 1, subjectId: 2,  teacherId: 2 },
  { classId: 2, subjectId: 2,  teacherId: 2 },
  { classId: 3, subjectId: 2,  teacherId: 2 },
  { classId: 4, subjectId: 3,  teacherId: 3 },
  { classId: 5, subjectId: 3,  teacherId: 3 },
  { classId: 6, subjectId: 3,  teacherId: 3 },
  { classId: 4, subjectId: 4,  teacherId: 4 },
  { classId: 5, subjectId: 4,  teacherId: 4 },
  { classId: 6, subjectId: 4,  teacherId: 4 },
  { classId: 3, subjectId: 5,  teacherId: 5 },
  { classId: 4, subjectId: 5,  teacherId: 5 },
  { classId: 5, subjectId: 5,  teacherId: 5 },
  { classId: 4, subjectId: 6,  teacherId: 6 },
  { classId: 5, subjectId: 6,  teacherId: 6 },
  { classId: 6, subjectId: 6,  teacherId: 6 },
  { classId: 1, subjectId: 7,  teacherId: 7 },
  { classId: 2, subjectId: 7,  teacherId: 7 },
  { classId: 3, subjectId: 7,  teacherId: 7 },
  { classId: 4, subjectId: 8,  teacherId: 8 },
  { classId: 5, subjectId: 8,  teacherId: 8 },
  { classId: 6, subjectId: 8,  teacherId: 8 },
  { classId: 4, subjectId: 9,  teacherId: 8 },
  { classId: 5, subjectId: 9,  teacherId: 8 },
];

// --- Fee settings ------------------------------------------
export const feeSettings = [
  { classId: 1, term: '2024/2025 — Term 2', amount: 50000 },
  { classId: 2, term: '2024/2025 — Term 2', amount: 55000 },
  { classId: 3, term: '2024/2025 — Term 2', amount: 60000 },
  { classId: 4, term: '2024/2025 — Term 2', amount: 75000 },
  { classId: 5, term: '2024/2025 — Term 2', amount: 75000 },
  { classId: 6, term: '2024/2025 — Term 2', amount: 80000 },
];

// --- Payments ----------------------------------------------
export const payments = [
  { id: 1,  studentId: 1,  amount: 75000, date: '2025-01-15', method: 'Bank Transfer' },
  { id: 2,  studentId: 2,  amount: 75000, date: '2025-01-12', method: 'POS' },
  { id: 3,  studentId: 3,  amount: 25000, date: '2025-01-20', method: 'Cash' },
  { id: 4,  studentId: 3,  amount: 20000, date: '2025-02-10', method: 'Bank Transfer' },
  { id: 5,  studentId: 4,  amount: 75000, date: '2025-01-08', method: 'Bank Transfer' },
  { id: 6,  studentId: 5,  amount: 25000, date: '2025-01-25', method: 'Cash' },
  { id: 7,  studentId: 6,  amount: 60000, date: '2025-01-10', method: 'POS' },
  { id: 8,  studentId: 7,  amount: 75000, date: '2025-01-14', method: 'Bank Transfer' },
  { id: 9,  studentId: 8,  amount: 20000, date: '2025-01-18', method: 'Cash' },
  { id: 10, studentId: 8,  amount: 15000, date: '2025-02-15', method: 'POS' },
  { id: 11, studentId: 9,  amount: 75000, date: '2025-01-06', method: 'Bank Transfer' },
  { id: 12, studentId: 10, amount: 55000, date: '2025-01-11', method: 'Bank Transfer' },
  { id: 13, studentId: 11, amount: 80000, date: '2025-01-05', method: 'Bank Transfer' },
  { id: 14, studentId: 12, amount: 20000, date: '2025-02-01', method: 'Cash' },
  { id: 15, studentId: 13, amount: 80000, date: '2025-01-07', method: 'POS' },
  { id: 16, studentId: 14, amount: 55000, date: '2025-01-13', method: 'Bank Transfer' },
  { id: 17, studentId: 15, amount: 75000, date: '2025-01-09', method: 'Bank Transfer' },
  { id: 18, studentId: 16, amount: 50000, date: '2025-01-16', method: 'POS' },
  { id: 19, studentId: 17, amount: 50000, date: '2025-01-22', method: 'Cash' },
  { id: 20, studentId: 18, amount: 60000, date: '2025-01-19', method: 'Bank Transfer' },
  { id: 21, studentId: 19, amount: 55000, date: '2025-01-17', method: 'Bank Transfer' },
  { id: 22, studentId: 20, amount: 75000, date: '2025-01-10', method: 'POS' },
];

// --- Announcements -----------------------------------------
export const announcements = [
  { id: 1, title: 'Mid-Term Break Notice',          date: '2025-02-14', body: 'The school will be on a short mid-term break from Monday 17th to Wednesday 19th February. Classes resume on Thursday 20th February by 8:00 AM. Please ensure all students return with their textbooks and assignments.' },
  { id: 2, title: 'Inter-House Sports Competition',  date: '2025-02-08', body: 'The annual inter-house sports competition holds on Friday 28th February at the school sports complex. Students should come in their house jerseys. Parents are welcome to attend and cheer.' },
  { id: 3, title: 'Parent-Teacher Meeting',          date: '2025-01-30', body: 'A Parent-Teacher meeting will hold on Saturday 8th February from 10:00 AM to 1:00 PM. Parents are encouraged to attend to discuss their ward\'s academic progress for the term.' },
  { id: 4, title: 'Second Term Fees Reminder',       date: '2025-01-20', body: 'This is a reminder that outstanding second-term fees should be settled before the end of January. Kindly visit the school\'s accounts office or make a bank transfer. Thank you for your cooperation.' },
];

// --- Events ------------------------------------------------
export const events = [
  { id: 1, title: 'Inter-House Sports Day',     date: '2025-02-28', day: '28', month: 'Feb', description: 'Annual sports competition' },
  { id: 2, title: 'Science Fair Exhibition',     date: '2025-03-07', day: '7',  month: 'Mar', description: 'Student science projects showcase' },
  { id: 3, title: 'Cultural Day Celebration',    date: '2025-03-14', day: '14', month: 'Mar', description: 'Cultural performances & food festival' },
  { id: 4, title: 'End of Term Examinations',    date: '2025-03-24', day: '24', month: 'Mar', description: 'Term 2 final exams begin' },
];

// --- Attendance records ------------------------------------
export const attendanceRecords = [
  { studentId: 1, daysPresent: 18, daysAbsent: 2, totalDays: 20 },
  { studentId: 2, daysPresent: 20, daysAbsent: 0, totalDays: 20 },
  { studentId: 3, daysPresent: 16, daysAbsent: 4, totalDays: 20 },
  { studentId: 4, daysPresent: 19, daysAbsent: 1, totalDays: 20 },
  { studentId: 5, daysPresent: 15, daysAbsent: 5, totalDays: 20 },
  { studentId: 6, daysPresent: 17, daysAbsent: 3, totalDays: 20 },
  { studentId: 7, daysPresent: 20, daysAbsent: 0, totalDays: 20 },
  { studentId: 8, daysPresent: 14, daysAbsent: 6, totalDays: 20 },
  { studentId: 9, daysPresent: 19, daysAbsent: 1, totalDays: 20 },
  { studentId: 10, daysPresent: 18, daysAbsent: 2, totalDays: 20 },
];

// --- Today's attendance roster (for teacher) ---------------
export const todayRoster = [
  { studentId: 1,  name: 'Chidera Eze',      status: 'present' },
  { studentId: 2,  name: 'Adaeze Nwosu',     status: 'present' },
  { studentId: 5,  name: 'Obinna Chukwu',    status: 'absent'  },
  { studentId: 9,  name: 'Kelechi Nnadi',    status: 'present' },
  { studentId: 20, name: 'Chioma Nwachukwu', status: 'late'    },
];

// --- Schedule (teacher today) ------------------------------
export const schedule = [
  { time: '08:00 AM', subject: 'Mathematics',         class: 'SS1',  period: 1 },
  { time: '09:00 AM', subject: 'Mathematics',         class: 'SS2',  period: 2 },
  { time: '10:30 AM', subject: 'Further Mathematics', class: 'SS2',  period: 3 },
  { time: '11:30 AM', subject: 'Mathematics',         class: 'SS1',  period: 4 },
  { time: '01:00 PM', subject: 'Further Mathematics', class: 'SS1',  period: 5 },
];

// --- Exam questions (sample CBT) ---------------------------
export const examQuestions = [
  { id: 1, subject: 'Mathematics', question: 'Solve for x: 2x + 5 = 17',                          options: ['x = 4', 'x = 6', 'x = 8', 'x = 12'],          correct: 1 },
  { id: 2, subject: 'Mathematics', question: 'What is the value of √144?',                         options: ['10', '11', '12', '14'],                         correct: 2 },
  { id: 3, subject: 'Mathematics', question: 'Simplify: 3(2x − 4) + 6',                           options: ['6x − 6', '6x − 18', '6x + 6', '6x − 12'],     correct: 0 },
  { id: 4, subject: 'Mathematics', question: 'If the area of a circle is 154 cm², find the radius (π = 22/7).', options: ['7 cm', '14 cm', '49 cm', '21 cm'],  correct: 0 },
  { id: 5, subject: 'Mathematics', question: 'Express 0.00456 in standard form.',                  options: ['4.56 × 10⁻³', '4.56 × 10⁻²', '45.6 × 10⁻⁴', '4.56 × 10³'], correct: 0 },
  { id: 6, subject: 'Mathematics', question: 'Find the LCM of 12, 15, and 20.',                    options: ['30', '60', '120', '180'],                       correct: 1 },
  { id: 7, subject: 'Mathematics', question: 'What is the gradient of the line y = 3x − 7?',       options: ['−7', '3', '−3', '7'],                           correct: 1 },
  { id: 8, subject: 'Mathematics', question: 'A triangle has angles 50° and 60°. Find the third angle.', options: ['80°', '70°', '90°', '50°'],                correct: 1 },
  { id: 9, subject: 'Mathematics', question: 'Evaluate: 2⁵ × 2³',                                 options: ['2⁸', '2¹⁵', '4⁸', '2²'],                       correct: 0 },
  { id: 10,subject: 'Mathematics', question: 'What is 15% of ₦24,000?',                           options: ['₦3,000', '₦3,600', '₦4,200', '₦2,400'],        correct: 1 },
];

// --- Exam settings (shared by teacher creation + student CBT) ---
export const examSettings = {
  subject: 'Mathematics',
  class: 'SS2',
  opens: '2025-03-24T09:00',
  closes: '2025-03-24T12:00',
  duration: 30,
  published: true,
};

// --- CBT scores (%), keyed by subject then studentId -------
export const cbtScores = {
  Mathematics: { 2: 90, 5: 60, 9: 70, 20: 80 },
};

// --- Results (term) ----------------------------------------
export const results = [
  { studentId: 1, subject: 'Mathematics',        score: 82, remark: 'Excellent work', term: '2024/2025 — Term 1' },
  { studentId: 1, subject: 'English Language',    score: 71, remark: 'Good effort',    term: '2024/2025 — Term 1' },
  { studentId: 1, subject: 'Physics',             score: 68, remark: 'Fair',           term: '2024/2025 — Term 1' },
  { studentId: 1, subject: 'Chemistry',           score: 75, remark: 'Very good',      term: '2024/2025 — Term 1' },
  { studentId: 1, subject: 'Biology',             score: 79, remark: 'Very good',      term: '2024/2025 — Term 1' },
  { studentId: 1, subject: 'Computer Science',    score: 88, remark: 'Outstanding',    term: '2024/2025 — Term 1' },
  { studentId: 1, subject: 'Economics',           score: 65, remark: 'Satisfactory',   term: '2024/2025 — Term 1' },
  { studentId: 1, subject: 'Further Mathematics', score: 72, remark: 'Good effort',    term: '2024/2025 — Term 1' },
  { studentId: 2, subject: 'Mathematics',         score: 91, remark: 'Outstanding',    term: '2024/2025 — Term 1' },
  { studentId: 2, subject: 'English Language',     score: 85, remark: 'Excellent',      term: '2024/2025 — Term 1' },
  { studentId: 3, subject: 'Mathematics',         score: 54, remark: 'Needs improvement', term: '2024/2025 — Term 1' },
  { studentId: 3, subject: 'English Language',     score: 62, remark: 'Fair',           term: '2024/2025 — Term 1' },
];

// --- Resources (uploaded files) ----------------------------
export const resources = [
  { id: 1, title: 'Quadratic Equations — Notes',     subject: 'Mathematics',      class: 'SS2', type: 'PDF',   uploadDate: '2025-02-10', teacher: 'Mrs. Ngozi Okafor' },
  { id: 2, title: 'Comprehension Practice Set 3',    subject: 'English Language', class: 'JSS2', type: 'PDF',   uploadDate: '2025-02-08', teacher: 'Mr. Emeka Nwankwo' },
  { id: 3, title: 'Newton\'s Laws Diagram',          subject: 'Physics',          class: 'SS1', type: 'Image', uploadDate: '2025-02-05', teacher: 'Mrs. Funke Adesanya' },
  { id: 4, title: 'Periodic Table Reference Sheet',  subject: 'Chemistry',        class: 'SS2', type: 'PDF',   uploadDate: '2025-02-03', teacher: 'Mr. Ibrahim Musa' },
  { id: 5, title: 'Cell Biology Slides',             subject: 'Biology',          class: 'SS1', type: 'PDF',   uploadDate: '2025-01-28', teacher: 'Mrs. Blessing Udoh' },
  { id: 6, title: 'Python Basics — Lesson 4',        subject: 'Computer Science', class: 'SS2', type: 'PDF',   uploadDate: '2025-02-12', teacher: 'Mr. Chinedu Okonkwo' },
];

// --- Shared UI state (e.g. which class to open on Attendance) ---
export const uiState = { attendanceClass: null };

// --- Helpers -----------------------------------------------
export function nextId(list) {
  return list.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;
}

export function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

export function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function formatCurrency(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG');
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getStudent(studentId) {
  return students.find(s => s.id === studentId);
}

export function getStudentsByClass(className) {
  return students.filter(s => s.class === className);
}

export function getPaymentsForStudent(studentId) {
  return payments.filter(p => p.studentId === studentId);
}

export function getResultsForStudent(studentId) {
  return results.filter(r => r.studentId === studentId);
}

export function getAttendanceForStudent(studentId) {
  return attendanceRecords.find(a => a.studentId === studentId);
}

export function getTotalCollected() {
  return students.reduce((sum, s) => sum + s.amountPaid, 0);
}

export function getTotalOutstanding() {
  return students.reduce((sum, s) => sum + (s.amountDue - s.amountPaid), 0);
}
