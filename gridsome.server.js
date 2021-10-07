// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { join, relative, resolve } = require("path");
const { readdir } = require("fs").promises;

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

var { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(api) {
  api.loadSource(({ addSchemaTypes }) => {
    addSchemaTypes(`
      type Photo implements Node {
        id: ID!
        image: Image
      }
    `);
  });

  api.configureServer((app) => {
    app.use(
      "/.netlify/functions/",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    );
  });

  api.chainWebpack((config, { isServer }) => {
    config.plugin("vuetify-loader").use(VuetifyLoaderPlugin);
  });
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const backgrounds = addCollection("Backgrounds");

    backgrounds.addNode({
      id: 1,
      image: require.resolve("./src/assets/fire1.jpg"),
    });

    backgrounds.addNode({
      id: 2,
      image: require.resolve("./src/assets/fire2.jpg"),
    });

    const photos = addCollection("Photo");
    const startPath = resolve("./photos");
    const files = getFiles("./photos").then((files) => {
      files.forEach((imagePath) => {
        const imageName = relative(startPath, imagePath).replace(/\\/g, "/");
        const image = require.resolve(imagePath);
        photos.addNode({
          id: imageName,
          image: image,
        });
      });
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}
