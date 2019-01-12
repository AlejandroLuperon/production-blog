import React from 'react';
import './icons.css'

class Close extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    let className = (this.props.className != null ? this.props.className + ' ' + 'icon' : 'icon');

    return (
      <svg onClick={this.props.onClick.bind(this)} className={className} width="16px" height="16px" viewBox="0 0 16 16">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g className="fill" transform="translate(-1045.000000, -29.000000)" fill="#000000">
                  <path d="M1054.19239,36.7781746 L1059.85504,31.1155243 C1060.2344,30.7361632 1060.23977,30.0976311 1059.84924,29.7071068 C1059.456,29.3138598 1058.82815,29.3139875 1058.44082,29.7013107 L1052.77817,35.363961 L1047.11552,29.7013107 C1046.73616,29.3219497 1046.09763,29.3165825 1045.70711,29.7071068 C1045.31386,30.1003537 1045.31399,30.7282011 1045.70131,31.1155243 L1051.36396,36.7781746 L1045.70131,42.4408249 C1045.32195,42.820186 1045.31658,43.4587181 1045.70711,43.8492424 C1046.10035,44.2424894 1046.7282,44.2423617 1047.11552,43.8550385 L1052.77817,38.1923882 L1058.44082,43.8550385 C1058.82019,44.2343995 1059.45872,44.2397667 1059.84924,43.8492424 C1060.24249,43.4559954 1060.24236,42.8281481 1059.85504,42.4408249 L1054.19239,36.7781746 Z"></path>
              </g>
          </g>
      </svg>
    );
  }
}

export default Close;
