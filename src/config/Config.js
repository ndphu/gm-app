const apiConfig = {
  baseUrl: 'http://192.168.1.8:8080/api/gm',
  facebookAppId: '568365100192445',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);