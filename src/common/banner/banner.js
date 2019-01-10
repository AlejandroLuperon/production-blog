import React from 'react';
import Twitter from "../icons/Twitter.js";
import Instagram from "../icons/Instagram.js";
import './banner.css'

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div style={{border: '2px solid #e6e6e6', padding: '10px'}}>
          <strong>{this.props.title}</strong> - {this.props.children}
        </div>
        <div className='d-flex justify-content-center'>
          <div className='icons'>
            <Twitter />
            <Instagram />
          </div>
        </div>
      </div>
    )
  }
}

export default Banner;
