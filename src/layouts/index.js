require("prismjs/themes/prism-tomorrow.css");
import React from "react";
import g from "glamorous";
import { css } from "glamor";
import Link from "gatsby-link";
import Menu from '../common/menu/menu.js';
import Banner from "../common/banner/banner.js";

import { rhythm } from "../utils/typography";
import './Body.css';

export default ({ children, data }) => (
  <div>
    <Menu />
    <div className='d-flex flex-column align-items-center' style={{paddingLeft: '20px',paddingRight: '20px'}}>
      <div className='d-flex flex-md-row flex-column col-12'
       style={{
         maxWidth: '1200px',
         paddingTop: '115px',
         paddingBottom: '35px',
         fontFamily: 'sans-serif'
       }}>
         <div className='col-md-8 col-12'>
           {children()}
         </div>
         <div className='col-md-4 col-12'>
           <Banner title="Build Whatever You Want">
             Articles on various topics in Software Engineering and Computer Science. All articles are written by Alejandro Luperon.
           </Banner>
         </div>
       </div>
    </div>

  </div>
);

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
