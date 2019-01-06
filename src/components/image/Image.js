import React from 'react';
import callback_asset_1 from "../images/dealing-with-callback-hell-using-graphs-asset-1.png";

class Image extends React.Component {
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

export default Image;
