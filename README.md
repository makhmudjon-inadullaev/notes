## Notes app
> This app deployed to https://notes.makhmudjon.com and ready to be tested, its only for demonstration purpose, not produciton usage!!!

**Admin user credentials**
```
Email: admin@makhmudjon.com
Password: `N7mq3Cy2ux4JAP5E8ylxlAzV`
```
Anyone has the ability to create a new account, and every freshly registered user is assigned a standard user role.


## Requirements
- **Auth0** - You need to have auth0 account, and create new app. Get domain and clientId of new app then create new environment variables `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENTID` respectively. You should also copy auth0>actions>login.flow.js and create new login flow in auth0 to include user roles in their token claim.
- **Github** - Github gists is used to store notes, because its free and secure🤞. Get your access token and create new gist then collect values in .env file `VITE_GISTS_TOKEN`, `VITE_GISTS_ID` and `VITE_GISTS_NAME` respectively

## How to start
After completing above, you will have .env file like below:
```
VITE_AUTH0_DOMAIN=***
VITE_AUTH0_CLIENTID=***
VITE_GISTS_TOKEN=***
VITE_GISTS_ID=***
VITE_GISTS_NAME=***
```

Install dependencies
```bash
npm install
```
If you want to run tests
```bash
npm run test
```

Start the development server with vite
```bash
npm run dev
```
That's all, you can now open your browser, http://localhost:5173/.

