import React from "react";
import g from "glamorous";
import Link from "gatsby-link";
import BlogTile from '../common/blogtile/blogtile.js';
import './index.css';
import { rhythm } from "../utils/typography";

export default ({ data }) => {
  return (
   <div className={'layout-column layout-align-center-center'}>
          <div style={{
            width: '1200px'
          }}>
      <h1>
        Build Whatever You Want
      </h1>
      <h4 style={{fontFamily: 'sans-serif'}}>
        {data.allMarkdownRemark.totalCount} Posts
      </h4>
      <div className={'articles'}>
        {data.allMarkdownRemark.edges.map(({ node }) =>

          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={{ textDecoration: `none`, color: `inherit` }}
            >
              <h3>
                {node.frontmatter.title}{" "}
                <span style={{color: "#BBB"}}>— {node.frontmatter.date}</span>
              </h3>
              <div style={{marginTop: '10px', fontSize: '15px'}}>{node.frontmatter.description}</div>

            </Link>
          </div>
        )}
      </div>
     </div>
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
