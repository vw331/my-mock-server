var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');


const fs = require('fs')
const wkhtmltopdf = require('wkhtmltopdf');

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

router.post('/test',  upload.any(),  async (req, res, next) => {

	await sleep(2000);
	const { content } = req.body
	//console.log(req.files[0].buffer) 
	const str = decoder.write(req.files[0].buffer);
	console.log(str)
	wkhtmltopdf(str, { 
    pageSize: 'letter',
    encoding: 'utf-8'
  })
    .pipe(fs.createWriteStream('out.pdf'));

	res.json({
		code: 200,
		data: req.body,
		message: '成功啦'
	})
})


module.exports = router;