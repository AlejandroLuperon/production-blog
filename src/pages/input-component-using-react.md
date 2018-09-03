---
title: Making an input component with a transitional label using React
date: "2018-09-03"
tags: ["React", "JavaScript", "Text fields"]
description: "Encapsulate all of the possible behavior of your text field in a React component."
---
<div>
  As you may have seen with popular frameworks such as <a target="\_blank" href="https://getbootstrap.com/">Boostrap</a>,
  <a target="\_blank" href="https://material.angular.io/">Angular Material</a>, or <a target="\_blank" href="https://www.polymer-project.org/">Polymer</a>, text fields can have a lot of configurations and states. Attributes such as the label, text field size, and color may vary across different places in your app. One way to manage the possible variations is to use props in React. Encapsulating all of the possible behaviors for your text fields inside a React component will provide options to configure the expected behavior of that text field in a predictable way without worrying about the implementation details of the text field itself.
</div>
<div>
  <br/>
  <div>This component will be able to:</div>
  <br/>
  <ul>
    <li>Validate it's content</li>
    <li>Display error state</li>
    <li>Have it's size be adjustable</li>
  </ul>
</div>
</br>
<div>
  To get started, let's define the properties and interface for the React "Input" class. We
  want to be able to set the size, type, and label for the text field via React props.
</div>
<br/>
<div>
  Since these are going to be the attributes that we can change for our React component, we'll set the default props to define it's initial state and also set the prop types to specify the data type required for each prop. Validator is another prop that I will add, which will be used to indicate what type of validation will the value of the text field should undergo.
</div>

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

<div>
  The text field will look different depending upon the value of objects in its state.
</div>

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

<div>
  The "active" attribute is used to indicate the position of the label, which is either down when active is false, or up if active is  true. The "value" attribute is the value of the text field itself, and "valid" is a flag that indicates whether the data inside the text field is as the validator expects.
</div>
<br/>
<div id="demo">Here is a live demonstration below:</div>
<snippet>
<div class="layout-row layout-align-center-center">
  <form>
    <textfield label="First Name" size="LARGE" type="TEXT" error="First Name cannot be empty." validator="EMPTY"></textfield>
    <textfield label="Password" size="LARGE" type="PASSWORD" value="0123456789"></textfield>
    <group>
      <textfield label="E-mail" size="SMALL" type="TEXT"></textfield>
      <textfield label="Phone" size="SMALL" type="TEXT"></textfield>
    </group>
  </div>
</div>
</snippet>
<div>
  The text fields will have a "floating label", or a label that "floats" up when the focus event for the text field is
  triggered, and "floats" down on the blur event when the text field is empty. This means that the React component needs
  to have functions defined for the text field's onFocus and onBlur events to change the state of the "active" flag.
</div>

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

<br/>
<div>
  As the value in the text field will change each time the change event is called, we want to be able to handle that change. If the value is not valid,
  the color of the label, text, and border for the text field will change to a red color and an error message will display directly below the input. Calling
  setState after each change event will check the values validity.
</div>

<snippet>

```javascript
handleChange(event) {
  this.setState({value: event.target.value})
}
```

</snippet>

<div>The code for the <a href='#demo'>live demonstration above</a>:</div>
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

<div>Our finished product for a React component is below:</div>

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
  CONTAINER: 'input-container'
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

class Input extends React.Component {
  static propTypes = {
    size: PropTypes.string.isRequired,
    validator: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    type: TYPE.TEXT,
    value: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      active: false
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleBlur() {
    this.setState({active: false});
  }

  handleFocus() {
    this.setState({active: true})
  }

  render() {
    return (
      <div className={CSS.CONTAINER}>
        <label className={this.state.active || (this.state.value.length != 0 && this.state.value != undefined) ? CSS.LABEL.ACTIVE : CSS.LABEL.INACTIVE}>
          {this.props.label}
        </label>
        <input
          type={TYPE[this.props.type.toUpperCase()]}
          className={SIZE[this.props.size.toUpperCase()] + ' ' + CSS.INPUT}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={this.state.value}/>
      </div>
    );
  }
}

export default Input;

```

</snippet>
