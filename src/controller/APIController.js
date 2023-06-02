import pool from "../configs/connectDb";

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.status(200).json({
    message: "ok", //Khi ban dang luot mxh thi thang khac dang hoc
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing required prams",
    });
  }

  await pool.execute(
    "Insert into users (firstName, lastName, email, address) values(?,?,?,?)",
    [firstName, lastName, email, address]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address, !id) {
    return res.status(200).json({
      message: "missing required prams",
    });
  }

  let [user] = await pool.execute(
    "UPDATE  users set firstName=?, lastName=?, email=?, address=? WHERE id =?",
    [firstName, lastName, email, address, id]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.id;  //NHO LA id. dung prams thay body. vi dungn post. khogn dung form nhu luc truoc nua
  if (!userId) {
    return res.status(200).json({
      message: "missing required prams",
    });
  }
  await pool.execute("Delete from users where id = ?", [userId]);

  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
