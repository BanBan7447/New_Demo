var express = require('express');
var router = express.Router();

/* GET home page. */

// Mỗi khi viết api, ngoài trừ việc tạo router, thì sẽ tạo thêm swagger

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Ở trên router thì sẽ có một cái swagger như này

// Cách viết file document swagger

/**
 * /demo: // link dường dẫn API
 *   get: // Hàm Method
 *     summary: Lấy danh sách sản phẩm // Định nghĩa mô tả API
 *     responses: // Trả về dữ liệu
 *       200:
 *         description: Trả về danh sách sản phẩm
 *       400:
 *         description: Thất bại
 */

/**
 * @swagger
 * /demo:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     responses:
 *       200:
 *         description: Thành Công
 *       400:
 *         description: Thất bại
 */

router.get('/demo', (req, res) => {
  res.json({data: "Demo"})
});



module.exports = router;
 