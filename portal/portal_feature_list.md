# Alimo EduCloud School Portal — Full Feature List

Three roles, one login, one shared codebase. No separate parent account — parents use the student's login.

## Login (shared, all roles)

One login screen for everyone. The account itself determines what the person sees after logging in — no role selector, no separate URLs per role. Includes a "Forgot password" flow.

## Admin

**Dashboard** — Landing view on login. Summary cards: total students enrolled, total teachers, fees collected this term vs. fees outstanding, upcoming events. Quick-action bar to enroll a new student or post an announcement without leaving the dashboard.

**Students (Student Registry)** — Searchable, filterable table of every enrolled student: name, class, admission number, guardian contact, and fee status shown as a colored tag (paid/overdue). Search bar plus a class filter. "Enroll new student" opens a form: name, date of birth, class, guardian name, guardian phone. Each row links to view/edit that student's full profile.

**Teachers (Teacher Management)** — Table of every teacher: name, subjects taught, classes assigned, contact info. "Add teacher" opens a form: name, email, phone, subject/class assignment. A teacher who leaves is deactivated (status tag: Active/Inactive), never deleted, so historical records stay intact.

**Classes & Subjects (Academic)** — Two linked panels: classes on the left (e.g. JSS1-SS3, each with a student count), subjects for the selected class on the right, each showing which teacher teaches it. "Add class" and "Add subject" actions. Assigning a teacher to a subject is a dropdown next to that subject's row.

**Fee Management** — Admin sets the termly fee amount per class/term (select class, enter amount, select term). Summary bar: total collected vs. total outstanding for the current term. Student ledger table below: balance and last payment date per student, sortable by outstanding amount. Since there's no payment gateway, each row has a "Record payment" action — amount, date, method (bank transfer/cash/POS) — that updates the student's balance immediately when Admin logs a payment made directly to the school.

**Announcements & Events** — Admin posts announcements/events (title, date, body, optional image) to a shared feed visible to Teachers and Students alike.

**Results oversight** — Visibility into results/attendance across the school via the Dashboard; actual entry happens on the Teacher side.

## Teacher

**Dashboard** — Landing view. Today's class schedule with a one-tap "Mark attendance" action next to each period. Short list of any results still pending entry.

**Mark Attendance** — Class roster for a selected class/period. Every student defaults to Present; the teacher only toggles exceptions (Absent/Late). Single "Save" action commits the whole day at once — no need to individually confirm each present student.

**Exam Creation (CBT question bank)** — Choose subject and class, set the exam window (open/close date-time) and duration. Build a running list of multiple-choice questions: question text, four options, correct answer marked, with edit/delete per question. "Publish exam" stays disabled until at least one question exists — this is also where exam/term structure and grading configuration live, since there's no separate "Exam Master" screen; it's folded into this creation flow.

**Results Entry** — Select class and subject, then an editable score field next to every student in that class, plus an optional remark field. If a student already has a CBT score, it auto-populates the field so the teacher can see what's already filled in vs. what needs manual entry. "Save results" commits the term's scores.

**Resources (upload)** — Select class and subject, then drag-and-drop (or browse) to upload a file — PDF, image, or document — with a title. Below it, a list of everything already shared for that class/subject: file name, type icon, upload date, delete action.

## Student (shared login with parent)

**Dashboard** — Landing view. Greeting card with the student's name, class, and photo. Attendance summary badge (e.g. "18/20 days present"). Fees balance card — a clear balance shown when money is owed, or a quiet "Fully paid" state when it isn't. Latest announcement shown here too.

**Attendance summary** — Read-only. Term summary of days present vs. absent, shown as both a raw number and a percentage.

**Fees & Payment** — Termly amount due, amount already paid, and the remaining balance as one running total (not itemized line items). Payment history list below: date, amount, and method for each payment the school has logged. No "Pay now" button — this is a statement, not a checkout, since fees are paid directly to the school and recorded by Admin.

**CBT Exam (taking)** — Deliberately stripped of navigation chrome — no sidebar, nothing else on screen. Progress indicator and countdown timer at the top, one multiple-choice question at a time, Previous/Next controls, a flag icon to mark a question for review via a slide-out panel, and a confirmation step before final submission so an exam can't end by accident.

**Results / Report card** — Per-term view: subject-by-subject scores, overall average, and a teacher's remark, styled to read like an official record rather than a plain data table.

**Resources (view)** — Files shared by teachers, grouped by subject, each showing file name, type icon, and share date. Tapping opens or downloads it. A quiet empty state ("No resources shared yet for this subject") when there's nothing there yet.

## System-wide, not tied to one role

**SMS notifications (Termii)** — Currently scoped to results: when a teacher publishes results, an SMS goes out to the parent/student's phone ("Your ward's result is ready — log in to view/print"). Chosen over portal-only because SMS reaches Nigerian parents reliably regardless of smartphone or data access, and over email because it's more consistently checked in this context. Can extend later to fees-due or exam-scheduled notifications if wanted — not built yet.

**Running balance fee model** — Every student has an amount due, amount paid, and a payment history log, rather than a simple paid/unpaid flag — built this way in case the school ever wants to allow installment payments later, without needing to migrate existing fee data.

## Deliberately excluded

Carried over from the old system and deliberately cut during planning: Live Class Rooms, Leave Application, Homework, and a standalone Supervision menu — none of these are being rebuilt. Also excluded by decision, not oversight: any online payment gateway (Paystack was considered, then dropped — fees are fully offline), a separate parent account (parents share the student's login), and a native mobile app (one responsive web app serves all three roles, no App Store/Play Store build).
