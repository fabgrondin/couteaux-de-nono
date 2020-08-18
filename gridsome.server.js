// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin);
  })
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const backgrounds = addCollection('Backgrounds')

    backgrounds.addNode({
      id: 1,
      image: require.resolve('./src/assets/fire1.jpg')
    })

    backgrounds.addNode({
      id: 2,
      image: require.resolve('./src/assets/fire2.jpg')
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
