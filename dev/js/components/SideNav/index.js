import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import Menu from '../Menu';
import ActionBar from '../ActionBar';

import './sidenav.scss';

const SideNav = (props) => {
  const menuItems = [
    {
      title: 'Dashboard',
      link: '/',
      faClass: 'fa-dashboard'
    },
    {
      title: 'Opening',
      link: '/opening',
      faClass: 'fa-bar-chart'
    },
    {
      title: 'Purchases',
      link: '/purchase',
      faClass: 'fa-bar-chart'
    },
    {
      title: 'Sales',
      link: '/sale',
      faClass: 'fa-bar-chart'
    }
  ];

  const menuItems2 = [
    {
      title: 'P & L',
      link: '/p_l',
      faClass: 'fa-bar-chart'
    },
    {
      title: 'Ledger',
      link: '/ledger',
      faClass: 'fa-money'
    },
    {
      title: 'Balance Sheet',
      link: '/balanceSheet',
      faClass: 'fa-money'
    },
  ];

  return (
    <nav className={cx('SideNav', props.customClass)}>
			<span className="SideNav-companyLogo">
				Your Article
			</span>

      <Menu
        items={menuItems}
        caption="Pages" />

      <Menu
        items={menuItems2}
        caption="Reports" />
    </nav>
  );
};

SideNav.propTypes = {
	customClass: PropTypes.string
};

export default SideNav;
