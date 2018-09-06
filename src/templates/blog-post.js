import React from "react";
import rehypeReact from "rehype-react"
import Input from "../components/input/Input.js";
import Group from "../components/group/Group.js";
import Form from "../components/form/Form.js";
import Snippet from "../common/snippet/snippet.js";
import Paragraph from "../common/paragraph/paragraph.js";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "textfield": Input,
    "group": Group,
    "form": Form,
    "snippet": Snippet,
    "paragraph": Paragraph
  }
}).Compiler

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div className={'layout-column layout-align-center-center'}>
      <div style={{
        width: '1200px'
      }}>
        <h1 style={{marginBottom: '65px'}}>
          {post.frontmatter.title}
        </h1>
        <div>{renderAst(post.htmlAst)}</div>
      </div>
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
