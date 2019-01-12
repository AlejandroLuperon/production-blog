import React from 'react';
import './menu.css';
import Hamburger from '../icons/Hamburger.js'
import Close from '../icons/Close.js'
import Hammer from '../icons/Hammer.js'


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    }
  }

  onClickOpenMenu() {
    this.setState({menu: true});
  }

  onClickCloseMenu() {
    this.setState({menu: false});
  }

  render() {
    let menuClass = (this.state.menu ? 'menu d-flex' : 'menu menu-hidden');

    return (
      <div>
        <div className={'d-flex flex-row align-items-center navbar-bwyw'}>
          <a href='/' className={'col'} style={{textDecoration: 'none', textAlign: 'center'}}>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <div className={'logo'} style={{marginRight: '15px', fontWeight: 'bold'}}>
                Build Whatever You Want
              </div>
            </div>
          </a>
          <Hamburger onClick={this.onClickOpenMenu.bind(this)} />
         </div>
         <div className={'flex-column align-items-center justify-content-center' + ' ' + menuClass}>
            <div className='d-flex flex-column align-items-center menu-links'>
                <Close onClick={this.onClickCloseMenu.bind(this)} className='close' />
                <a onClick={this.onClickCloseMenu.bind(this)} style={{color: 'black'}} href='/about/'>About</a>
            </div>
         </div>
        </div>
    )
  }
}

export default Menu;
