# JoshsGardenOnMandy.com Control Panel
This web application has been built specifically for the use of the custom garden sprinkler control system for Josh Monteith. 

## Installation
1) Ensure `npm` and `webpack` are installed on your machine
2) Pull the repo using SSH at `git clone git@github.com:jakeb1996/joshsgardenonmandy.git`
3) Run `npm install`
4) Run `webpack`
5) You're up and running!

## Deployment
1) Login to the hosting server
2) Follow the installation steps above though run the production command for webpack

## Architecture
- Uses Google Materialize for styling
- JQuery is used for rapid development of the interface and request handling
- The associated mossByte is not updated until the user presses on Upload. Saving a schedule is not sufficient for permanent changes. This applies to deleting a schedule too.