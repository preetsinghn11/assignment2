import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../api';

const CourseList = ({ studentCourses }) => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const studentData = await fetchCourses();
                setStudents(studentData.courses);
            } catch (err) {
                setError('Failed to fetch students.');
            }
        };

        getStudents();
        console.log('stad', students);
    }, []);
    return (
        <>
            <div className="student-course-list">
                <h2>Courses List</h2>
                {studentCourses.length === 0 ? (
                    <p>No students enrolled in any courses.</p>
                ) : (
                    <table className="course-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentCourses.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.department}</td>
                                    <td>{item.isOpen ? 'Open' : 'Closed'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {students != null && students.length != 0 && students != undefined ? <div className="student-course-list">
                <h2>Courses List from Backend</h2>
                {students.length === 0 ? (
                    <p>No students enrolled in any courses.</p>
                ) : (
                    <table className="course-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.department}</td>
                                    <td>{item.isOpen ? 'Open' : 'Closed'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div> : ""}
        </>
    );
}

export default CourseList;
