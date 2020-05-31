import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { RootState } from '../../store/rootReducer';
import { useAppDispatch } from '../../store/store';
import { signOut } from '../../store/appSlice';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  listItemIcons: {
    '& > * > .MuiListItemIcon-root': {
      minWidth: '35px',
    },
  },
});

// メニューでできる操作を表したオブジェクト
const Item = {
  HOME: 'Home',
  SIGN_OUT: 'Sign out',
} as const;

type Item = typeof Item[keyof typeof Item];

const AccountMenu: React.FC<{ handleClose: () => void }> = (props) => {
  const { handleClose } = props;
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState<Item>(Item.HOME);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const dispatch = useAppDispatch();
  const currentUser = useSelector((state: RootState) => state.firebase.auth);

  const handleSignOut = () => {
    dispatch(signOut());
    setIsSignedIn(false);
  };

  // 操作中の(表示する)メニューを変更する
  const handleClick = (item: Item) => {
    setSelectedItem(item);
  };

  // 'ListMenu'の最初の表示に戻る
  const handleBack = () => {
    setSelectedItem(Item.HOME);
  };

  // サインアウト時のリダイレクト
  if (!isSignedIn) return <Redirect to={'/'} />;

  return (
    <List
      component='nav'
      aria-labelledby='menu-header'
      subheader={
        <ListSubheader
          className={classes.header}
          component='div'
          id='menu-header'
        >
          {/* ボタンの切り替え(戻るボタン設置) */}
          {selectedItem === Item.HOME ? (
            <IconButton size='small' disabled>
              <MenuOpenIcon />
            </IconButton>
          ) : (
            <IconButton size='small' onClick={handleBack}>
              <KeyboardArrowLeftIcon />
            </IconButton>
          )}
          {selectedItem}
          <IconButton size='small' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </ListSubheader>
      }
    >
      <Divider />
      {selectedItem === Item.SIGN_OUT ? (
        <Box mx={1}>
          <Box my={1} display='flex' justifyContent='space-around'>
            <Typography>Are you sure to sign out?</Typography>
          </Box>
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            onClick={handleSignOut}
          >
            {Item.SIGN_OUT}
          </Button>
        </Box>
      ) : (
        <React.Fragment>
          <List className={classes.listItemIcons} disablePadding>
            <ListItem component='div'>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={currentUser.displayName || 'No names'} />
            </ListItem>
            <ListItem button onClick={() => handleClick(Item.SIGN_OUT)}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={Item.SIGN_OUT} />
            </ListItem>
          </List>
        </React.Fragment>
      )}
    </List>
  );
};

export default AccountMenu;