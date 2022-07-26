const db1 = require('../config/auth_db');

exports.getUsers = async (req, res) => {
  const { user } = req;
  if (!user)
    return res.status(401).json({ msg: 'not logged in', success: false });
  return res.send(req.body);
};

exports.userprofile = async (req, res) => {
  const user = req.body;
  if (!user)
    return res.status(401).json({ msg: 'not logged in', success: false });
  return res.send(req.body);
};

exports.getuserprofile = async (req, res) => {
  if (req.user.id === undefined) {
    return res.status(401).send({ success: false });
  } else {
    return res.send({ data: req.user, success: true });
  }
};
exports.getuserstate = async (req, res) => {
  if (req.user.id === undefined) {
    return res.status(401).send({ success: false });
  } else {
    return res.send({ success: true });
  }
};

exports.getuserprofilebyid = async (req, res) => {
  db1.execute(
    `SELECT * FROM auth_login WHERE id=? `,
    [req.params],
    (err, result) => {
      if (result.length) {
        return res.send(result);
      } else {
        return res.send({ msg: 'id not found', success: false });
      }
    }
  );
};
exports.getuserbyusername = async (req, res) => {
  const username = req.body.username;
  db1.execute(
    `SELECT * FROM auth_login WHERE username=? `,
    [username],
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already taken!',
          success: false,
        });
      } else {
        return res.send({ msg: 'username found', success: true });
      }
    }
  );
};

exports.searchjobByName = async (req, res) => {
  const name = req.query.name;
  console.log(name, 'in searchjobByName');
  db1.execute(
    `SELECT * FROM job WHERE title LIKE ? `,
    ['%' + name + '%'],
    (err, result) => {
      if (result.length) {
        console.log(result);
        return res.send(result);
      } else {
        return res.send({ msg: 'name not found', success: false });
      }
    }
  );
};

exports.getalljobs = async (req, res) => {
  db1.execute(`SELECT * FROM job `, [], (err, result) => {
    if (result.length) {
      return res.send(result);
    } else {
      return res.send({ msg: 'no jobs found', success: false });
    }
  });
};

exports.getjobbyid = async (req, res) => {
  const id = req.params.id;
  db1.execute(`SELECT * FROM job WHERE id=?`, [id], (err, result) => {
    if (result.length) {
      return res.send(result);
    } else {
      return res.send({ msg: 'no jobs found', success: false });
    }
  });
};

exports.getemployerdetail = async (req, res) => {
  const id = req.params.id;
  console.log(id, 'idddddddddddddd');
  db1.execute(
    `SELECT name, address, est_data, sector,number, email, website, facebook, whatsapp, linkedin, twitter  FROM employer WHERE id=?`,
    [id],
    (err, result) => {
      console.log(result);
      if (result?.length) {
        return res.send(result);
      } else {
        return res.send({ msg: 'employer not found', success: false });
      }
    }
  );
};