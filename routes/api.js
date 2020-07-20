var express = require('express');
var router = express.Router();

const sleep = (timeountMS) => new Promise((resolve) => {
  setTimeout(resolve, timeountMS);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', async (req, res, next) => {
	await sleep(2000);
	res.json({
		code: 200,
		data: {},
		message: '成功'
	})
})

router.post('/test', async (req, res, next) => {
	await sleep(2000);
	res.json({
		code: 200,
		data: req.body,
		message: '成功啦'
	})
})

module.exports = router;