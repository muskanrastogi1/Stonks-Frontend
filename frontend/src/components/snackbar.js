import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function Snackbars(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar
        open={props.open}
        // autoHideDuration={30000}
        onClose={props.handleClose}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.severity}
          style={{ height: '40px', fontSize: '14px' }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
