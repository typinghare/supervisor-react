import { useState } from 'react'

/**
 * @param defaultOn The default value.
 * @example [on, switchOn, switchOff] = useSwitch()
 */
export function useSwitch(defaultOn: boolean = false): [boolean, () => void, () => void] {
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