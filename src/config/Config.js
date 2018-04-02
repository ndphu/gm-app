const apiConfig = {
  baseUrl: 'http://19november.freeddns.org:8080/api/gm',
  facebookAppId: '568365100192445',
  loginRedirectUrl: 'http://localhost:3000/pfm/login',
  unauthorizedPath: '/gm/unauthorized',
};

export default Object.assign({}, apiConfig);