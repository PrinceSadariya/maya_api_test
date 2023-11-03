const sql = require("mssql");

//for fetch all users
// Add pagination to fetch users
module.exports.getEmployee = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const offset = (page - 1) * perPage;

    const query = `SELECT * FROM emp ORDER BY emp_id OFFSET ${offset} ROWS FETCH NEXT ${perPage} ROWS ONLY`;

    sql.query(query, (err, recordset) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }

      return res.status(200).json({
        success: true,
        message: "Employees fetched successfully",
        employees: recordset.recordset,
      });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

//for register a new user
module.exports.registerEmployee = (req, res, next) => {
  const {
    emp_firstname,
    emp_lastname,
    emp_email,
    emp_mobile,
    emp_salary,
    emp_designation,
    emp_address,
  } = req.body;

  try {
    const query = `INSERT INTO [dbo].[emp]
                    ([emp_firstname]
                    ,[emp_lastname]
                    ,[emp_email]
                    ,[emp_mobile]
                    ,[emp_salary]
                    ,[emp_designation]
                    ,[emp_address])
                VALUES
                    ('${emp_firstname}', '${emp_lastname}', '${emp_email}', '${emp_mobile}', '${emp_salary}', '${emp_designation}', '${emp_address}')`;

    sql.query(query, (err, recordset) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }

      return res
        .status(201)
        .json({ success: true, message: "employee registred successfully" });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

//for update a  user
module.exports.updateEmployee = (req, res, next) => {
  const { id } = req.params;

  const {
    emp_firstname,
    emp_lastname,
    emp_email,
    emp_mobile,
    emp_salary,
    emp_designation,
    emp_address,
  } = req.body;

  try {
    sql.query(`select * from emp where emp_id='${id}'`, (err, recordset) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }

      if (recordset.rowsAffected[0] === 0) {
        return res.status(400).json({
          success: false,
          message: "Employee does not exists with given id",
        });
      } else {
        // employee with given id is exist
        // now we can update details of employee

        let query = "update emp set ";

        //seetting up new object for updation
        if (emp_firstname) {
          query += `emp_firstname='${emp_firstname}',`;
        }
        if (emp_lastname) {
          query += `emp_lastname='${emp_lastname}',`;
        }
        if (emp_email) {
          query += `emp_email='${emp_email}',`;
        }
        if (emp_mobile) {
          query += `emp_mobile='${emp_mobile}',`;
        }
        if (emp_salary) {
          query += `emp_salary='${emp_salary}',`;
        }
        if (emp_designation) {
          query += `emp_designation='${emp_designation}',`;
        }
        if (emp_address) {
          query += `emp_address='${emp_address}',`;
        }

        //checking , there should be at least one detail to update record
        if (query === "update emp set ") {
          return res.status(400).json({
            success: false,
            message:
              "Please provide at least one detail to update employee detail",
          });
        } else {
          query = query.slice(0, -1);

          query += ` where emp_id='${id}'`;
          //   console.log(query);

          sql.query(query, (err, recordset1) => {
            if (err) {
              return res.status(500).json({ success: false, message: err });
            } else {
              return res.status(200).json({
                success: true,
                message: "Employee details updated successfully",
              });
            }
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

//for delete a  user
module.exports.deleteEmployee = (req, res, next) => {
  const { id } = req.params;

  try {
    sql.query(`select * from emp where emp_id='${id}'`, (err, recordset) => {
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }

      if (recordset.rowsAffected[0] === 0) {
        return res.status(400).json({
          success: false,
          message: "Employee does not exists with given id",
        });
      } else {
        // employee with given id is exist
        // now we can delete employee

        sql.query(`delete from emp where emp_id='${id}'`, (err, recordset1) => {
          if (err) {
            return res.status(500).json({ success: false, message: err });
          } else {
            return res.status(200).json({
              success: true,
              message: "Employee details deleted successfully",
            });
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};
