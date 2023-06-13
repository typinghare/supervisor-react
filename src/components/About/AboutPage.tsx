import { Page } from '../Layout/Page'
import { MuiStyles } from '../../common/interfaces'
import { Box, Typography } from '@mui/material'
import { Changelog200 } from './Changelog/Changelog200'
import { Changelog210 } from './Changelog/Changelog210'
import { Changelog211 } from './Changelog/Changelog211'
import { Changelog212 } from './Changelog/Changelog212'
import { Changelog220 } from './Changelog/Changelog220'

/**
 * The about page includes a piece of statement and changelogs.
 */
export function AboutPage(): JSX.Element {
    const styles: MuiStyles<'root' | 'changelogTitle'> = {
        root: {
            marginBottom: '2em',
        },
        changelogTitle: {
            color: '#4361ee',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    }

    return (
        <Page sx={styles.root}>
            <Statement />

            <Typography
                variant='h4'
                mt={4}
                sx={styles.changelogTitle}
                children='Changelog'
            />
            <>
                <Changelog200 />
                <Changelog210 />
                <Changelog211 />
                <Changelog212 />
                <Changelog220 />
            </>
        </Page>
    )
}

function Statement(): JSX.Element {
    const styles: MuiStyles<'root' | 'title'> = {
        root: {
            marginTop: '1em',
            backgroundColor: '#e5f6fd',
            padding: '1em',
        },
        title: {
            marginBottom: '0.5em',
        },
    }

    return (
        <Box sx={styles.root}>
            <Typography variant='h4' sx={styles.title}>
                Statement
            </Typography>
            <Typography variant='body1' mb={1}>
                The earliest version of <b>Supervisor</b> was developed in 2019 when I was a sophomore student. It
                accompanied me for a half year, and I kept myself self-disciplined with its assistance. But after then I
                indulged myself in playing computer games due to the Covid-19 Lockdown Policy, not using it anymore.
                Even worse, I lost all my source code after wrongly formatting my computer without pushing it to any
                remote repository.
            </Typography>
            <Typography variant='body1' mb={1}>
                Now, I am suffering from the desperation of solitary after immigrating to the United States, without a
                chance to go to university and pursue my favorite subject, computer science. Next month my family will
                move to Boston, a city with better social security than Chicago, where I am living right now. I hope I
                can restart my transient life there.
            </Typography>
            <Typography variant='body1' mb={1}>
                By remaking <b>Supervisor</b>, I want myself to delve into study once again, just like what I did three
                years ago. My friends, coworkers, classmates, teammates, all of you guys can supervise me and witness my
                growth and change.
            </Typography>
            <Typography variant='body1'>—March 18, 2022</Typography>
        </Box>
    )
}
