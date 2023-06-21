import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog211(): JSX.Element {
    return (
        <Changelog
            version='2.1.1'
            releaseDate={moment('08/14/2023').toDate()}
        >
            <ul>
                <li>
                    Improved task creation workflow: After a task is created, either the dashboard accordion or the
                    switch task accordion opens automatically.
                </li>
                <li>
                    Enhanced data visualization: A pie chart has been added to the graph section for better data
                    representation.
                </li>
                <li>Resolved an issue where the time was displayed incorrectly in the task card expanded content.</li>
                <li>Fixed a bug where tasks could be created without selecting a category.</li>
            </ul>
        </Changelog>
    )
}