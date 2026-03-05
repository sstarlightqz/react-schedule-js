import React, { useState } from 'react';
import './App.css';

function App() {
  const initialData = [
    { id: 1, subject: 'Mathematics', teacher: 'Aj. Somchai', day: 'Monday', start: '08:30', end: '10:10' },
  ];

  const [schedule, setSchedule] = useState(initialData);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ subject: '', teacher: '', day: 'Monday', start: '', end: '' });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newEntry = { ...form, id: Date.now() };
    setSchedule([...schedule, newEntry]);
    setForm({ subject: '', teacher: '', day: 'Monday', start: '', end: '' });
  };

  const deleteCourse = (id) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  return (
    <div className={`app-wrapper ${darkMode ? 'dark-theme' : ''}`}>
      <div className="container">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
        </button>

        <h1 style={{ textAlign: 'center' }}>🏫 Class Schedule: Room 101</h1>

        <form className="form-card" onSubmit={handleAddCourse}>
          <input 
            placeholder="Subject Name" 
            value={form.subject} 
            onChange={(e) => setForm({...form, subject: e.target.value})} 
            required 
          />
          <input 
            placeholder="Teacher" 
            value={form.teacher} 
            onChange={(e) => setForm({...form, teacher: e.target.value})} 
            required 
          />
          <select value={form.day} onChange={(e) => setForm({...form, day: e.target.value})}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          <input type="time" value={form.start} onChange={(e) => setForm({...form, start: e.target.value})} required />
          <input type="time" value={form.end} onChange={(e) => setForm({...form, end: e.target.value})} required />
          <button type="submit" className="btn-add">Add Class</button>
        </form>

        <div className="schedule-grid">
          {schedule.sort((a, b) => a.start.localeCompare(b.start)).map((item) => (
            <div key={item.id} className="course-card">
              <small style={{ color: '#888', fontWeight: 'bold' }}>{item.day}</small>
              <h2>{item.subject}</h2>
              <p>👨‍🏫 {item.teacher}</p>
              <p className="time">⏰ {item.start} - {item.end}</p>
              <button 
                onClick={() => deleteCourse(item.id)}
                style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', marginTop: '10px', padding: 0 }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        
        {schedule.length === 0 && <p style={{ textAlign: 'center' }}>No classes added yet.</p>}
      </div>
    </div>
  );
}

export default App;