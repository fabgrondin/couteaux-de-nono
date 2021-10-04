// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Les couteaux de Nono",
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: [
        // ...global plugins
      ],
    },
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "posts/**/*.md",
        typeName: "Post",
        remark: {
          plugins: [
            // ...local plugins
          ],
        },
        coverField: "thumbnail",
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
      },
    },
    {
      use: "gridsome-plugin-netlify-cms-paths",
      options: {
        contentTypes: ["Post"],
        coverField: "thumbnail",
      },
    },
  ],
};
