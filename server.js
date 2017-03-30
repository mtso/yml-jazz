const http = require('http')
const fs = require('fs')
const config = require('./config')
const _ = require('./build')

const server = http.createServer(function(_, res) {
  const html = fs.readFileSync(config.OUTPUT_FILE)
  res.end(html)
})

server.listen(process.env.PORT || 3000)
