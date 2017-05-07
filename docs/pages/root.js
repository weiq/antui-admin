import React, { Component, PropTypes } from 'react';
import Navigation from '../components/navigation';
import langs from '../langs.json';
import docs from '../docs.json';
import logo from '../assets/images/logo.png';
import './root.less';

class Root extends Component {

  static propTypes = {
    params: PropTypes.object,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);

    let locale = 'zh-CN';

    if (typeof (Storage) !== "undefined") {
      locale = localStorage.getItem("antui-admin-doc-lang") ? localStorage.getItem("antui-admin-doc-lang") : locale;
    }

    this.state = { locale };
  }

  render() {
    const { params, children } = this.props;

    let changeLang = (lang) => {
      if (typeof (Storage) !== "undefined") {
        localStorage.setItem("antui-admin-doc-lang", lang);
      }
      this.setState({ locale: lang });
    };
    
    return (
      <div className="App">
        <Navigation
          data={docs}
          logo={logo}
          current={params}
          langs={langs[this.state.locale].navigation}
          langsOptions={Object.keys(langs)}
          locale={this.state.locale}
          changeLang={changeLang.bind(this)}
        />
        <div className="App__content">
          {children && React.cloneElement(children, {
            langs: langs[this.state.locale].content,
            locale: this.state.locale,
            docs
          })}
        </div>
      </div>
    );
  }
}

export default Root;