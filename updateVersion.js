/**
 * @deprecated 11-17-2025
 * Versioning is handled from Admin Panel now.
 *
 * Author: Dev-Eighteen
 */

const fs = require('fs')
require('dotenv').config()

const versionPath = './version.json'

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const updateAppVersion = async (version) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST +
        'api/v1/' +
        'app-version-cms-settings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appVersion: version }),
      },
    )

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }
  } catch (err) {
    console.error('Failed to call API:', err.message)
  }
}

const updateVersion = async () => {
  try {
    const data = await readFile(versionPath)
    const versionObj = JSON.parse(data)
    const { buildVersion } = versionObj
    const [major, minor, patch] = buildVersion.split('.').map(Number)

    const newVersion = `${major}.${minor}.${patch + 1}`

    versionObj.buildVersion = newVersion

    await writeFile(versionPath, JSON.stringify(versionObj, null, 2))
    console.log('Build version updated successfully')

    await updateAppVersion(newVersion)
  } catch (err) {
    console.error('Failed to update build version:', err)
    process.exit(1)
  }
}

updateVersion()
