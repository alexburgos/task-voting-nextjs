import React from 'react';
import NextApp from 'next/app';
import Pusher from 'pusher-js';
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

  componentDidMount() {
    const pusher = new Pusher('e2940972e6de5b249d99', {
			cluster: 'eu',
			forceTLS: true
    });

    const channel = pusher.subscribe('poll-vote');

    this.pusher = pusher;
    this.setState({ pusherChannel: channel });  
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

	render() {
    const { Component, pageProps } = this.props;
    let newPageProps = {
      setTheme: this.setTheme,
      pusherChannel: this.state.pusherChannel,
      ...pageProps
    }

		return (
			<ThemeProvider theme={theme}>
				<Component {...newPageProps} />
			</ThemeProvider>
		);
	}
}
