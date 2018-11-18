import React from 'react';

class CodeBlock extends React.Component {
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

export default CodeBlock;
