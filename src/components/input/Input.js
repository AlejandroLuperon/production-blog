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
  ERROR: 'error'
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

class Input extends React.Component {
  static propTypes = {
    size: PropTypes.string.isRequired,
    validator: PropTypes.string,
    type: PropTypes.string
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
    }
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
          <div className={this.state.valid ? CSS.HIDDEN : ""}>
            <div className={CSS.ERROR}>{this.props.error}</div>
          </div>
      </div>
    );
  }
}

export default Input;
