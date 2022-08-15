const db1 = require('../config/auth_db');

require('dotenv').config();

exports.editprofile = async (req, res) => {
  return res.send({ msg: 'profile edited' });
};

exports.applyjob = async (req, res) => {
  employee_id = req.user.id;

  job_id = req.body.id;
  console.log(job_id);

  db1.execute(
    `SELECT * FROM apply_job WHERE job_id = ?  `,
    [job_id],
    (err, result) => {
      if (result.length) {
        return res.send({ msg: 'Job already applied!', posted: false });
      } else {
        db1.execute(
          `INSERT INTO apply_job (employee_id, job_id) VALUES (?,?)`,
          [employee_id, job_id],
          (error, result) => {
            if (error)
              return res.send({ msg: 'error while applying', success: false });
            else {
              return res.send({
                msg: 'Job Applied Sucessfully!',
                success: true,
                posted: false,
              });
            }
          }
        );
      }
    }
  );
};
exports.postfavjob = async (req, res) => {
  id = req.user.id;
  usertype = req.user.usertype;
  job_id = req.body.data.job_id;

  db1.execute(
    `SELECT * FROM liked_jobs WHERE job_id = ?  `,
    [job_id],
    (err, result) => {
      if (result.length) {
        db1.execute(
          `DELETE FROM liked_jobs WHERE job_id= ?`,
          [job_id],
          (err, result) => {
            if (err)
              return res.send({ msg: 'error while deleting', success: false });
            else {
              res.send({ msg: 'deleted', success: true, like: false });
            }
          }
        );
      } else {
        db1.execute(
          `INSERT INTO liked_jobs (employee_id, job_id) VALUES (?,?)`,
          [id, job_id],
          (error, result) => {
            if (error)
              return res.send({ msg: 'error while liking', success: false });
            else {
              res.send({ msg: 'post liked', success: true, like: true });
            }
          }
        );
      }
    }
  );
};

exports.getfavjob = async (req, res) => {
  id = req.user.id;
  db1.execute(
    `SELECT job_id FROM liked_jobs WHERE employee_id=? `,
    [id],
    (err, result) => {
      if (result.length) {
        return res.send(result);
      } else {
        return res.send({ msg: 'no liked jobs', success: false });
      }
    }
  );
};
exports.getfavjobdetails = async (req, res) => {
  id = req.user.id;
  db1.execute(
    `SELECT job_id FROM liked_jobs WHERE employee_id=? `,
    [id],
    (err, result) => {
      if (typeof result !== 'undefined' && result.length > 0) {
        const id = result[0].job_id;

        db1.execute(`SELECT * FROM job WHERE id=?`, [id], (err, results) => {
          if (results.length) {
            return res.send({ results, success: true });
          } else {
            return res.send({ msg: 'no jobs found', success: true });
          }
        });
      } else {
        return res.send({ msg: 'no liked jobs', success: false });
      }
    }
  );
};

exports.changepassword = async (req, res) => {
  return res.send({ msg: 'changed passowrd' });
};

exports.deleteaccount = async (req, res) => {
  return res.send({ msg: 'delete account' });
};

exports.editresume = async (req, res) => {
  return res.send({ msg: 'editresume' });
};
exports.appliedjobs = async (req, res) => {
  const id = req.user.id;
  db1.execute(
    `SELECT * FROM apply_job where employee_id= ?`,
    [id],
    (err, result) => {
      if (err) {
        return res.send({ msg: 'error', success: false });
      } else {
        if (typeof result !== 'undefined' && result.length > 0) {
          const id = result[0].job_id;

          db1.execute(`SELECT * FROM job WHERE id=?`, [id], (err, results) => {
            if (results.length) {
              return res.send({ results, success: true });
            } else {
              return res.send({ msg: 'no jobs found', success: true });
            }
          });
        } else {
          return res.send({ msg: 'Job not found!', success: false });
        }
      }
    }
  );
};

exports.postresume = async (req, res) => {
  return res.send({ msg: 'post resume' });
};
exports.posteducation = async (req, res) => {
  id = req.user.id;
  data = req.body.education;
  console.log(req.user);
  console.log(req.body);
  db1.execute(
    `INSERT INTO education (employee_id, title, institute, fromdate, todate, description) VALUES( ?,?,?,?,?,?) `,
    [id, data.title, data.institute, data.from, data.to, data.description],
    (error, result) => {
      if (error) {
        res.send({ msg: ' error posting education ', success: false });
      }

      if (result) {
        res.send({ msg: 'education data posted', success: true });
      }
    }
  );
};

exports.geteducation = async (req, res) => {
  id = req.user.id;
  db1.execute(
    `SELECT * FROM education WHERE employee_id=?`,
    [id],
    (error, result) => {
      if (error) {
        return res.send({
          msg: 'error while getting education ',
          success: false,
        });
      }
      if (result) {
        return res.send(result);
      }
    }
  );
};
