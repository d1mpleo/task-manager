import React from 'react';
import Image from './image';
import img from './img/image.png';


export default class Header extends React.Component {
  render() {
    return (<header className="header">Site's header, {this.props.description}
    <Image path={img} alt="image"/></header>);
  }

  
}