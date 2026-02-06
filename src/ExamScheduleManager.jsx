import React, { useMemo, useState } from "react";

const mockExams = [
  { id: 1, subject: "Mathematics", date: "2026-03-01", time: "09:00 AM", department: "Science", semester: "Sem 1" },
  { id: 2, subject: "Physics", date: "2026-03-03", time: "01:00 PM", department: "Science", semester: "Sem 1" },
  { id: 3, subject: "Chemistry", date: "2026-03-05", time: "09:00 AM", department: "Science", semester: "Sem 2" },
  { id: 4, subject: "Biology", date: "2026-03-07", time: "11:00 AM", department: "Science", semester: "Sem 2" },
  { id: 5, subject: "Environmental Science", date: "2026-03-09", time: "02:00 PM", department: "Science", semester: "Sem 3" },
  { id: 6, subject: "Data Structures", date: "2026-03-02", time: "10:00 AM", department: "Engineering", semester: "Sem 3" },
  { id: 7, subject: "Operating Systems", date: "2026-03-04", time: "02:00 PM", department: "Engineering", semester: "Sem 3" },
  { id: 8, subject: "Database Management Systems", date: "2026-03-06", time: "09:30 AM", department: "Engineering", semester: "Sem 4" },
  { id: 9, subject: "Computer Networks", date: "2026-03-08", time: "01:30 PM", department: "Engineering", semester: "Sem 4" },
  { id: 10, subject: "Software Engineering", date: "2026-03-10", time: "10:00 AM", department: "Engineering", semester: "Sem 5" },
  { id: 11, subject: "Economics", date: "2026-03-11", time: "09:00 AM", department: "Arts", semester: "Sem 1" },
  { id: 12, subject: "English Literature", date: "2026-03-12", time: "11:00 AM", department: "Arts", semester: "Sem 2" },
  { id: 13, subject: "History", date: "2026-03-13", time: "01:00 PM", department: "Arts", semester: "Sem 3" },
  { id: 14, subject: "Psychology", date: "2026-03-14", time: "10:30 AM", department: "Arts", semester: "Sem 4" },
];

const departments = ["All", ...new Set(mockExams.map((exam) => exam.department))];
const semesters = ["All", ...new Set(mockExams.map((exam) => exam.semester))];

const departmentStyles = {
  Science: "bg-emerald-500/90 text-white ring-1 ring-emerald-300/50",
  Engineering: "bg-sky-500/90 text-white ring-1 ring-sky-300/50",
  Arts: "bg-fuchsia-500/90 text-white ring-1 ring-fuchsia-300/50",
};

export default function ExamScheduleManager() {
  const [department, setDepartment] = useState("All");
  const [semester, setSemester] = useState("All");
  const [search, setSearch] = useState("");
  const [compact, setCompact] = useState(false);

  const filteredExams = useMemo(
    () =>
      mockExams.filter(
        (exam) =>
          (department === "All" || exam.department === department) &&
          (semester === "All" || exam.semester === semester) &&
          exam.subject.toLowerCase().includes(search.toLowerCase())
      ),
    [department, semester, search]
  );

  const nextExam = filteredExams[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.2),_transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200/80">
                Academic calendar 2026
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Exam Schedule Manager
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-indigo-100/80 sm:text-base">
                Curated timelines, smart filtering, and a premium overview of upcoming exams across departments.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-indigo-100/90 shadow-lg">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/90 text-lg">
                🎓
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Next Exam</p>
                <p className="font-semibold text-white">
                  {nextExam ? `${nextExam.subject} · ${nextExam.date}` : "No upcoming exams"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Filters</h2>
                <p className="text-sm text-indigo-100/70">Refine by department, semester, or subject.</p>
              </div>
              <label className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-indigo-100">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-400"
                  checked={compact}
                  onChange={(event) => setCompact(event.target.checked)}
                />
                Compact view
              </label>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="relative">
                <span className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Search</span>
                <input
                  type="text"
                  placeholder="Search subject..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-indigo-200/60 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <label className="relative">
                <span className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Department</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} className="text-slate-900">
                      {dept}
                    </option>
                  ))}
                </select>
              </label>
              <label className="relative sm:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Semester</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                  value={semester}
                  onChange={(event) => setSemester(event.target.value)}
                >
                  {semesters.map((sem) => (
                    <option key={sem} className="text-slate-900">
                      {sem}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-slate-950/60 to-purple-500/20 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Overview</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Exam Insights</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-indigo-100">
                Updated just now
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Total exams</p>
                <p className="mt-2 text-3xl font-semibold text-white">{filteredExams.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Departments</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {departments
                    .filter((dept) => dept !== "All")
                    .map((dept) => (
                      <span
                        key={dept}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-indigo-100"
                      >
                        {dept}
                      </span>
                    ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Semester focus</p>
                <p className="mt-2 text-sm text-indigo-100/80">
                  {semester === "All"
                    ? "Viewing all semesters across departments."
                    : `Now highlighting ${semester} for ${department === "All" ? "all departments" : department}.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Upcoming Exams</h2>
              <p className="text-sm text-indigo-100/70">Premium view with live filters.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-100/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              On schedule
              <span className="ml-3 h-2 w-2 rounded-full bg-fuchsia-400" />
              Confirmed
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/10 text-left text-xs uppercase tracking-[0.2em] text-indigo-100/80">
                <tr>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Semester</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.length ? (
                  filteredExams.map((exam) => (
                    <tr
                      key={exam.id}
                      className="border-t border-white/5 transition hover:bg-white/10"
                    >
                      <td className="px-4 py-4 font-semibold text-white">{exam.subject}</td>
                      <td className="px-4 py-4 text-indigo-100/80">{exam.date}</td>
                      <td className="px-4 py-4 text-indigo-100/80">{exam.time}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                            departmentStyles[exam.department]
                          }`}
                        >
                          <span className="h-2 w-2 rounded-full bg-white/70" />
                          {exam.department}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-indigo-100/80">
                        <span
                          className={`inline-flex rounded-full border border-white/10 px-3 py-1 ${
                            compact ? "text-[0.65rem] uppercase tracking-[0.25em]" : "text-xs"
                          }`}
                        >
                          {exam.semester}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-10 text-center text-indigo-100/70">
                      No exams found for this combination. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
