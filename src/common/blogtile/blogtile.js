import React from 'react';

class BlogTile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{
        height: '400px',
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid black'
      }}>
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
      </div>
    );
  }
}

export default BlogTile;
