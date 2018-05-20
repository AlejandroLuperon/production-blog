import React from 'react';
import './Group.css'
const CSS = {
  GROUP: "group"
};

class Group extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={CSS.GROUP + " layout-row layout-wrap"}>
          {this.props.children}
      </div>
    );
  }
}

export default Group;
