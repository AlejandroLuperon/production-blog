import React from 'react';
import './Form.css'
const CSS = {
  FORM: "form"
};

class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={CSS.FORM}>
          {this.props.children}
      </div>
    );
  }
}

export default Form;
