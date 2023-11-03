const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");
const employeeSchema = require("../controllers/employee.schema");

//get all employee : GET "/api/employee"
router.get("/fetchall", employeeController.getEmployee);

//register a new employee : POST "/api/employee/register"
router.post(
  "/register",
  employeeSchema.registerEmployee,
  employeeController.registerEmployee
);

//update an existing employee : PUT "/api/employee/update"
router.put(
  "/update/:id",
  employeeSchema.updateEmployee,
  employeeController.updateEmployee
);

//update an existing employee : DELETE "/api/employee/delete"
router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
