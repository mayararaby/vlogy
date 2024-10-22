import React from "react"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * @module Notification
 * @description display snackbar notification
 * @param {*} param0 
 * @returns {JSX}
 */
export const Notification = ({ type ,msg, open, close}) => {

  return <Snackbar open={open} autoHideDuration={3000} onClose={() => close(false)}  >
    <Alert
      severity={type}
      variant="filled"
      sx={{ width: '100%' }}
      onClose={() => close(false)} 
    >
      {msg}
    </Alert>
  </Snackbar>
}