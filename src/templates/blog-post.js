import React from "react";
import rehypeReact from "rehype-react"
import Input from "../components/input/Input.js";
import Group from "../components/group/Group.js";
import Form from "../components/form/Form.js";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "textfield": Input,
    "group": Group,
    "form": Form
  }
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
