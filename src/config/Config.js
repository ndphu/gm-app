const apiConfig = {
  //baseUrl: 'https://gm-node-backend-hyperlogical-woodhouse.cfapps.io/api',
  baseUrl: 'http://192.168.16.57:9876/api',
  //baseUrl: 'http://192.168.1.8:9876/api',
  facebookAppId: '568365100192445',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);