
let students = require('../data/studentData')

exports.allStudents = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            msg: "Students fetched successfully",
            students,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "An error occurred while fetching students",
            error: error.message,
        });
    }
};
exports.singleStudent = async (req, res) => {
    let { id } = req.params;

    try {
        let singleStudent = students.find(student => student.id == id);

        if (singleStudent) {
            const avgGrade = calculateAverageGrade(singleStudent.completedCourses);
            res.status(200).json({ ...singleStudent, averageGrade: avgGrade });
        } else {
            res.status(404).json({ msg: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "An error occurred while fetching the student",
            error: error.message,
        });
    }
};

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    console.log('ids: ', id);

    try {
        const studentIndex = students.findIndex(student => student.id == id);

        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);
            res.status(200).json({ msg: "Student deleted successfully" });
        } else {
            res.status(404).json({ msg: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "An error occurred while deleting the student",
            error: error.message,
        });
    }
};

function calculateAverageGrade(completedCourses) {
    return completedCourses.length ? (completedCourses.length * 4.0) / completedCourses.length : 0.0;
}


exports.allStudentsFiltered = (req, res) => {
    const { id, name, department } = req.query;
    let filteredStudents = students;

    if (id) {
        filteredStudents = filteredStudents.filter(student => student.id.toString() === id);
    }

    if (name) {
        filteredStudents = filteredStudents.filter(student => student.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (department) {
        filteredStudents = filteredStudents.filter(student => student.department.toLowerCase() === department.toLowerCase());
    }

    res.status(200).json({
        success: true,
        msg: "Filtered students fetched successfully",
        students: filteredStudents,
    });
};
exports.addStudent = (req, res) => {
    const { id, name, department, enrolledCourses, completedCourses } = req.body;
    console.log('req.body: ', req.body);
    try {
        const existingStudent = students.find(student => student.id === id);
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                msg: "Student with the given ID already exists",
            });
        }

        const newStudent = { id, name, department, enrolledCourses, completedCourses };
        students.push(newStudent);
        res.status(201).json({
            success: true,
            msg: "Student added successfully",
            newStudent,
        });
    } catch {
        res.status(201).json({
            success: false,
            msg: "There was an error occurred while adding the student",

        });
    }
};
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { enrolledCourses, completedCourses } = req.body;
    console.log('req.body: ', req.body, id);

    try {
        const student = students.find(student => student.id == id);
        console.log('student: ', student);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.enrolledCourses = enrolledCourses;
        student.completedCourses = completedCourses;

        res.status(200).json(student);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ message: 'Error updating student courses', error: error.message });
    }
};