import { ChangeEvent, useState } from 'react'
import { Alert, Box, Grid, Snackbar, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { collectStyles } from '../../../common/functions/style'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import useSwitch from '../../../hook/useSwitch'
import { useAppSelector } from '../../../redux/hooks'
import { selectSubjectList, setSubjectList } from '../../../redux/slice/SpaceSlice'
import { useDispatch } from 'react-redux'
import { SubjectDto } from '../../../dto/SubjectDto'
import BookIcon from '@mui/icons-material/Book'
import { selectToken } from '../../../redux/slice/UserSlice'
import HttpResponse = Api.HttpResponse

export function NewSubject(): JSX.Element {
    const [subjectName, setSubjectName] = useState<string>('')
    const [isSnackBarOpen, openSnackBar, closeSnackBar] = useSwitch()
    const token = useAppSelector(selectToken)
    const subjectList = useAppSelector(selectSubjectList)
    const dispatch = useDispatch()

    const { mutate: createSubject, isLoading: isCreatingSubject } = useMutation(Api.createSubject, {
        onSuccess: (response: HttpResponse<SubjectDto>) => {
            const subjectDto = response.data

            // Dispatch to Redux.
            const newSubjectList = [...subjectList, {
                value: subjectDto.id,
                item: subjectDto.name,
            }]
            dispatch(setSubjectList(newSubjectList))

            openSnackBar()
        },
    })

    function handleSubjectNameChange(event: ChangeEvent<HTMLInputElement>) {
        setSubjectName(event.target.value)
    }

    function handleCreateSubject() {
        if (token === undefined) {
            return
        }

        createSubject({
            token,
            name: subjectName,
        })

        // Clear the form.
        setSubjectName('')
    }

    const styles = collectStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            margin: '0.5em 0 1em',
        },
        headerTitle: {
            display: 'inline-block',
            fontSize: '1.25em',
            marginLeft: '0.25em',
        },
        container: {
            alignItems: 'center',
        },
    })

    return (
        <>
            <Box sx={styles.header}>
                <BookIcon />
                <Box sx={styles.headerTitle}> New Subject </Box>
            </Box>

            <Grid container spacing={2} sx={styles.container}>
                <Grid item xs={12} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label='Subject Name'
                        value={subjectName}
                        onChange={handleSubjectNameChange}
                        variant='standard'
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <LoadingButton
                        fullWidth
                        variant='contained'
                        color='info'
                        loading={isCreatingSubject}
                        onClick={handleCreateSubject}
                    >
                        Create
                    </LoadingButton>
                </Grid>

                <Snackbar open={isSnackBarOpen} autoHideDuration={5000} onClose={closeSnackBar}>
                    <Alert onClose={closeSnackBar} severity='success' sx={{ width: '100%' }}>
                        Created subject successfully.
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}