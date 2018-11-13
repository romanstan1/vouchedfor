import React, { Component } from 'react';

export default ({title, children, className}) =>
  <div className={"Panel " + className}>
    <div className='panel-title'>{title}</div>
    <div className="panel-content">{children}</div>
  </div>
