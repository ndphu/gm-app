const apiConfig = {
  //baseUrl: 'https://gm-java-backend.cfapps.io/api',
  baseUrl: 'http://localhost:9876/api',
  facebookAppId: '568365100192445',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);