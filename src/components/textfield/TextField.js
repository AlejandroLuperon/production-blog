import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './TextField.css';

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

class TextField extends React.Component {
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

export default TextField;
