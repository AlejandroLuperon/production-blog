module.exports = {
  siteMetadata: {
    title: `Build Whatever You Want`,
  },
  plugins: [
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
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-125109886-1",
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        // Setting this parameter is also optional
        respectDNT: true
      },
    }
  ],
};
