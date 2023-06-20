import { useMediaQuery, useTheme } from '@mui/material'

export type DeviceType = 'small' | 'large'

function useDeviceType(): DeviceType {
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))

    return isSmallDevice ? 'small' : 'large'
}

export default useDeviceType