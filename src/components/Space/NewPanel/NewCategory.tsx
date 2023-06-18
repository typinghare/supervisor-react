import { Alert, Box, Grid, Snackbar, TextField } from '@mui/material'
import { collectStyles } from '../../../common/functions/style'
import { SimpleSelect } from '../../Common/SimpleSelect'
import { ChangeEvent, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import { SubjectDto } from '../../../dto/SubjectDto'
import { useToken } from '../../../hook/useToken'
import { LoadingButton } from '@mui/lab'
import { useSwitch } from '../../../hook/useSwitch'
import { useDispatch } from 'react-redux'
import { selectSubjectList, setSubjectList } from '../../../redux/slice/SpaceSlice'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserId } from '../../../redux/slice/UserSlice'
import CategoryIcon from '@mui/icons-material/Category'

export function NewCategory(): JSX.Element {
    const [subjectId, setSubjectId] = useState<number>(0)
    const [categoryName, setCategoryName] = useState<string>('')
    const [expectedDuration, setExpectedDuration] = useState<number>(30)
    const token = useToken()
    const [isSnackBarOpen, openSnackBar, closeSnackBar] = useSwitch()
    const dispatch = useDispatch()
    const subjectList = useAppSelector(selectSubjectList)
    const userId = useAppSelector(selectUserId)

    const { mutate: getSubjects, isLoading: isLoadingSubjects } = useMutation(Api.getSubjectsForUser, {
        onSuccess: (response: Api.HttpResponse<SubjectDto[]>) => {
            const subjectDtoList = response.data
            dispatch(setSubjectList(subjectDtoList.map(subjectDto => ({
                value: subjectDto.id,
                item: subjectDto.name,
            }))))

            setSubjectId(subjectDtoList[0].id)
        },
    })

    const { mutate: createCategory, isLoading: isCreatingCategory } = useMutation(Api.createCategory, {
        onSuccess: () => {
            openSnackBar()

            // Clear all content.
            setSubjectId(subjectList[0].value)
            setCategoryName('')
            setExpectedDuration(30)
        },
    })

    function handleSubjectChange(subjectId: number) {
        setSubjectId(subjectId)
    }

    function handleCreateCategory() {
        if (token === undefined) {
            return
        }

        createCategory({
            token,
            subjectId,
            expectedDuration,
            name: categoryName,
        })
    }

    function handleCategoryNameChange(event: ChangeEvent<HTMLInputElement>) {
        setCategoryName(event.target.value)
    }

    function handleExpectedDurationChange(event: ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value
        if (value === '') {
            setExpectedDuration(0)
        } else {
            const validValue = value.length > 1 && value[0] === '0' ? value.substring(1) : value
            const intValue = parseInt(validValue)
            if (!isNaN(intValue) && intValue > 0) {
                setExpectedDuration(intValue)
            }
        }
    }

    useEffect(() => {
        if (userId) {
            getSubjects(userId)
        }
    }, [getSubjects, userId])

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

    if (!userId) {
        return <Box />
    }

    return (
        <>
            <Box sx={styles.header}>
                <CategoryIcon />
                <Box sx={styles.headerTitle}> New Category </Box>
            </Box>

            <Grid container spacing={2} sx={styles.container}>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <SimpleSelect
                        label='Subject'
                        valueItemList={subjectList}
                        onValueChange={handleSubjectChange}
                        disabled={isLoadingSubjects}
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <TextField
                        fullWidth
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        label='Category Name'
                        variant='standard'
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <TextField
                        fullWidth
                        label='Expected Duration (min)'
                        type='number'
                        value={expectedDuration}
                        onChange={handleExpectedDurationChange}
                        variant='standard'
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <LoadingButton
                        fullWidth
                        variant='contained'
                        color='info'
                        loading={isCreatingCategory}
                        onClick={handleCreateCategory}
                    >
                        Create
                    </LoadingButton>
                </Grid>

                <Snackbar open={isSnackBarOpen} autoHideDuration={5000} onClose={closeSnackBar}>
                    <Alert onClose={closeSnackBar} severity='success' sx={{ width: '100%' }}>
                        Created category successfully.
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}