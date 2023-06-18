import { Alert, Box, Button, Grid, Snackbar, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Api from '../../common/api'
import { SubjectDto } from '../../dto/SubjectDto'
import { SimpleSelect } from '../Common/SimpleSelect'
import { CategoryDto } from '../../dto/CategoryDto'
import EventIcon from '@mui/icons-material/Event'
import { collectStyles } from '../../common/functions/style'
import { TaskAction } from '../../common/enum/TaskAction'
import { useSwitch } from '../../hook/useSwitch'

export interface NewPanelProps {
    userId: number
}

export function NewPanel(props: NewPanelProps): JSX.Element {
    const { userId } = props

    return (
        <>
            <NewTask userId={userId} />
        </>
    )
}


function NewTask(props: NewPanelProps): JSX.Element {
    const { userId } = props
    const [subjectMap, setSubjectMap] = useState<Record<number, string>>({})
    const [categoryMap, setCategoryMap] = useState<Record<number, string>>({})
    const [categoryId, setCategoryId] = useState<number>(0)
    const [isSnackBarOpen, openSnackBar, closeSnackBar] = useSwitch()

    const { mutate: getSubjects, isLoading: isLoadingSubjects } = useMutation(Api.getSubjectsForUser, {
        onSuccess: (response: Api.HttpResponse<SubjectDto[]>) => {
            const subjectDtoList = response.data
            setSubjectMap(subjectDtoList.reduce((map, subjectDto) => {
                map[subjectDto.id] = subjectDto.name
                return map
            }, {} as Record<number, string>))
        },
    })

    const { mutate: getCategories, isLoading: isLoadingCategories } = useMutation(Api.getCategoriesForSubject, {
        onSuccess: (response: Api.HttpResponse<CategoryDto[]>) => {
            const categoryDtoList = response.data
            setCategoryMap(categoryDtoList.reduce((map, categoryDto) => {
                map[categoryDto.id] = categoryDto.name
                return map
            }, {} as Record<number, string>))
        },
    })

    const { mutate: createTask, isLoading: isCreatingTask } = useMutation(Api.createTask, {
        onSuccess: () => {
            // Task created.
        },
    })

    const {
        mutate: createAndStartTask,
        isLoading: isCreatingAndStartingTask,
    } = useMutation(async (categoryId: number) => {
        const createTaskResponse = await Api.createTask(categoryId)
        const { id: taskId } = createTaskResponse.data

        await Api.updateTask({
            taskId,
            taskAction: TaskAction.START,
        })

        // Task creating.
    }, {
        onSuccess: () => {

        },
    })

    function handleSubjectChange(subjectId: number) {
        getCategories(subjectId)
    }

    function handleCategoryChange(categoryId: number) {
        setCategoryId(categoryId)
    }

    function handleCreate() {
        createTask(categoryId)
    }

    function handleCreateAndStart() {
        createAndStartTask(categoryId)
    }

    useEffect(() => {
        getSubjects(userId)
    }, [userId])

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
                <EventIcon />
                <Box sx={styles.headerTitle}> New Task </Box>
            </Box>
            <Grid container spacing={2} sx={styles.container}>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <SimpleSelect
                        label='Subject'
                        valueItemMap={subjectMap}
                        onValueChange={handleSubjectChange}
                        disabled={isLoadingSubjects}
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <SimpleSelect
                        label='Category'
                        valueItemMap={categoryMap}
                        onValueChange={handleCategoryChange}
                        disabled={isLoadingCategories}
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={12} lg={4} xl={6}>
                    <TextField
                        fullWidth
                        label='Comment'
                        variant='standard'
                        size='small'
                    />
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <Button
                        fullWidth
                        variant='contained'
                        color='info'
                        disabled={isCreatingTask}
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <Button
                        fullWidth
                        variant='contained'
                        color='success'
                        disabled={isCreatingAndStartingTask}
                        onClick={handleCreateAndStart}
                    >
                        Create and Start
                    </Button>
                </Grid>

                <Snackbar open={isSnackBarOpen} autoHideDuration={6000} onClose={closeSnackBar}>
                    <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}