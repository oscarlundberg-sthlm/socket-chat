# Some info about my chat app

## Scripts

npm install - Node modules are gitignored - please begin by installing the dependencies.

npm start - starts backend and frontend at the same time. The frontend is served on port 3000 during development. Backend is being proxied by React.

npm run lint - check that the code adheres to Airbnb's standard.


## Additional info
I chose to save the users in sessionStorage - this way it's easy to test the app functionality. Open two separate browser windows (or tabs) and sign in two separate personas - they can now chat with eachother.

When the chat bubbles reach the bottom of the window, the latest message/bubble gets scrolled into view automatically.
