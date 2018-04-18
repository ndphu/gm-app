import React from 'react';
import navigationService from './service/NavigatorService';
import ActionHome from 'material-ui/svg-icons/action/home';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import {grey300} from 'material-ui/styles/colors';

const staticNav = [
  {text: 'Trang Chủ', icon: <ActionHome color={grey300}/>, onClick: () => navigationService.goToHome()},
  {text: 'Thêm Phim Mới', icon: <AddIcon color={grey300}/>, onClick: () => navigationService.goToFilmRequest()},
];

export default staticNav;