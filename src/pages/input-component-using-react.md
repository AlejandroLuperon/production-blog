---
title: Making an input component with a transitional label using React
date: "2018-09-03"
tags: ["React", "JavaScript", "Text fields"]
description: "Encapsulate all of the possible behavior of your text field in a React component."
src: input-component-using-react.jpg
---
<paragraph>
  As you may have seen with popular frameworks such as <BlogLink href="https://getbootstrap.com/">Boostrap</BlogLink>,
  <BlogLink href="https://material.angular.io/">Angular Material</BlogLink>, or <BlogLink href="https://www.polymer-project.org/">Polymer</BlogLink>, input or text fields can have a lot of configurations and states. Attributes such as the label, text field size, and color may vary across different places in your app. One way to manage the possible variations is to use <BlogLink href="https://reactjs.org/docs/components-and-props.html"
  ">props</BlogLink> in <BlogLink href="https://reactjs.org/">React</BlogLink>. Encapsulating all of the possible behaviors for your text fields inside a React <BlogLink href="https://reactjs.org/docs/components-and-props.html"
  ">component</BlogLink> will provide options to configure the expected behavior of that text field in a predictable way without worrying about the implementation details of the text field itself.
</paragraph>

<paragraph>
  <div>This component will be able to:</div>
  <br/>
  <ul>
    <li>Validate its content</li>
    <li>Display error state</li>
    <li>Have its size be adjustable</li>
  </ul>
</paragraph>

<paragraph>
  To get started, let's define the properties and interface for the React "TextField" class. We
  want to be able to set the size, type, and label for the text field via React props.
</paragraph>

<paragraph>
  Since these are going to be the attributes that we can change for our React component, we'll set the default props to define its initial state and also set the <BlogLink href="https://reactjs.org/docs/typechecking-with-proptypes.html">prop types</BlogLink> to specify the data type required for each prop. "Validator" is another prop that I will add, which will be used to indicate the type of validation the value of the text field will undergo.
</paragraph>

<snippet>

  ```javascript
  static propTypes = {
    size: PropTypes.string.isRequired,
    validator: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string
  }

  static defaultProps = {
    type: TYPE.TEXT,
    value: "",
    validator: ""
  }
  ```

</snippet>

<paragraph>
  The text field will look different depending upon the value of objects in its state.
</paragraph>

<snippet>

```javascript
constructor(props) {
  super(props);
  this.state = {
    value: props.value,
    active: false,
    valid: true
  }
}
```

</snippet>

<paragraph>
  The "active" attribute is used to indicate the position of the label, which is either down when active is false, or up if active is  true. The "value" attribute is the value of the text field itself, and "valid" is a flag that indicates whether the data inside the text field is as the validator expects.
</paragraph>

<paragraph id="demo">In the live demonstration below, the "First Name" field cannot be empty. So whenever the blur event is called on the input field, an error message will display if there is no value. The color of the text field will turn red as a result. This behavior was assigned by setting the "validator" prop, which as mentioned earlier sets the validation type, and "error" prop, which sets the the "error" message when validation fails. The "Password" field is an HTML input element with a type of "password". The type is being directly managed via props.</paragraph>

<snippet>

<paragraph className="d-flex flex-row justify-content-center">
  <form>
    <textfield label="First Name" size="LARGE" type="TEXT" error="First Name cannot be empty." validator="EMPTY"></textfield>
    <textfield label="Password" size="LARGE" type="PASSWORD" value="0123456789"></textfield>
    <group>
      <textfield label="E-mail" size="SMALL" type="TEXT"></textfield>
      <textfield label="Phone" size="SMALL" type="TEXT"></textfield>
    </group>
  </form>
</paragraph>

<paragraph>
  The text fields will have a "floating label", or a label that "floats" up when the focus event for the text field is
  triggered, and "floats" down on the blur event when the text field is empty. This means that the React component needs
  to have functions defined for the text field's onFocus and onBlur events to change the state of the "active" flag.
</paragraph>

<snippet>

```javascript
handleBlur() {
  this.setState({active: false});
}

handleFocus() {
  this.setState({active: true})
}
```

</snippet>

<paragraph>
  As the value in the text field will change each time the change event is called, we want to be able to handle that change. If the value is not valid,
  the color of the label, text, and border for the text field will change to a red color and an error message will display directly below the input. Calling
  setState after each change event will check the values validity.
</paragraph>

<snippet>

```javascript
handleChange(event) {
  this.setState({value: event.target.value})
}
```

</snippet>

<paragraph>The code for the <BlogLink href='#demo'>live demonstration above</BlogLink>:</paragraph>

<snippet>

```javascript
<div>
  <Input label="First Name" size="LARGE" type="TEXT" error="First Name cannot be empty." validator="EMPTY"/>
  <Input label="Password" size="LARGE" type="PASSWORD" value="0123456789" />
  <group>
    <Input label="E-mail" size="SMALL" type="TEXT" />
    <Input label="Phone" size="SMALL" type="TEXT" />
  </group>
</div>
```

</snippet>

<paragraph>Our finished product for a React component is below:</paragraph>

<snippet>

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Input.css';

const CSS = {
  INPUT: 'input',
  LABEL: {
    INACTIVE: 'label',
    ACTIVE: 'label active'
  },
  CONTAINER: 'input-container',
  HIDDEN: 'hidden',
  ERROR: 'error',
  LABEL_ERROR: 'label-error',
  BORDER_ERROR: 'border-error'
};

const SIZE = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  FULL: 'full'
};

const TYPE = {
  PASSWORD: 'password',
  TEXT: 'text'
}

const VALIDATORS = {
  EMPTY: (input) => {
    return input.length > 0;
  }
}

class TextField extends React.Component {
  static propTypes = {
    size: PropTypes.string.isRequired,
    validator: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string
  }

  static defaultProps = {
    type: TYPE.TEXT,
    value: "",
    validator: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      active: false,
      valid: true
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleBlur(event) {
    this.setState({
      active: false,
      valid: (this.props.validator != "" ? VALIDATORS[this.props.validator](event.target.value) : true)
    });
  }

  handleFocus() {
    this.setState({
      active: true,
      valid: true
    })
  }

  handleLabelClick() {
      this.handleFocus();
      this.refs.textField.focus();
  }

  render() {
    return (
      <div className={CSS.CONTAINER}>
        <label
          onClick={this.handleLabelClick.bind(this)}
          className={
            (this.state.valid ? "" : CSS.LABEL_ERROR+ " ") +
            (this.state.active || (this.state.value.length != 0 && this.state.value != undefined) ? CSS.LABEL.ACTIVE : CSS.LABEL.INACTIVE)
          }>
          {this.props.label}
        </label>
        <input
          ref="textField"
          type={TYPE[this.props.type.toUpperCase()]}
          className={
            SIZE[this.props.size.toUpperCase()] + " " + CSS.INPUT +
            (this.state.valid ? "" : " " + CSS.BORDER_ERROR)
          }
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={this.state.value}/>
          <div className={this.state.valid ? CSS.HIDDEN : ""}>
            <div className={CSS.ERROR}>{this.props.error}</div>
          </div>
      </div>
    );
  }
}

export default TextField;

```

</snippet>

<paragraph>
  <div>In the code snippet above, please note the following:</div>
  <br/>
  <ul>
    <li>I store my CSS classes and other constants inside JSON objects. I find this more readable and reliable.</li>
    <li>I am using React version 15.6.2. In React 16.3, the way <BlogLink href="https://reactjs.org/docs/refs-and-the-dom.html">refs are used</BlogLink> changes.</li>
  </ul>
</paragraph>

<paragraph>
   I only added a few props to my text field component, but you may find that you would like to manage other details the text field. For instance, you could also specify styling if your text field can have multiple styles, or a text format such as a phone number format or currency format, as well as other details that you'd might want to as props to your text field component for manageability. All of these implementation details can be left within your text field component and make code sharing, maintenance, and consistency easier.
</paragraph>
