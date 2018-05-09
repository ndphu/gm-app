const apiConfig = {
  //baseUrl: 'https://gmv2-api.cfapps.io/api',
  //baseUrl: 'https://gm-api-golang.cfapps.io/api',
  //baseUrl: 'http://192.168.16.57:9876/api',
  //baseUrl: 'http://192.168.1.8:9876/api',
  //baseUrl: 'http://192.168.1.17:9876/api',
  //baseUrl: 'http://192.168.1.8:8080/api',
  baseUrl: 'http://phim.ddns.net/api',
  facebookAppId: '568365100192445',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);