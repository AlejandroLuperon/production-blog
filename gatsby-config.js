module.exports = {
  siteMetadata: {
    title: `Build Whatever You Want`,
  },
  plugins: [
    `angular-material`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
       options: {
         plugins: [
           `gatsby-remark-component`,
           {
             resolve: `gatsby-remark-prismjs`,
             options: {
                classPrefix: "language-"
             }
           },
           {
             resolve: "gatsby-remark-embed-snippet",
             options: {
               directory: `${__dirname}/src/components/`,
              classPrefix: "language-"
             },
           },
         ],
       },
    },
    `gatsby-plugin-glamor`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    }
  ],
};
