const whole_details_peremp = require('../models/whole_details_peremp')
const jwt = require('jsonwebtoken')
//login
exports.login = async (req, res) => {
  try {
   
    const { EmployeeID, password } = req.body;
 
    if (!EmployeeID || !password) {
      return res.status(400).json({
        error: "Please provide valid credentials",
      });
    }
    whole_details_peremp.findOne({ EmployeeID }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Invalid Credentials!",
        });
      }

      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Invalid Credentials!",
        });
      }

      // generate a token and send to client
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      const { _id, EmployeeID,
        DOJ, DOB, EmployeeName, Process, ReportTo, TL, Trainer, account_head, client_name, clientname, cm_id, dept_id, dept_name, des_id, designation, df_id, emp_level, img, location, oh, qh, sub_process, th } = user;
        const usertype = 'QMS'      
      return res.json({
        token,
        user: { _id, EmployeeID, DOJ, DOB, EmployeeName, Process, sub_process, clientname, cm_id, ReportTo, account_head, Trainer, TL, oh, qh, th, emp_level, img, client_name, dept_id, dept_name, des_id, designation, df_id, location,usertype },
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

