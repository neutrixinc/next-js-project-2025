const fs = require('fs')
const path = require('path')

const progressierPath = path.join(process.cwd(), 'public', 'progressier.js')

if (fs.existsSync(progressierPath)) {
  fs.unlinkSync(progressierPath)
  console.log('Removed static progressier.js from public folder')
} else {
  console.log('No static progressier.js found in public folder')
}
