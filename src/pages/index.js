import React from "react";
import g from "glamorous";
import Link from "gatsby-link";
import BlogTile from '../common/blogtile/blogtile.js';
import Banner from '../common/banner/banner.js';
import './index.css';
import { rhythm } from "../utils/typography";

export default ({ data }) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <div className={'d-flex flex-md-row flex-column-reverse col-12'}
        style={{maxWidth: '1200px'}}>
          <div className={'col-md-8 col-12'}>
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
          <div className={'col-md-4 col-12'}>
            <div className='banner'>
              <Banner title="Build Whatever You Want">
                Articles on various topics in Software Engineering and Computer Science. All articles are written by Alejandro Luperon.
              </Banner>
            </div>
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
