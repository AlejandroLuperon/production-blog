import React from 'react';

class Snippet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{marginTop: '50px', marginBottom: '50px'}}>
        {this.props.children}
      </div>
    )
  }
}

export default Snippet;
