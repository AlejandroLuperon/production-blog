import React from 'react';
import './blogtile.css'

class BlogTile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
        height: '400px',
        backgroundColor: 'white'
      }}>
        <img src={this.props.src} />
        <div>
          <div>{this.props.title}</div>
          <div>{this.props.date}</div>
          <div>{this.props.description}</div>
        </div>
      </div>
    );
  }
}

export default BlogTile;
