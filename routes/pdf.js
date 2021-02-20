const router = require('express').Router()
const wkhtmltopdf = require('wkhtmltopdf');
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

router.post('/create', (req, res, next) => {
  if(!req.body) {
    throw new Error('请提交内容')
  }
  wkhtmltopdf(req.body, { 
    pageSize: 'letter',
    encoding: 'utf-8'
  })
    .pipe(res);

})

module.exports = router