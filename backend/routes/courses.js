let express = require("express");
const {
    allCourses, allOngoingCoursesFiltered, addOngoingCourse, addCourse, updateCourse, deleteCourse
} = require("../controllers/courseController");

let router = express.Router();

router.route("/allCourses").get(allCourses);
router.route("/allOngoingCoursesFiltered").get(allOngoingCoursesFiltered);
router.route("/addOngoingCourse").post(addOngoingCourse);
router.route('/:studentId/courses').post(addCourse);

router.route('/:studentId/courses/:courseId').put(updateCourse);

router.route('/:studentId/courses/:courseId').delete(deleteCourse);
module.exports = router;
