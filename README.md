# GrainManager <img src="https://github.com/Tulipanik/GrainManager/blob/main/frontend/frontend_look/logo/icon.ico" width="70" align="right">
## Purpose
GrainManager is a simple app for managing grain contracts. It allows user to add contracts, courses and edit them.
## Build details and technologies
App has client-server architecture. Backend file contains backend side of project, and frontend- frontend.
App is also build as desktop app with electron framework. There is also an express server on specified by user port.
On backend side there is a mongodb database.
## How to start an app
To start an app you need to specify .env file. In here you write 3 variables that are provided here:
````
APIKEY="<here's link for database>"
PORT=<here's a port number"
DATABASE="<here's name of database>"
````
You also have to had installed npm (NodeJS). Node can be installed from official web page.
To start a program you have to write:
````pwsh
npm start
````
## Views
* Main view (crossing table)
* Active view
* Archive view
* Add view
* Contract view


