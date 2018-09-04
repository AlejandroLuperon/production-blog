require("prismjs/themes/prism-tomorrow.css");
import React from "react";
import g from "glamorous";
import { css } from "glamor";
import Link from "gatsby-link";

import { rhythm } from "../utils/typography";
import './Body.css';


export default ({ children, data }) => (
  <div>
    <div
      className={'layout-row layout-align-space-between-center'}
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        width: '100%',
        height: '80px',
        position: 'fixed',
        backgroundColor: '#2a52be',
        color: 'white',
        fontFamily: 'Lato,Georgia,Times,serif',
        borderBottom: '1px solid gray',
        top: '0px',
        zIndex: '1'
      }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.0-rc1/angular-material.css" />
      <a href='/' style={{textDecoration: 'none'}}>
        <h3 style={{
          color: 'white'
        }}>
          {data.site.siteMetadata.title}
        </h3>
      </a>
      <a style={{color: 'white', fontFamily: 'sans-serif'}} href='/about/'>
        About
      </a>
     </div>
     <div style={{
        marginTop: '80px',
        paddingTop: '35px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '35px',
        fontFamily: 'sans-serif'
      }}>
        {children()}
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
