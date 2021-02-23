const router = require('express').Router()
const wkhtmltopdf = require('wkhtmltopdf');
const multer = require('multer');
const upload = multer();
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
const fs = require('fs')
/**
 * https://github.com/devongovett/node-wkhtmltopdf
 * https://wkhtmltopdf.org/usage/wkhtmltopdf.txt
 */

/**
 * 创建pdf
 */
router.get('/create', (req, res, next) => {
  const { target } = req.query
  if(!target) {
   throw new Error('target参数未找到!');
  }
  wkhtmltopdf(target, { 
    pageSize: 'letter' 
  })
    .pipe(res);

})

router.post('/create', upload.any(),  (req, res, next) => {
  if(!req.files.length) {
    throw new Error('请提交内容')
  }
  const str = decoder.write(req.files[0].buffer);
  res.type('pdf')
  wkhtmltopdf(str, { 
    pageSize: 'letter',
    encoding: 'utf-8'
  })
    .pipe(res);

})

module.exports = router