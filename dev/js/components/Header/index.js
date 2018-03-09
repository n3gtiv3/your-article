import React, { PropTypes } from 'react';
import UserInfo from './components/UserInfo';

import './header.scss';

const Header = (props) => {
  return (
    <header className="Header">


      <h1 className="Header-pageTitle">
        {props.title}
      </h1>

      <UserInfo
        image={props.image}
        userName={"Dhiraj"}
      />
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Header;
