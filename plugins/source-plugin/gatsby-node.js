/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */

const theUrl = 'https://damp-garden-52954.herokuapp.com/'

// const theUrl = 'http://localhost:4242/';

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

const fetch = require("node-fetch");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// constants for your GraphQL Post and Author types
const PRODUCT_NODE_TYPE = `Product`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const res = await fetch(`${theUrl}products`);

  const data = await res.json();

  console.log(data);

  // loop through data and create Gatsby nodes
  data.products.forEach(product =>
    createNode({
      ...product,
      id: createNodeId(`${product._id}`),
      // id: createNodeId(`${PRODUCT_NODE_TYPE}-${product.id}`),
      parent: null,
      children: [],
      internal: {
        type: PRODUCT_NODE_TYPE,
        content: JSON.stringify(product),
        contentDigest: createContentDigest(product),
      },
    })
  )

  return
}

// called each time a node is created
exports.onCreateNode = async ({
    node, // the node that was just created
    actions: { createNode },
    createNodeId,
    getCache,
  }) => {
    if (node.internal.type === PRODUCT_NODE_TYPE) {
      const fileNode = await createRemoteFileNode({
        // the url of the remote image to generate a node for
        url: node.imgUrl,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      })
  
      if (fileNode) {
        node.remoteImage = fileNode.id
      }
    }
  }

  exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
      type Product implements Node {
        id: ID!
        name: String!
        price: Int!
        description: String!
        imgUrl: String!
        imgAlt: String!
        remoteImage: File @link
      }`)
  }