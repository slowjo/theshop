/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    // require.resolve(`../source-plugin`),
    `source-plugin`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
