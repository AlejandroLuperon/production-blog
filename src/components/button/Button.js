'use strict';

import React from 'react';
import './button.css';

const SIZE = {
  xsmall: 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg'
};

const TYPE = {
  primary: 'primary',
  secondary: 'secondary'
};

class Button extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string
  }

  static defaultProps = {
    optional: false,
    type: 'purple'
  }

  static displayName = 'Button'

  render() {
    return (
      <button
        className={`btn ${TYPE[this.props.type]}
        ${SIZE[this.props.size]}`}
        onClick={this.props.onClick.bind(this)}>
          {this.props.label}
        </button>
    );
  }
}


export default Button;
