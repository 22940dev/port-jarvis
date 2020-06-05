// Based on https://github.com/cdeleeuwe/netlify-plugin-hugo-cache-resources/blob/master/index.js

module.exports = {
  async onPreBuild({ utils, inputs }) {
    const paths = JSON.parse(inputs.paths);
    const success = await utils.cache.restore(paths);

    if (success) {
      const cachedFiles = await utils.cache.list(paths);
      console.log(`Restored cache of '${paths}', totaling ${cachedFiles.length} files.`);
    } else {
      console.log(`A cache of '${paths}' doesn't exist (yet).`);
    }
  },

  async onPostBuild({ utils, inputs }) {
    const paths = JSON.parse(inputs.paths);
    const success = await utils.cache.save(paths);

    if (success) {
      const cachedFiles = await utils.cache.list(paths);
      console.log(`Successfully cached '${paths}', totaling ${cachedFiles.length} files.`);
    } else {
      console.log(`Couldn't cache '${paths}'.`);
    }
  }
};
