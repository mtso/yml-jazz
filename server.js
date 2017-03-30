const http = require('http')
const fs = require('fs')
const yaml = require('js-yaml')
const jazz = require('jazz')
const config = require('./config')
const encoding = 'utf8'

// Save rendered html in case of errors.
var cache = 'Uninitialized, check console logs. Problem is probably in "content.yml" or "index.template"';

// Render yml to html on the fly for each request.
const server = http.createServer(function(_, res) {
  try {
    var content = fs.readFileSync(config.CONTENT_FILE, encoding)
    content = {content: yaml.load(content)}
    var template = fs.readFileSync(config.TEMPLATE_FILE, encoding)
    template = jazz.compile(template)
    template.eval(content, function(data) {
      cache = data
      res.end(data)
    })
  } catch(err) {
    // Return the cached content instead if an error is thrown.
    console.error(err)
    return res.end(cache)
  }
})

server.listen(process.env.PORT || 3000)
