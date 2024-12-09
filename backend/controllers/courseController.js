
let courses = require('../data/courseData')

exports.allCourses = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            msg: "Courses fetched successfully",
            courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "An error occurred while fetching courses",
            error: error.message,
        });
    }
};
exports.allOngoingCoursesFiltered = (req, res) => {
    const { open } = req.query;
    let filteredCourses = courses;

    if (open !== undefined) {
        filteredCourses = filteredCourses.filter(course => course.open === (open === 'true'));
    }
    res.status(200).json({
        success: true,
        msg: "Filtered ongoing courses fetched successfully",
        courses: filteredCourses,
    });
};
exports.addOngoingCourse = (req, res) => {
    const { id, name, department, open } = req.body;

    const existingCourse = courses.find(course => course.id === id);
    if (existingCourse) {
        return res.status(400).json({
            success: false,
            msg: "Course with the given ID already exists",
        });
    }

    const newCourse = { id, name, department, open };
    courses.push(newCourse);
    res.status(201).json({
        success: true,
        msg: "Ongoing course added successfully",
        newCourse,
    });
};
exports.addCourse = (req, res) => {
    const { studentId } = req.params;
    const { courseId, courseName, courseDepartment, open } = req.body;

    const student = students.find(s => s.id === parseInt(studentId));

    if (!student) {
        return res.status(404).json({ success: false, msg: 'Student not found' });
    }

    const newCourse = { id: courseId, name: courseName, department: courseDepartment, open };
    student.enrolledCourses.push(newCourse);

    res.status(201).json({ success: true, msg: 'Course added to enrolled list', course: newCourse });
};



exports.updateCourse = (req, res) => {
    const { studentId, courseId } = req.params;
    const { status } = req.body;

    const student = students.find(s => s.id === parseInt(studentId));

    if (!student) {
        return res.status(404).json({ success: false, msg: 'Student not found' });
    }

    let course = student.enrolledCourses.find(c => c.id === parseInt(courseId));

    if (course) {
        if (status === 'completed') {
            student.enrolledCourses = student.enrolledCourses.filter(c => c.id !== parseInt(courseId)); // Remove from enrolled
            student.completedCourses.push(course);
            return res.status(200).json({ success: true, msg: 'Course moved to completed', course });
        }
        return res.status(400).json({ success: false, msg: 'Invalid status update' });
    }

    course = student.completedCourses.find(c => c.id === parseInt(courseId));

    if (course && status === 'enrolled') {
        student.completedCourses = student.completedCourses.filter(c => c.id !== parseInt(courseId)); // Remove from completed
        student.enrolledCourses.push(course);
        return res.status(200).json({ success: true, msg: 'Course moved back to enrolled', course });
    }

    return res.status(404).json({ success: false, msg: 'Course not found in enrolled or completed lists' });
};
exports.deleteCourse = (req, res) => {
    const { studentId, courseId } = req.params;

    const student = students.find(s => s.id === parseInt(studentId));

    if (!student) {
        return res.status(404).json({ success: false, msg: 'Student not found' });
    }

    student.enrolledCourses = student.enrolledCourses.filter(c => c.id !== parseInt(courseId));

    student.completedCourses = student.completedCourses.filter(c => c.id !== parseInt(courseId));

    res.status(200).json({ success: true, msg: 'Course deleted successfully' });
};
