# Project Title

Task Voting:

This is a Next.js/React/Node/Mongo app where a developer can cast their vote to rank how complex a task is using the "planning poker" method.  It takes advantage of Next.js dynamic routes and API routes to create the server side logic (hosted as server less functions in Zeit) and Pusher.js to communicate in real time with web sockets. 

## Getting Started
Here you'll see instructions on how to get this app running on your Mac

### Prerequisites

You need

```
Node.js
Mongodb
Yarn or NPM
Homebrew (optional)
```

For Mongo, I found it the easiest to install using [Homebrew](https://brew.sh/) on the Mac
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

With Homebrew: 
```
brew tap mongodb/brew
brew install mongodb-community@4.2
brew services start mongodb-community@4.2
```

### Installing

Steps to get this app running

```
npm install or yarn
npm run dev or yarn run dev
```

## Running the tests

No tests were written for this (yet!)


## Optionsal
If you wanna start with a few test polls you can run `node bin/seed.js` and it would populate the database.


## Deployment

This app will be hosted using Zeit's Now and serverless function with a MongoDb cluster. Work in progress.

## Built With

* [Next.js](http://nextjs.org) - The web framework used for isomorphic React
* [Pusher](https://pusher.com//) - Websocket channels for real time visualization
* [Styled Components](https://styled-components.com) - Component first css :) 

## Authors

* **Alex Burgos** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* My dog Penelope for her unconditional support when I was up late fixing some bugs one night
