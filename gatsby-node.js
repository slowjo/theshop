const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Product`) {
      const slug = path.join('products', node.id)
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
  }

  exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allProduct {
            nodes {
              fields {
                slug
              }
              id
            }
          }
        }
    `)
    
    result.data.allProduct.nodes.forEach((node) => {
        createPage({
        //   path: node.fields.slug,
          path: `/products/${node.id}`,
          component: path.resolve(`./src/templates/productpage.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: node.id,
          },
        })
      })
  }
  
  exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions;

    if (page.path.match(/^\/app/)) {
      page.matchPath = "/app/*";
    }

    createPage(page);
  }