/**
 * @deprecated 11-01-2025
 * Replaced by dynamic Progressier JS generation via API at runtime.
 * This static implementation is no longer used and will be removed in future updates.
 *
 * Author: Dev-Eighteen
 */

require('dotenv').config()

const fs = require('fs')
const path = require('path')

const progressierId = process.env.PROGRESSIER_ID

if (progressierId) {
  const swContent = `importScripts("https://progressier.app/${progressierId}/sw.js");`

  const filePath = path.join(__dirname, 'public', 'progressier.js')
  fs.writeFileSync(filePath, swContent)
} else {
  console.log('No PROGRESSIER_ID found in environment variables.')
}
