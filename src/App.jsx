import { useMemo, useState } from 'react';

const schedules = [
  {
    id: 1,
    course: 'Calculus I',
    code: 'MATH-101',
    department: 'Mathematics',
    semester: 'Fall 2024',
    date: '2024-12-10',
    time: '09:00 AM',
    location: 'Hall A',
    instructor: 'Dr. Lin',
  },
  {
    id: 2,
    course: 'General Chemistry',
    code: 'CHEM-110',
    department: 'Chemistry',
    semester: 'Fall 2024',
    date: '2024-12-11',
    time: '01:00 PM',
    location: 'Lab 3',
    instructor: 'Prof. Delgado',
  },
  {
    id: 3,
    course: 'World History',
    code: 'HIST-205',
    department: 'Humanities',
    semester: 'Fall 2024',
    date: '2024-12-12',
    time: '11:00 AM',
    location: 'Hall C',
    instructor: 'Dr. Okafor',
  },
  {
    id: 4,
    course: 'Intro to Programming',
    code: 'CS-105',
    department: 'Computer Science',
    semester: 'Fall 2024',
    date: '2024-12-13',
    time: '03:00 PM',
    location: 'Lab 1',
    instructor: 'Ms. Rivera',
  },
  {
    id: 5,
    course: 'Microeconomics',
    code: 'ECON-102',
    department: 'Economics',
    semester: 'Fall 2024',
    date: '2024-12-14',
    time: '08:00 AM',
    location: 'Hall B',
    instructor: 'Dr. Gupta',
  },
  {
    id: 6,
    course: 'Physics I',
    code: 'PHYS-120',
    department: 'Physics',
    semester: 'Spring 2025',
    date: '2025-05-06',
    time: '10:00 AM',
    location: 'Hall D',
    instructor: 'Prof. Hart',
  },
  {
    id: 7,
    course: 'English Literature',
    code: 'ENG-210',
    department: 'Humanities',
    semester: 'Spring 2025',
    date: '2025-05-07',
    time: '02:00 PM',
    location: 'Hall A',
    instructor: 'Dr. Khan',
  },
  {
    id: 8,
    course: 'Database Systems',
    code: 'CS-240',
    department: 'Computer Science',
    semester: 'Spring 2025',
    date: '2025-05-08',
    time: '09:30 AM',
    location: 'Lab 2',
    instructor: 'Mr. Chen',
  },
  {
    id: 9,
    course: 'Marketing Principles',
    code: 'BUS-160',
    department: 'Business',
    semester: 'Spring 2025',
    date: '2025-05-09',
    time: '12:00 PM',
    location: 'Hall C',
    instructor: 'Ms. Novak',
  },
  {
    id: 10,
    course: 'Biology II',
    code: 'BIO-220',
    department: 'Biology',
    semester: 'Spring 2025',
    date: '2025-05-10',
    time: '04:00 PM',
    location: 'Lab 5',
    instructor: 'Dr. Sinclair',
  },
];

const uniqueValues = (items, key) => [
  'All',
  ...Array.from(new Set(items.map((item) => item[key]))),
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState('All');
  const [date, setDate] = useState('');

  const departments = useMemo(() => uniqueValues(schedules, 'department'), []);
  const semesters = useMemo(() => uniqueValues(schedules, 'semester'), []);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((exam) => {
      const matchesSearch =
        exam.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        department === 'All' || exam.department === department;
      const matchesSemester = semester === 'All' || exam.semester === semester;
      const matchesDate = date === '' || exam.date === date;

      return (
        matchesSearch && matchesDepartment && matchesSemester && matchesDate
      );
    });
  }, [searchTerm, department, semester, date]);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Academic Services Portal</p>
          <h1>Exam Schedule Manager</h1>
          <p className="subtitle">
            Browse upcoming exams, filter by course, and stay on top of your
            semester deadlines.
          </p>
        </div>
        <div className="stats">
          <div>
            <span className="stat-value">{schedules.length}</span>
            <span className="stat-label">Total exams</span>
          </div>
          <div>
            <span className="stat-value">{departments.length - 1}</span>
            <span className="stat-label">Departments</span>
          </div>
          <div>
            <span className="stat-value">{semesters.length - 1}</span>
            <span className="stat-label">Semesters</span>
          </div>
        </div>
      </header>

      <section className="panel">
        <div className="panel-header">
          <h2>Filter exams</h2>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setSearchTerm('');
              setDepartment('All');
              setSemester('All');
              setDate('');
            }}
          >
            Reset filters
          </button>
        </div>
        <div className="filters">
          <label className="field">
            Search course or code
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="e.g. Calculus or CS-105"
            />
          </label>
          <label className="field">
            Department
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Semester
            <select
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
            >
              {semesters.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Exam date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Upcoming exams</h2>
          <span className="badge">{filteredSchedules.length} results</span>
        </div>
        <div className="grid">
          {filteredSchedules.map((exam) => (
            <article key={exam.id} className="card">
              <div className="card-header">
                <div>
                  <p className="card-title">{exam.course}</p>
                  <p className="card-subtitle">{exam.code}</p>
                </div>
                <span className="pill">{exam.semester}</span>
              </div>
              <div className="card-body">
                <div>
                  <p className="meta-label">Department</p>
                  <p className="meta-value">{exam.department}</p>
                </div>
                <div>
                  <p className="meta-label">Date & time</p>
                  <p className="meta-value">
                    {exam.date} · {exam.time}
                  </p>
                </div>
                <div>
                  <p className="meta-label">Location</p>
                  <p className="meta-value">{exam.location}</p>
                </div>
                <div>
                  <p className="meta-label">Instructor</p>
                  <p className="meta-value">{exam.instructor}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredSchedules.length === 0 && (
          <div className="empty-state">
            <h3>No exams match your filters.</h3>
            <p>Try a different course keyword or reset the filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
