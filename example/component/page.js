/**
 * Created by jf on 15/12/10.
 */

"use strict";

import React from 'react';
import './page.less';

export default class Page extends React.Component {
  render() {
    const {title, subTitle, desc, spacing, children, footer} = this.props;

    return (
      <section className={`page`}>
        <div className="page__hd">
          <h1 className="page__title">{title} <span className="page__zn_CN">| {subTitle}</span></h1>
          <span className="page__desc">{desc}</span>
        </div>
        <div className={`page__bd`}>
          {children}
        </div>
        {footer ? <div className="page__ft">
          {footer}
        </div> : false}
      </section>
    );
  }
};