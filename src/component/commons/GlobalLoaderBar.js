import Nanobar from 'nanobar';

class GlobalLoaderBar {
  constructor() {
    this.loadScreen = document.getElementById('load-screen');
    // loadScreen.style.display = 'none';
    // loadScreen.style.visibility = 'hidden';
    // this.nanobar = new Nanobar({id:'progressbar-indicator'});
    // this.finished = true;
    // this.progress = 100;
  }

  start = () => {
    this.loadScreen.style.display = 'block';
    this.loadScreen.style.visibility = 'visible';
  };
  
  oldStart = () => {
    const _this = this;
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setInterval(function () {
      if (!_this.finished && _this.progress < 88) {
        _this.progress += 2;
        _this.nanobar.go(_this.progress);
      }
    }, 100);
    this.progress = 0;
    this.finished = false;
  };

  finish = () => {
    this.loadScreen.style.display = 'none';
    this.loadScreen.style.visibility = 'hidden';
    // this.nanobar = new Nanobar({id:'progressbar-indicator'});
  };
  
  oldFinish = () => {
    this.finished = true;
    this.nanobar.go(100);
    if (this.timer) {
      clearInterval(this.timer)
    }
  };
}

const loader = new GlobalLoaderBar();

export {loader};