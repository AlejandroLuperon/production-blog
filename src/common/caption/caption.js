import React from 'react';

class Caption extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id={this.props.id} className={this.props.className} style={{marginBottom: '35px'}}>
        {this.props.children}
      </div>
    )
  }
}

export default Caption;
