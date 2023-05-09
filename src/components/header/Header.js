import React from 'react';

import classes from './header.module.css';

function Header(props) {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>{props.heading}</h1>
    </header>
  );
}

export default Header;
