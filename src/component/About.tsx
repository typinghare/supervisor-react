import { Alert, Box, BoxProps, Container, SxProps, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'
import { Changelog200 } from './changelog/Changelog200'
import { Changelog210 } from './changelog/Changelog210'
import { Changelog211 } from './changelog/Changelog211'
import { Changelog212 } from './changelog/Changelog212'
import { Changelog220 } from './changelog/Changelog220'

export const About: FunctionComponent = () => {
    const aboutSx: SxProps = { marginBottom: '4em' }

    return <Container sx={aboutSx}>
        <Changelog />
    </Container>
}

export const Changelog: FunctionComponent = () => {
    const changelogTitleSx: SxProps = {
        color: '#4361ee',
        textAlign: 'center',
        fontWeight: 'bold',
    }

    return <Box>
        <Statement />

        <Typography variant='h4' mt={4} sx={changelogTitleSx}>
            Changelog
        </Typography>

        <Changelog200 />
        <Changelog210 />
        <Changelog211 />
        <Changelog212 />
        <Changelog220 />
    </Box>
}

const Statement: FunctionComponent = () => {
    return <Alert severity='info' sx={{ marginTop: '1em' }}>
        <Typography variant='h4' sx={{ marginBottom: '0.5em' }}> Statement </Typography>
        <Typography variant='body1' mb={1}>
            The earliest version of <b>Supervisor</b> was developed in 2019 when I was a sophomore student.
            It accompanied me for a half year, and I kept myself self-disciplined with its assistance.
            But after then I indulged myself in playing computer games due to the Covid-19 Lockdown Policy,
            not using it anymore.
            Even worse, I lost all my source code after wrongly formatting my computer without pushing it to any
            remote
            repository.
        </Typography>
        <Typography variant='body1' mb={1}>
            Now, I am suffering from the desperation of solitary after immigrating to the United States,
            without a chance to go to university and pursue my favorite subject, computer science.
            Next month my family will move to Boston, a city with better social security than Chicago,
            where I am living right now. I hope I can restart my transient life there.
        </Typography>
        <Typography variant='body1' mb={1}>
            By remaking <b>Supervisor</b>, I want myself to delve into study once again, just like what I did three
            years ago.
            My friends, coworkers, classmates, teammates, all of you guys can supervise me and witness my growth and
            change.
        </Typography>
        <Typography variant='body1'>
            —March 18, 2022
        </Typography>
    </Alert>
}

export interface ChangelogSectionProps extends BoxProps {
    // The version of the changelog.
    version: string;

    // Date string format: "MM/DD/YYYY".
    publishDate: string;
}

export const ChangelogSection: FunctionComponent<ChangelogSectionProps> = (props: ChangelogSectionProps) => {
    const changelogSectionSx: SxProps = {
        marginTop: '1em',
        '& ul': { margin: 0, paddingLeft: '2em' },
        '& li': { margin: '0.4em 0' },
    }
    const changelogTitleSx: SxProps = {
        display: 'block',
        fontSize: '2em',
        borderLeft: '0.35em solid cornflowerblue',
        borderBottom: '1px solid cornflowerblue',
        paddingLeft: '0.35em',
    }
    const changelogPublishDateSx: SxProps = {
        display: 'inline-block',
        color: '#999999',
        fontSize: '0.5em',
        marginLeft: '1em',
    }

    return <Box sx={changelogSectionSx}>
        <Box sx={changelogTitleSx}>
            {props.version}
            <Box sx={changelogPublishDateSx}>{props.publishDate}</Box>
        </Box>

        <Box sx={{ marginTop: '0.5em' }}>{props.children}</Box>
    </Box>
}