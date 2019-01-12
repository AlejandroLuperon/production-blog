import React from 'react';

class Snippet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id={this.props.id} className={this.props.className} style={{marginTop: '50px', marginBottom: '50px'}}>
        {this.props.children}
      </div>
    )
  }
}

export default Snippet;
