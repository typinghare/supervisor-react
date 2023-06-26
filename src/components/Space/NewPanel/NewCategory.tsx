import { Box, Grid, TextField } from '@mui/material'
import { collectStyles } from '../../../common/functions/style'
import { SimpleSelect } from '../../Common/SimpleSelect'
import { ChangeEvent, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import { SubjectDto } from '../../../dto/SubjectDto'
import { LoadingButton } from '@mui/lab'
import useSwitch from '../../../hook/useSwitch'
import { useDispatch } from 'react-redux'
import { selectSubjectList, setSubjectList } from '../../../redux/slice/SpaceSlice'
import { useAppSelector } from '../../../redux/hooks'
import { selectToken, selectUserId } from '../../../redux/slice/UserSlice'
import CategoryIcon from '@mui/icons-material/Category'
import { AlertSnackBar } from '../../Common/AlertSnackBar'

export function NewCategory(): JSX.Element {
    const [subjectId, setSubjectId] = useState<number>(0)
    const [categoryName, setCategoryName] = useState<string>('')
    const [expectedDurationMin, setExpectedDurationMin] = useState<string>('30')
    const token = useAppSelector(selectToken)
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
            setCategoryName('')
            setExpectedDurationMin('30')
        },
    })

    function handleSubjectChange(subjectId: number) {
        setSubjectId(subjectId)
    }

    function handleCreateCategory() {
        if (token === undefined) {
            return
        }

        const expectedDurationMinInt: number = parseInt(expectedDurationMin)
        if (isNaN(expectedDurationMinInt)) {
            return
        }

        createCategory({
            token,
            subjectId,
            expectedDuration: expectedDurationMinInt * 60,
            name: categoryName,
        })
    }

    function handleCategoryNameChange(event: ChangeEvent<HTMLInputElement>) {
        setCategoryName(event.target.value)
    }

    function handleExpectedDurationChange(event: ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value
        setExpectedDurationMin(value)
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
                <Grid item xs={12} md={4} lg={3}>
                    <SimpleSelect
                        label='Subject'
                        valueItemList={subjectList}
                        onValueChange={handleSubjectChange}
                        disabled={isLoadingSubjects}
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <TextField
                        fullWidth
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        label='Category Name'
                        variant='standard'
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <TextField
                        fullWidth
                        label='Expected Duration (min)'
                        type='number'
                        value={expectedDurationMin}
                        onChange={handleExpectedDurationChange}
                        variant='standard'
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
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

                <AlertSnackBar
                    open={isSnackBarOpen}
                    onClose={closeSnackBar}
                    severity='success'
                >
                    Created category successfully.
                </AlertSnackBar>
            </Grid>
        </>
    )
}