import React, { useState } from 'react';
import { addStudent } from '../api';

function AddStudentForm({ onAdd }) {
    const [student, setStudent] = useState('');
    const [Id, setId] = useState('');
    const [studentName, setstudentName] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setsemester] = useState('');
    const [enrolledCourses, setenrolledCourses] = useState('');
    const [completedCourses, setcompletedCourses] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Id && studentName && department && enrolledCourses && semester && completedCourses) {
            try {
                const studentStatic = {

                    id: Id,
                    name: studentName,
                    department,
                    semester,
                    enrolledCourses: enrolledCourses.split(',').map(course => course.trim()),
                    completedCourses: completedCourses.split(',').map(course => course.trim())

                };
                onAdd(studentStatic);
                setStudent('');
                setId('');
                setstudentName('');
                setDepartment('');
                setsemester('');
                setenrolledCourses('');
                setcompletedCourses('');

            } catch {


            }
        }
    };

    return (
        <div className="add-student-course-form">
            <h2>Add a New Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) => setstudentName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Course ID"
                    value={Id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Semester"
                    value={semester}
                    onChange={(e) => setsemester(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enrolled Courses"
                    value={enrolledCourses}
                    onChange={(e) => setenrolledCourses(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Completed Courses"
                    value={completedCourses}
                    onChange={(e) => setcompletedCourses(e.target.value)}
                    required
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddStudentForm;
