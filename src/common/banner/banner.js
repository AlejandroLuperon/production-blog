import React from 'react';

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{border: '2px solid #e6e6e6', padding: '10px'}}>
        <strong>{this.props.title}</strong> - {this.props.children}
      </div>
    )
  }
}

export default Banner;
