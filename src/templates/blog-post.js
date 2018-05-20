import React from "react";
import rehypeReact from "rehype-react"
import TextField from "../components/textfield/TextField.js";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "textfield": TextField }
}).Compiler

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div>{renderAst(post.htmlAst)}</div>
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`;
