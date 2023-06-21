import { ChangeEvent, useEffect, useState } from 'react'
import useSwitch from '../../../hook/useSwitch'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import { SubjectDto } from '../../../dto/SubjectDto'
import { CategoryDto } from '../../../dto/CategoryDto'
import { TaskAction } from '../../../common/enum/TaskAction'
import { collectStyles } from '../../../common/functions/style'
import { Box, Button, Grid, TextField } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import { SimpleSelect, ValueItemEntry } from '../../Common/SimpleSelect'
import { selectToken, selectUserId } from '../../../redux/slice/UserSlice'
import { useAppSelector } from '../../../redux/hooks'
import { useDispatch } from 'react-redux'
import { selectSubjectList, setSubjectList } from '../../../redux/slice/SpaceSlice'
import { TaskDto } from '../../../dto/TaskDto'
import { AlertSnackBar } from '../../Common/AlertSnackBar'
import HttpResponse = Api.HttpResponse

export function NewTask(): JSX.Element {
    const subjectList = useAppSelector(selectSubjectList)
    const [subjectId, setSubjectId] = useState<number | ''>('')
    const [categoryList, setCategoryList] = useState<ValueItemEntry[]>([])
    const [categoryId, setCategoryId] = useState<number | ''>('')
    const [comment, setComment] = useState<string>('')
    const [isSnackBarOpen, openSnackBar, closeSnackBar] = useSwitch()
    const [snackBarMessage, setSnackBarMessage] = useState<string>('')
    const userId = useAppSelector(selectUserId)
    const token = useAppSelector(selectToken)
    const dispatch = useDispatch()

    const { mutate: getSubjects, isLoading: isLoadingSubjects } = useMutation(Api.getSubjectsForUser, {
        onSuccess: (response: Api.HttpResponse<SubjectDto[]>) => {
            const subjectDtoList = response.data
            dispatch(setSubjectList(subjectDtoList.map(subjectDto => ({
                value: subjectDto.id,
                item: subjectDto.name,
            }))))
        },
    })

    const { mutate: getCategories, isLoading: isLoadingCategories } = useMutation(Api.getCategoriesForSubject, {
        onSuccess: (response: Api.HttpResponse<CategoryDto[]>) => {
            const categoryDtoList = response.data
            setCategoryList(categoryDtoList.map(categoryDto => ({
                value: categoryDto.id,
                item: categoryDto.name,
            })))
        },
    })

    const { mutate: createTaskComment, isLoading: isCreatingTaskComment } = useMutation(Api.createTaskComment)

    const { mutate: createTask, isLoading: isCreatingTask } = useMutation(Api.createTask, {
        onSuccess: (response: HttpResponse<TaskDto>) => {
            const taskDto = response.data
            if (token && comment) {
                createTaskComment({
                    token, taskId: taskDto.id, content: comment,
                })
            }

            setSnackBarMessage('Created task successfully.')
            openSnackBar()

            // Clear content.
            setComment('')
        },
    })

    const {
        mutate: createAndStartTask,
        isLoading: isCreatingAndStartingTask,
    } = useMutation(async (categoryId: number): Promise<Api.HttpResponse<TaskDto>> => {
        if (token === undefined) {
            throw new Error()
        }

        const createTaskResponse = await Api.createTask({
            token, categoryId,
        })
        const { id: taskId } = createTaskResponse.data

        await Api.updateTask({
            token,
            taskId,
            taskAction: TaskAction.START,
        })

        return createTaskResponse
    }, {
        onSuccess: (response: HttpResponse<TaskDto>) => {
            const taskDto = response.data
            if (token && comment) {
                createTaskComment({
                    token, taskId: taskDto.id, content: comment,
                })
            }

            setSnackBarMessage('Created task and started it successfully.')
            openSnackBar()

            // Clear content.
            setComment('')
        },
    })

    function handleSubjectChange(subjectId: number) {
        setSubjectId(subjectId)
        setCategoryList([])
        setCategoryId('')
        getCategories(subjectId)
    }

    function handleCategoryChange(categoryId: number) {
        setCategoryId(categoryId)
    }

    function handleCreate() {
        if (token === undefined || categoryId === '') {
            return
        }

        createTask({ token, categoryId })
    }

    function handleCreateAndStart() {
        if (categoryId === '') {
            return
        }

        createAndStartTask(categoryId)
    }

    function handleCommentChange(event: ChangeEvent<HTMLInputElement>) {
        setComment(event.target.value)
    }

    function handleCategorySelectFocus() {
        if (subjectId !== '') {
            getCategories(subjectId)
        }
    }

    useEffect(() => {
        if (userId) {
            getSubjects(userId)
        }
    }, [userId, getSubjects])

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
                        label={isLoadingSubjects ? 'Loading subjects ...' : 'Subject'}
                        valueItemList={subjectList}
                        onValueChange={handleSubjectChange}
                        disabled={isLoadingSubjects}
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <SimpleSelect
                        label={isLoadingCategories ? 'Loading categories ...' : 'Category'}
                        valueItemList={categoryList}
                        onValueChange={handleCategoryChange}
                        onFocus={handleCategorySelectFocus}
                        disabled={isLoadingCategories || subjectId === ''}
                        size='small'
                    />
                </Grid>

                <Grid item xs={12} md={12} lg={4} xl={6}>
                    <TextField
                        fullWidth
                        label='Comment'
                        variant='standard'
                        size='small'
                        value={comment}
                        onChange={handleCommentChange}
                        disabled={isCreatingTaskComment}
                    />
                </Grid>

                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <Button
                        fullWidth
                        variant='contained'
                        color='info'
                        disabled={isCreatingTask || isCreatingTaskComment}
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
                        disabled={isCreatingAndStartingTask || isCreatingTaskComment}
                        onClick={handleCreateAndStart}
                    >
                        Create & Start
                    </Button>
                </Grid>

                <AlertSnackBar
                    open={isSnackBarOpen}
                    severity={'success'}
                    onClose={closeSnackBar}
                >
                    {snackBarMessage}
                </AlertSnackBar>
            </Grid>
        </>
    )
}