import React, { useEffect, useState } from 'react';

import { updateCourse } from '../api';

const StudentList = ({ studentsDataStatic, studentsDynamic, onDelete, onUpdateCourses }) => {
    const handleMoveCourse = async (studentId, course) => {
        try {
            const updatedStudent = studentsDynamic.find(student => student.id === studentId);
            const enrolledCourses = updatedStudent.enrolledCourses.filter(item => item !== course);
            const completedCourses = [...updatedStudent.completedCourses, course];
            let data = {
                enrolledCourses, completedCourses

            }
            const response = await updateCourse(studentId, data)




            const updatedStudents = studentsDynamic.map(student => {
                if (student.id === studentId) {
                    return {
                        ...student,
                        enrolledCourses,
                        completedCourses
                    };
                }
                return student;
            });

            onUpdateCourses(updatedStudents);
        } catch (error) {
            console.error(error);
        }
    };
    let onDeleteIt = (id) => {
        onDelete(id)
    }
    return (
        <>
            <div className="student-course-list">
                <h2>Students List</h2>
                {studentsDataStatic.length === 0 ? (
                    <p>No students.</p>
                ) : (
                    <table className="course-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Semester</th>
                                <th>enrolledCourses</th>
                                <th>completedCourses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsDataStatic.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.department}</td>
                                    <td>{item.semester}</td>
                                    <td>{item.enrolledCourses.join(', ')}</td>
                                    <td>{item.completedCourses.join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {studentsDynamic != null && studentsDynamic != undefined ? <div className="student-course-list">
                <h2>Courses List from Backend</h2>
                {studentsDynamic.length === 0 ? (
                    <p>No students enrolled in any courses.</p>
                ) : (
                    <table className="course-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Semester</th>
                                <th>enrolledCourses</th>
                                <th>completedCourses</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsDynamic.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.department}</td>
                                    <td>{item.semester}</td>
                                    <td className='text-center'>
                                        {item.enrolledCourses.length > 0 ? (
                                            item.enrolledCourses.map(course => (
                                                <div key={course}>
                                                    {course}
                                                    <br />
                                                    <button onClick={() => handleMoveCourse(item.id, course)}>
                                                        Mark Completed
                                                    </button>
                                                    <br />
                                                    <br />
                                                </div>
                                            ))
                                        ) : (
                                            'No courses enrolled'
                                        )}
                                    </td>
                                    <td>
                                        {Array.isArray(item.completedCourses) && item.completedCourses.length > 0
                                            ? item.completedCourses.join(', ')
                                            : 'No courses completed'}
                                    </td>
                                    <td>
                                        <button onClick={() => onDeleteIt(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div> : ""}
        </>
    );
}

export default StudentList;
