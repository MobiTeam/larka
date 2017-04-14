import React from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import { Link } from 'react-router'

class NavbarDropdown extends React.Component {
  
  handleLinkClick () {
    this.refs.dropdown.hide();
  }

  render () {   
    return (
      <Dropdown className="account-dropdown" ref="dropdown">
        <DropdownTrigger>
          <span className="account-dropdown__name" aria-expanded="false">
            <i className="fa fa-user" aria-hidden="true"></i>
            <span className="dashboard-email">{ this.props.profile.email || '' }</span>
            <b className="caret"></b>
          </span>
        </DropdownTrigger>        
        <DropdownContent>
          <div className="account-dropdown__identity account-dropdown__segment">
            <div>На балансе { this.props.profile.balance || '0' } RUB</div>
            <div>
              <Link to="/dashboard/balance">
                <button className="btn btn-success entry-money-btn">
                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                  <span className="entry-text">Пополнить</span>
                </button>
              </Link>
            </div>
          </div>
          <ul className="account-dropdown__quick-links account-dropdown__segment">
            <Link to="/dashboard/profile">
              <li className="account-dropdown__link">
                Профиль
              </li>
            </Link>
            <Link to="/logout">
              <li className="account-dropdown__link">
                Выход
              </li>
            </Link>            
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }

}

export default NavbarDropdown;