import React from 'react';
import './icons.css'

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <svg onClick={this.props.onClick.bind(this)} className='menu-icon' width="20" height="15" viewBox="0 0 20 15" fill="#FFFFFF" aria-hidden="true">
          <rect width="20" height="3"></rect>
          <rect width="20" height="3" y="6"></rect>
          <rect width="20" height="3" y="12"></rect>
      </svg>
    );
  }
}

export default Hamburger;
