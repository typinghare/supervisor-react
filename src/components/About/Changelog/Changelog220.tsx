import { Changelog } from '../Changelog'

export function Changelog220(): JSX.Element {
    return (
        <Changelog version='2.2.0' releaseDate='Jun 20th, 2023'>
            <ul>
                <li>Refactored the backend using Java19 and Spring framework.</li>
                <li>Revamped frontend interface for enhancing user experience.</li>
            </ul>
        </Changelog>
    )
}