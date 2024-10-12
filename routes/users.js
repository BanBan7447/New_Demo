var express = require('express');
var router = express.Router();

const JWT = require('jsonwebtoken');
const config = require("../configENV");

var userModel = require('../models/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Thêm người dùng
// - Thêm sản phẩm
router.post('/add', async (req, res) => {
  try {
    const { userName, email, passWord, fullName } = req.body;
    const objectUser = { userName, email, passWord, fullName };
    await userModel.create(objectUser);
    res.status(200).json({ status: true, message: "Thêm thành công" });
  } catch (e) {
    res.status(404).json({ status: false, message: "Thêm thất bại" })
  }
});

// Lấy thông tin chi tiết người dùng
// API hoàn chỉnh
router.get('/getUser', async (req, res) => {
  try {
    console.log(req.header("Authorization"));  // Log nội dung header nhận được
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": 403, "err": err });
        } else {
          //xử lý chức năng tương ứng với API
          const { id } = req.query;
          const listUser = await userModel.findById(id);
          res.status(200).json({ status: true, message: "Thành công", data: listUser });
        }
      });
    } else {
      res.status(401).json({ "status": 401 });
    }


  } catch (e) {
    res.status(404).json({ status: false, message: "Thất bại" })
  }
})

// API login
router.post('/login', async (req, res) => {
  try {
    const { userName, email, passWord, fullName } = req.body;
    var checkUser = await userModel.findOne({
      userName: userName,
      email: email,
      passWord: passWord,
      fullName: fullName
    });

    if (checkUser) {
      const token = JWT.sign({ id: userName }, config.SECRETKEY, { expiresIn: '30s' });
      const refreshToken = JWT.sign({ id: userName }, config.SECRETKEY, { expiresIn: '1d' });
      res.status(200).json({ status: true, message: "Thành công", token: token, refreshToken: refreshToken });
    } else {
      res.status(404).json({ status: false, message: "Không tìm thấy" });
    }
  } catch (e) {
    res.status(404).json({ status: false, message: "Thất bại" + e });
  }
});

module.exports = router;
