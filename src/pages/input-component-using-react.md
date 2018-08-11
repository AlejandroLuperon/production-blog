---
title: Making an input component with a transitional label using React
date: "2018-05-20"
---
<div>
  As you may have seen with popular frameworks such as <a target="\_blank" href="https://getbootstrap.com/">Boostrap</a>,
  <a target="\_blank" href="https://material.angular.io/">Angular Material</a>, or <a target="\_blank" href="https://www.polymer-project.org/">Polymer</a>, text fields can have a lot of configurations and states. Perhaps you'd want to validate
  input text to see if it is the appropriate data type (i.e. number of string). Maybe you are creating many text fields,
  some of which vary in size, but are otherwise identical. Maybe all you want to do is just add a label to your text
  field. There are many possible use cases and configurations for text fields, which makes it handy to encapsulate all of
  the possible behaviors for your text fields inside a JavaScript class. For this tutorial, we'll create a configurable
  input component using React.
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
  To get started, let's define the properties and interface for my React "Input" class. I
  want to be able to set the size, type, and label for my text field via React props.
</div>
<br/>
<div>Here is a live demonstration below:</div>
<br/>
<div class="layout-row layout-align-center-center">
  <div>
    <textfield label="First Name" size="LARGE" type="TEXT" error="First Name cannot be empty." validator="EMPTY"></textfield>
    <textfield label="Password" size="LARGE" type="PASSWORD" value="0123456789"></textfield>
    <group>
      <textfield label="E-mail" size="SMALL" type="TEXT"></textfield>
      <textfield label="Phone" size="SMALL" type="TEXT"></textfield>
    </group>
  </div>
</div>
<br/>
<div>
  I want my text fields to have a "floating label", or a label that "floats" up when the focus event for the text field is
  triggered, and "floats" down on the blur event when the text field is empty. This means that my React component needs
  to have functions defined for the text field's onFocus and onBlur events.
</div>

```javascript
handleBlur() {
  this.setState({active: false});
}

handleFocus() {
  this.setState({active: true})
}
```
The code for the form above:


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
<div style="margin-bottom: 15px;">
  <a href="" target="\_blank">View tutorial code on Github</a>
</div>
<div>Finally, we have:</div>

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
