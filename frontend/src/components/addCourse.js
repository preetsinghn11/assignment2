import React, { useState } from 'react';

function AddStudentCourseForm({ onAdd }) {
    const [student, setStudent] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [department, setDepartment] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (courseId && courseName && department) {
            const newStudentCourse = {

                id: courseId,
                name: courseName,
                department,
                isOpen

            };
            onAdd(newStudentCourse);
            setStudent('');
            setCourseId('');
            setCourseName('');
            setDepartment('');
            setIsOpen(false);
        }
    };

    return (
        <div className="add-student-course-form">
            <h2>Add a New Student-Course List</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Course ID"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
                <label className='chk-label'>
                    <p> Open Course?</p>
                    <input className='checkbox'
                        type="checkbox"
                        checked={isOpen}
                        onChange={(e) => setIsOpen(e.target.checked)}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddStudentCourseForm;
