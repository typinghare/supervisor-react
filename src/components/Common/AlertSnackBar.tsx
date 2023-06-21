import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material'
import { collectStyles } from '../../common/functions/style'
import { SyntheticEvent } from 'react'
import { navigationHeight } from '../Layout/Navigation'
import useDeviceSize, { DeviceSize } from '../../hook/useDeviceSize'

// @ts-ignore
export interface AlertSnackBarProps extends SnackbarProps {
    severity: AlertProps['severity']
    children: AlertProps['children']
}

export function AlertSnackBar(props: AlertSnackBarProps): JSX.Element {
    const {
        severity, children, open, onClose, sx,
        ...otherProps
    } = props
    const isSmallDevice = useDeviceSize() === DeviceSize.Small

    const styles = collectStyles({
        root: {
            bottom: isSmallDevice ? navigationHeight : '0',
            ...sx,
        },
        alert: {
            width: '100%',
        },
    })

    function handleAlertClose(event: SyntheticEvent) {
        event.stopPropagation()
        if (onClose) {
            onClose(event, 'escapeKeyDown')
        }
    }

    return (
        <Snackbar
            open={open}
            sx={styles.root}
            autoHideDuration={3000}
            onClose={onClose}
            {...otherProps}
        >
            <Alert
                severity={severity}
                onClose={handleAlertClose}
                sx={styles.alert}
            >
                {children}
            </Alert>
        </Snackbar>
    )
}