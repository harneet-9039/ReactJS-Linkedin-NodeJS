# ReactJS-Linkedin-NodeJS
A simple demo app for LinkedIn API Authentication using ReactJS and NodeJS

<h1>Demo</h1>
https://safe-lake-64143.herokuapp.com/

<h1>Usage</h1>
<h2>Clone</h2>
git clone https://github.com/harneet-9039/ReactJS-Linkedin-NodeJS.git
<h1>Install Dependencies</h1>
<h2>Intall dependencies for server</h2>

cd ReactJS-Linkedin-NodeJS<br>
npm install<br>
<h2>Install dependencies for client</h2>

cd client<br>
npm install<br>
<h1>Get Linkedin App Credential from Linkedin Developer Portal</h1>
client_id<br>
client_secret<br>
Configure 'http://localhost:3001/callback' as Oauth2.0 redirect uri <br>

<h1>Create Environment Variables</h1>
/ReactJS-Linkedin-NodeJS/.env

EXPRESS_APP_CLIENT_ID=${Your-Client-ID}<br>
EXPRESS_APP_CLIENT_SECRET=${Your-Client-Secret}<br>
EXPRESS_APP_REDIRECT_URI=http://localhost:3001/callback<br><br><br>
/ReactJS-Linkedin-NodeJS/client/.env<br>
REACT_APP_CLIENT_ID=${Your-Client-ID}<br>
REACT_APP_REDIRECT_URI=http://localhost:3001/callback<br>
<h1>Build Client</h1>
/ReactJS-Linkedin-NodeJS/client:

<h3>yarn build</h3>
yarn run build
<h3>npm build</h3>
npm run build
<h1>Start Server</h1>
/React-Linkedin-Login/:<br>
set PORT=3001;<br>
npm start<br>
