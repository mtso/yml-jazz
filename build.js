const yaml = require('js-yaml')
const jazz = require('jazz')
const fs = require('fs')
const config = require('./config')
const encoding = 'utf8'

try {
  // 1. Read from `./content.yml`
  var raw = fs.readFileSync(config.CONTENT_FILE, encoding)
  // wrap content object because the yaml object contains keys with spaces
  var content = { content: yaml.load(raw) }
} catch (err) {
  // Log error reading yml file and exit early
  console.error(err)
  process.exit(1)
}

// Read string data from `./index.template`
var template = fs.readFileSync(config.TEMPLATE_FILE, encoding)
// Convert into templating object
template = jazz.compile(template)
// 2. Apply template
template.eval(content, function(data) {
  // 3. Save html output to `./index.html`
  fs.writeFileSync(config.OUTPUT_FILE, data, encoding)
})
