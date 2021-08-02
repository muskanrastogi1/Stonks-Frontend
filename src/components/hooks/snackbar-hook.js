import React from 'react'

export default function useSnackbar() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [message, setMessage] = React.useState()
  const [severity, setSeverity] = React.useState()

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const handleMessage = (message) => {
    setMessage(message)
  }
  const handleSeverity = (severity) => {
    setSeverity(severity)
  }
  return [
    handleSnackbarOpen,
    handleSnackbarClose,
    handleMessage,
    handleSeverity,
    message,
    snackbarOpen,
    severity,
  ]
}
