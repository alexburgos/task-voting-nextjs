import React from 'react';
import NextApp from 'next/app';
import { ThemeProvider } from 'styled-components';

let theme = {
  primary: 'dark'
};
export default class App extends NextApp {
  state = {
    theme: theme
  };

  setTheme = () => {
    this.setState({ theme: !this.state.theme});
  }

	render() {
    const { Component, pageProps } = this.props;
    let newPageProps = {
      setTheme: this.setTheme,
      ...pageProps
    }

		return (
			<ThemeProvider theme={theme}>
				<Component {...newPageProps} />
			</ThemeProvider>
		);
	}
}
