import React from 'react';
import NextApp from 'next/app';
import Pusher from 'pusher-js';

// Cutom Next app to instantiate Pusher.js and build the channels 
export default class App extends NextApp {
  state = {
    pusherChannel: null
  };


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
      pusherChannel: this.state.pusherChannel,
      ...pageProps
    }

		return (
		  <Component {...newPageProps} />
		);
	}
}
