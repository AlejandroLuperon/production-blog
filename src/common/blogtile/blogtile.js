import React from 'react';
import Link from "gatsby-link";
import './blogtile.css'

class BlogTile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link
       to={this.props.slug}
       css={{ textDecoration: `none`, color: `inherit` }}
       >
        <img src={this.props.src} />
        <div className={'d-flex flex-column ' + ' ' + 'justify-content-center'}>
          <div style={{fontWeight: 'bold', textAlign: 'center'}}>{this.props.title}</div>
          <div style={{marginTop: '5px', marginBottom: '5px', fontStyle: 'italic', textAlign: 'center'}}>{this.props.date}</div>
          <div style={{textAlign: 'center'}}>{this.props.description}</div>
        </div>
      </Link>
    );
  }
}

export default BlogTile;
