var fs = require('fs')

// function to encode file data to base64 encoded string
export function base64_encode(file) {
  return fs.readFileSync(file, { encoding: 'base64' })
}
