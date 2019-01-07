require("prismjs/themes/prism-tomorrow.css");
import React from "react";
import g from "glamorous";
import { css } from "glamor";
import Link from "gatsby-link";
import Menu from '../common/menu/menu.js';

import { rhythm } from "../utils/typography";
import './Body.css';

export default ({ children, data }) => (
  <div>
    <Menu />
     <div style={{
        paddingTop: '100px',
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
