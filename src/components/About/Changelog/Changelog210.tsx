import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog210(): JSX.Element {
    return (
        <Changelog
            version='2.1.0'
            releaseDate={moment('08/11/2022').toDate()}
        >
            <ul>
                <li>The database has been redesigned and optimized.</li>
                <li>
                    <b>Nginx</b> is now being used as a reverse proxy for improved performance.
                </li>
                <li>A user system has been added to Supervisor for better security and access control.</li>
                <li>
                    The frontend has been refactored using <b>Redux</b> for better state management.
                </li>
                <li>
                    <b>React Router</b> has been employed to manage page routing for a smoother user experience.
                </li>
                <li>The navigation has been updated with a modern and visually appealing design.</li>
                <li>Users can now easily switch between tasks on the console.</li>
                <li>
                    <b>Recharts</b> has been integrated to provide data visualization and charting capabilities.
                </li>
            </ul>
        </Changelog>
    )
}