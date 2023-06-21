import { useState } from 'react'

/**
 * Custom hook for managing a switch state.
 * @param defaultOn The default value of the switch.
 * @returns An array containing the switch state value, a function to switch it on, and a function to switch it off.
 * @example const [on, switchOn, switchOff] = useSwitch();
 */
function useSwitch(defaultOn: boolean = false): [boolean, () => void, () => void] {
    const [on, setOn] = useState<boolean>(defaultOn)

    return [
        on,
        () => {
            setOn(true)
        },
        () => {
            setOn(false)
        },
    ]
}

export default useSwitch