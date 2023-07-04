import { Changelog } from '../Changelog'
import moment from 'moment'

export function Changelog221(): JSX.Element {
    return (
        <Changelog
            version='2.2.2'
            releaseDate={moment('07/03/2023').toDate()}
        >
            <ul>
                <li>
                    Improved the ability of deleting tasks; added alter dialog for delete confirmation.
                </li>

                <li>
                    Added a "tab" query parameter for indicating the selected tab.
                </li>
            </ul>
        </Changelog>
    )
}