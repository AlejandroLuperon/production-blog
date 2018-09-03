import React from "react";
import g from "glamorous";
import Link from "gatsby-link";
import BlogTile from '../common/blogtile/blogtile.js';

import { rhythm } from "../utils/typography";

export default ({ data }) => {
  return (
    <div>
      <g.H1 display={"inline-block"} borderBottom={"1px solid"}>
        Build Whatever You Want
      </g.H1>
      <h4>
        {data.allMarkdownRemark.totalCount} Posts
      </h4>
      {data.allMarkdownRemark.edges.map(({ node }) =>

        <div key={node.id}>
        {/*<BlogTile
          title={node.frontmatter.title}
          description={node.frontmatter.description}
        />*/}
          <Link
            to={node.fields.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >

            <h3>
              {node.frontmatter.title}{" "}
              <span style={{color: "#BBB"}}>— {node.frontmatter.date}</span>
            </h3>
            <h6>{node.frontmatter.description}</h6>

          </Link>
        </div>
      )}
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
            date(formatString: "DD MMMM, YYYY")
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
