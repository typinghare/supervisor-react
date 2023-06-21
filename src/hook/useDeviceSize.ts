import { useMediaQuery, useTheme } from '@mui/material'

export enum DeviceSize {
    Small,    // (0, 600) pixels
    Medium,   // [600, 1200) pixels
    Large,    // [1200, infinity) pixels
}

/**
 * Custom hook that returns the size category of the device based on the screen width.
 * @returns The DeviceSize enum value representing the device size category.
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