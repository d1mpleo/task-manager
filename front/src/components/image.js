import React from "react"


class Image extends React.Component {
  render() {
    return (<img src={this.props.path} />);
  }
}
export default Image