import React from 'react';
import navigationService from '../../service/NavigatorService';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/youtube-searched-for';

const staticNav = [
  {text: 'Trang Chủ', icon: <ActionHome/>, onClick: () => navigationService.goToHome()},
  {text: 'Yêu Cầu Phim', icon: <ActionSearch/>, onClick: () => navigationService.goToFilmRequest()},
];

export default staticNav;