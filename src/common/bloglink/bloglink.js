import React from 'react';
import './bloglink.css'

class BlogLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <a target="_blank" className="blog-link" href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}

export default BlogLink;
