import React from "react";
import g from "glamorous";
import Link from "gatsby-link";
import BlogTile from '../common/blogtile/blogtile.js';
import './index.css';
import { rhythm } from "../utils/typography";

export default ({ data }) => {
  return (
    <div className='d-flex flex-column'>
        <h4 style={{fontFamily: 'sans-serif', marginBottom: '15px'}}>
          {data.allMarkdownRemark.totalCount} Posts
        </h4>
        <div className={'articles' + ' ' + 'd-flex flex-row ' + ' ' + 'flex-wrap'}>
          {data.allMarkdownRemark.edges.map(({ node }) =>
            <BlogTile
              key={node.id}
              slug={node.fields.slug}
              src={'/static/thumbnails/' + node.frontmatter.src}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              description={node.frontmatter.description}></BlogTile>
          )}
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
            src
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
