import React, { useEffect } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useAppDispatch } from '../store/store';
import { Notification, deleteNotification } from '../store/appSlice';

const TemporaryMessage: React.FC<Notification> = (props) => {
  const { type, message } = props;
  const [open, setOpen] = React.useState(true);
  const dispatch = useAppDispatch();

  // 初期値は'true'で、'state.message'がある場合にレンダリング
  // 'autoHideDuration'の長さで'false'となり、messageを削除する
  // ('useEffect'を使わないと警告が出る)
  useEffect(() => {
    open === false && dispatch(deleteNotification());
  }, [dispatch, open]);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default TemporaryMessage;
