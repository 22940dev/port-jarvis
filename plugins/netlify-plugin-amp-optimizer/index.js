const ampOptimizer = require('@ampproject/toolbox-optimizer').create({
  verbose: true,
  lts: true,
  minify: true,
  autoExtensionImport: true,
  blurredPlaceholders: true,
  imageBasePath: './images'
})
const fs = require('fs')
const glob = require('glob')

module.exports = {
  onPostBuild: async ({ constants, utils }) => {
    // Hugo renders my AMP pages as amp.html right next to each page's index.html
    const pattern = constants.PUBLISH_DIR + '/**/amp.html'

    const files = await new Promise((resolve, reject) => {
      glob(pattern, { nodir: true }, (error, files) => {
        // eslint-disable-next-line no-unused-expressions
        error ? reject(error) : resolve(files)
      })
    })

    await Promise.all(
      files.map(async file => {
        const html = await fs.promises.readFile(file, 'utf-8')
        const optimizedHtml = await ampOptimizer.transformHtml(html)
        await fs.promises.writeFile(file, optimizedHtml)
      })
    )

    utils.status.show({
      title: `${files.length} AMP pages optimized`,
      summary: 'Great success! ⚡'
    })
  }
}
