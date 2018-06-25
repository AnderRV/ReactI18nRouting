import React from 'react';
import PropTypes from 'prop-types';

import {setLocale} from './../../locale.js';

export class InMemoryBrowserIntlProvider extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    locale: PropTypes.string,
    localeFromPath: PropTypes.func.isRequired,
  };

  state = {
    lang: null,
  };

  componentDidMount() {
    const {locale} = this.props;

    this.setState({lang: locale});
  }

  handleLocationChange = location => {
    const {localeFromPath} = this.props;

    const locale = localeFromPath({
      ...location,
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    });
    setLocale(locale);
    this.setState({lang: locale});
  };

  render() {
    return this.props.children(this.state.lang, this.handleLocationChange);
  }
}

export default ({
  children,
  formatIntlRoute,
  history,
  locale,
  localeFromPath,
  messages,
}) => (
  <InMemoryBrowserIntlProvider locale={locale} localeFromPath={localeFromPath}>
    {(lang, handleLocationChange) => (
      <BrowserIntlProvider
        formats={{formatIntlRoute}}
        handleLocationChange={handleLocationChange}
        history={history}
        lang={lang}
        messages={messages}
      >
        {children}
      </BrowserIntlProvider>
    )}
  </InMemoryBrowserIntlProvider>
);
