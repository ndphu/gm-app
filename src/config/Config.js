const apiConfig = {
  //baseUrl: 'https://gm-java-backend.cfapps.io/api',
  baseUrl: 'http://192.168.1.8:9876/api',
  facebookAppId: '568365100192445',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);