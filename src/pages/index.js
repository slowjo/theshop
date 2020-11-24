import React, {useEffect} from "react"
import { graphql, Link } from 'gatsby';
import PicThree from '../assets/picthreeedit.png';
import Layout from '../components/layout';
import ProductsNew from '../components/productsnew';
import Featured from '../components/featured';
import { useDispatch } from 'react-redux';
import { getItemsFromStorage } from '../state/app';

export default ({ data }) => {
  const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('cartItems')) {
            dispatch(getItemsFromStorage());
        }
    }, [dispatch]);

  return (
    <>
    <Layout>
      <header className="hero" style={{
        backgroundImage: `url(${PicThree}), radial-gradient(#7f8fa6, #353b48)`
        /* backgroundImage: `url(${PicThree}), radial-gradient(#444, #111)` */
      }}>
        <div className="container spacing">
          <h1 className="primary-title">Amazing products for amazing people</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sunt, nemo iste vitae nam nisi.</p>
          <Link to="/" className="btn">See what we have</Link>
        </div>
      </header>

      <main>

          <Featured products={data.allProduct.nodes.filter(node => node.isFeatured === true)} />

          <ProductsNew products={data.allProduct.nodes} />

      </main>
      </Layout>
    </>
  );
};

export const query = graphql`
  {
    allProduct {
      nodes {
        _id
        id
        name
        price
        description
        isFeatured
        imgUrl
        imgAlt
        remoteImage {
          id
          childImageSharp {
            id
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;