const apiConfig = {
  baseUrl: 'https://gm-java-backend.cfapps.io/api',
  //baseUrl: 'http://localhost:19110/api',
  facebookAppId: '568365100192445',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);