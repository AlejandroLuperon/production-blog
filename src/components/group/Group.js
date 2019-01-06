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
      <div className={CSS.GROUP + " d-flex flex-row  flex-wrap"}>
          {this.props.children}
      </div>
    );
  }
}

export default Group;
