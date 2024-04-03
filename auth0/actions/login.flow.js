exports.onExecutePostLogin = async (event, api) => {
    const namespace = 'dev-4entgo-6.us.auth0.com';
    if (event.authorization) {
      api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
      api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    }
  };
  