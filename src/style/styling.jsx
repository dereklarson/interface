// @format
import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingLeft: theme.spacing(4),
  },
  ticker: {
    // color: 'textSecondary',
    textAlign: 'center',
    backgroundColor: theme.palette.grey[500],
  },
  chipDepot: {
    width: '100%',
    zIndex: 1,
    border: '1px solid grey',
  },
  badge: {},
  box: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.light,
    borderRadius: 24,
    padding: '12px',
    display: 'flex',
    minHeight: 50,
    maxWidth: 200,
  },
  childHandle: {
    borderRadius: 24,
    height: '15px',
    opacity: 0.5,
    width: '100%',
    zIndex: 6,
  },
  paperDrawing: {
    position: 'relative', // Let's us use coordinates to draw the Diagram
  },
  avatar: {
    margin: theme.spacing(-0.5),
    width: theme.spacing(4),
    height: theme.spacing(4),
    zIndex: 1,
  },
  vertex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // border: '1px dashed red',
  },
  tickerActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    overflow: 'auto',
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  oofTooltip: {
    maxHeight: 100,
    maxWidth: 200,
  },
  testTooltip: {
    maxHeight: 400,
    maxWidth: 700,
  },
  textField: {},
  editor: {
    minWidth: 700, // This will ensure ~88 characters a line on all screens
  },
}));
