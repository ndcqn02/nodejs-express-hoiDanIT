import pool from "../configs/connectDb";

let getHomepage = async (req, res) => {
  //logic
  // simple query
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userID = req.params.id;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [userID]);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "Insert into users (firstName, lastName, email, address) values(?,?,?,?)",
    [firstName, lastName, email, address]
  );

  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("Delete from users where id = ?", [userId]);

  return res.redirect("/");
};

let getEditPage = async (req, res) => {

  let userId = req.params.id;  // params trùng với tên đặt ở web.js
  let [user] = await pool.execute("SELECT * FROM users WHERE id =?", [userId]);
  return res.render('update.ejs', { dataUser:  user[0]});  // key and value. ở đây key là dataUser
};

let postUpdateUser = async (req, res) => {
  let {firstName, lastName, email, address, id} = req.body;
  let [user] = await pool.execute("UPDATE  users set firstName=?, lastName=?, email=?, address=? WHERE id =?", [firstName, lastName, email, address, id]);
  return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs');
}

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFilePage
};
