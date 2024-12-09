import { useEffect, useState } from 'react';
import './App.css';
import AddStudentCourseForm from './components/addCourse'
import StudentCourseList from './components/courseList'
import StudentList from './components/studentList';
import AddStudentForm from './components/addStudent';
import { addStudent, deleteStudent, fetchStudents } from './api';
function App() {
  const courses = [
    {
      id: 1,
      name: "Data Structures",
      department: "Computer Science",
      isOpen: true,
    },
    {
      id: 2,
      name: "Linear Algebra",
      department: "Mathematics",
      isOpen: true,
    },
    {
      id: 3,
      name: "Organic Chemistry",
      department: "Chemistry",
      isOpen: false,
    },
    {
      id: 4,
      name: 'Intro to Computer Science',
      department: 'Computer Science',
      isOpen: true
    },
    {
      id: 5,
      name: 'Electrical Engineering Basics',
      department: 'Electrical Engineering',
      isOpen: true
    }
  ];
  const students = [
    {
      id: 1,
      name: 'John Doe',
      department: 'Computer Science',
      semester: 3,
      enrolledCourses: ['CS101', 'Math101'],
      completedCourses: ['Math101']
    },
    {
      id: 2,
      name: 'Bob',
      department: 'Electrical Engineering',
      semester: 2,
      enrolledCourses: ['EE101', 'CS102'],
      completedCourses: ['CS101']
    }
  ];
  const [studentCourses, setStudentCourses] = useState(courses);
  const [studentsDataStatic, setStudentsDataStatic] = useState(students);

  const handleAddStudentCourse = (newStudentCourse) => {
    setStudentCourses([...studentCourses, newStudentCourse]);
  };
  const handleAddStudent = (studentStatic) => {
    setStudentsDataStatic([...studentsDataStatic, studentStatic]);
  };
  const [studentsDynamic, setStudentsDynamic] = useState([]);
  const [error, setError] = useState(null);

  const getStudents = async () => {
    try {
      const studentData = await fetchStudents();
      setStudentsDynamic(studentData.students);


    } catch (err) {
      setError('Failed to fetch students.');
    }
  };
  useEffect(() => {

    getStudents();
  }, []);
  const [Newstudents, setNewStudents] = useState([]);

  const handleAddNewStudent = async (newStudent) => {

    try {
      const response = await addStudent(newStudent);
      if (response.success) {
        setNewStudents(prevStudents => [...prevStudents, newStudent]);
        getStudents()
      } else {
        console.error('Failed to add student:', response.message);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  const handleDeleteStudent = async (studentId) => {

    try {
      const response = await deleteStudent(studentId);
      getStudents()
      if (response.success) {
      } else {
        console.error('Failed to delete student:', response.message);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  const updateCourses = () => {
    getStudents()
  };
  return (
    // 
    <div className="App">
      <StudentCourseList studentCourses={studentCourses} />
      <AddStudentCourseForm courses={courses.filter(course => course.isOpen)}
        onAdd={handleAddStudentCourse} />
      <StudentList studentsDataStatic={studentsDataStatic} onDelete={handleDeleteStudent} studentsDynamic={studentsDynamic} onUpdateCourses={updateCourses} />
      <AddStudentForm
        onAdd={handleAddNewStudent} />
    </div>
  );
}

export default App;
