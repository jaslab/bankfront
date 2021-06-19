import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { appbardata } from '../data/data';
import AccountCont from '../contents/AccountCont'
import Loancont from '../contents/Loancont'
import TranCont from '../contents/TranCont'
import LoanTranCont from '../contents/LoanTranCont'
import PasswordCont from '../contents/PasswordCont'
import BankCont from '../contents/BankCont'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [account, setAccount] = React.useState(false);
  const [loan, setLoan] = React.useState(false);
  const [transaction, setTransaction] = React.useState(false);
  const [loantran, setLoantran] = React.useState(false);
  const [report, setReport] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [bank, setBank]=React.useState(false);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuClick = (val) => {
    switch (val) {
      case 'ACC':
        setAccount(true);
        setLoan(false);
        setTransaction(false);
        setLoantran(false);
        setReport(false);
        setPassword(false);
        setBank(false);
        break;
      case 'LON':
        setAccount(false);
        setLoan(true);
        setTransaction(false);
        setLoantran(false);
        setReport(false);
        setPassword(false);
        setBank(false);
        break;
        case 'TRA':
          setAccount(false);
          setLoan(false);
          setTransaction(true);
          setLoantran(false);
          setReport(false);
          setPassword(false);
          setBank(false);
          break;
          case 'LONTRA':
          setAccount(false);
          setLoan(false);
          setTransaction(false);
          setLoantran(true);
          setReport(false);
          setPassword(false);
          setBank(false);
          break;
          case 'REP':
          setAccount(false);
          setLoan(false);
          setTransaction(false);
          setLoantran(false);
          setReport(true);
          setPassword(false);
          setBank(false);
          break;
          case 'PAS':
          setAccount(false);
          setLoan(false);
          setTransaction(false);
          setLoantran(false);
          setReport(false);
          setPassword(true);
          setBank(false);
          break;
          case 'BAN':
          setAccount(false);
          setLoan(false);
          setTransaction(false);
          setLoantran(false);
          setReport(false);
          setBank(true);
          setPassword(false)
          break;
          
    }

  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {appbardata.sitename}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => menuClick('ACC')}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Account' />
          </ListItem>
          <ListItem button onClick={() => menuClick('LON')}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Loan' />
          </ListItem>
          <ListItem button onClick={() => menuClick('TRA')}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Transaction' />
          </ListItem>
          <ListItem button onClick={() => menuClick('LONTRA')}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Loan Transaction' />
          </ListItem>
          <ListItem button onClick={() => menuClick('BAN')}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='Bank Transaction' />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Reports', 'Password', 'Logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {account && <AccountCont/>}
        {loan && <Loancont/>}
        {transaction && <TranCont/>}
        {loantran && <LoanTranCont/>}
        {password && <PasswordCont/>}
        {bank && <BankCont/>}
      </main>
    </div>
  );
}
