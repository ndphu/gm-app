const appBarHeight = 64;
const navBarWidth = 215;

const appStyle = {
  pageContainer: {
    display: "flex",
    justifyContent: 'left',
  },
  appBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
  },
  navBar: {
    position: 'fixed',
    minWidth: navBarWidth,
    maxWidth: navBarWidth,
    top: appBarHeight,
    padding: 8,
  },
  headline: {
    fontSize: 24,
    fontWeight: 400,
    paddingLeft: 8,
    paddingRight: 8,
  },
  content: {
    position: 'fixed',
    top: appBarHeight,
    left: navBarWidth + 16,
    bottom: 0,
    right: 0,
    overflowY: 'auto',
  },
  movieGrid: {
    paddingLeft: 4,
    paddingRight: 8,
  },
  videoPlayerWrapper: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  videoPlayer: {
    maxWidth: '100%',
    height: 'auto',
  },
  moviePoster: {
    maxWidth: '100%',
  }
};

export default appStyle;