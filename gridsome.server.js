// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { join, relative, resolve } = require("path");
const { readdir } = require("fs").promises;

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

var { createProxyMiddleware } = require("http-proxy-middleware");

const { scrapingInstagramPosts } = require("gatsby-source-instagram/instagram");
const _ = require(`lodash`);
async function getInstagramPhotos() {
  const photos = await scrapingInstagramPosts({ username: "45204298927" });

  return photos;
}

module.exports = function(api) {
  // api.loadSource(({ addSchemaTypes }) => {
  //   addSchemaTypes(`
  //     type Photo implements Node {
  //       id: ID!
  //       image: Image
  //     }
  //   `);
  // });

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
  api.loadSource(async ({ addCollection }) => {
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

    const photos = addCollection({ typeName: "Photo" });
    const startPath = resolve("./photos");
    const files = await getFiles("./photos");
    files.forEach((imagePath) => {
      const imageName = relative(startPath, imagePath).replace(/\\/g, "/");
      const image = require.resolve(imagePath);
      photos.addNode({
        id: imageName,
        image: image,
      });
    });
    const instagramPosts = addCollection({ typeName: "InstagramPost" });
    const posts = await getInstagramPhotos();
    if (posts) {
      posts.forEach((post) => {
        instagramPosts.addNode(createPostNode(post));
      });
    }
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

function createPostNode(datum) {
  return {
    username: datum.username || datum.owner.username || datum.owner.id,
    id: datum.shortcode,
    children: [],
    likes:
      _.get(datum, `edge_liked_by.count`) ||
      _.get(datum, `edge_media_preview_like.count`) ||
      datum.like_count,
    caption:
      _.get(datum, `edge_media_to_caption.edges[0].node.text`) || datum.caption,
    thumbnails: datum.thumbnail_resources,
    mediaType: datum.__typename || datum.media_type,
    preview: datum.display_url || datum.thumbnail_url || datum.media_url,
    original: datum.display_url || datum.media_url,
    timestamp:
      datum.taken_at_timestamp || new Date(datum.timestamp).getTime() / 1000,
    dimensions: datum.dimensions,
    comments:
      _.get(datum, `edge_media_to_comment.count`) || datum.comments_count,
    hashtags: datum.hashtags,
    permalink: datum.permalink,
    carouselImages: _.get(datum, `children.data`, []).map((imgObj) => {
      return {
        preview: imgObj.media_url,
        ...imgObj,
      };
    }),
  };
}
