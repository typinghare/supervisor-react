import { useMediaQuery, useTheme } from '@mui/material'

export enum DeviceSize {
    // (0, 600) pixels
    Small,

    // [600, 1200) pixels
    Medium,

    // [1200, infinity) pixels
    Large,
}

/**
 * Returns the type of the device.
 */
function useDeviceSize(): DeviceSize {
    const theme = useTheme()
    const isSmallSize = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumSize = useMediaQuery(theme.breakpoints.down('lg'))

    if (isSmallSize) {
        return DeviceSize.Small
    } else if (isMediumSize) {
        return DeviceSize.Medium
    } else {
        return DeviceSize.Large
    }
}

export default useDeviceSize