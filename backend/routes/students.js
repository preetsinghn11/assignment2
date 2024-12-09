let express = require("express");
const {
    allStudents, singleStudent, allStudentsFiltered, addStudent, deleteStudent, updateCourse
} = require("../controllers/studentController");

let router = express.Router();

router.route("/allStudents").get(allStudents);
router.route("/singleStudent/:id").get(singleStudent);
router.route("/allStudentsFiltered").get(allStudentsFiltered);
router.route("/addStudent").post(addStudent);
router.route("/deleteStudent/:id").delete(deleteStudent);
router.route("/updateCourse/:id").patch(updateCourse);

module.exports = router;
