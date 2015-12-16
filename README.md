# Doge Boggle

Start Date: <code>Tue Dec 15 11:52:27 2015 -0800</code>
Completed: <code>Tue Dec 15 21:37:55 2015 -0800</code>

Such vocabulary with much diction!

Simple Boggle clone including dictionary scoring against an API.

## Installation
Node.js and npm are required to build this application.

### Dependencies
Use <code>npm install</code> to install all necessary dependencies.

### Running Gulp
Use <code>gulp watch</code> for development.
Use <code>gulp prod</code> for production.


All source code is structured within the <code>src/</code> directory.
Gulp pipes all bundled code to the generated <code>build/</code> directory.

## Technology Used

NPM, Gulp, Babel, jQuery, SASS, Google Fonts, Font Awesome

Uses the Pearson Inc. Dictionary API with the Longman Active Study Dictionary.

## Notes

Attempted to use the Wiktionary API but had issues with CORS and didn't want to set up a proxy to deal with HTTPS.

Scoring is on demand - after each word is submitted it is checked for validity against the API endpoint.

## Future

Code already has handlers written for capturing touch events - if time permitted, I would have implemented a swipeable interface for selecting words.