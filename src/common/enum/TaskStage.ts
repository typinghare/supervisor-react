export enum TaskStage {
    /**
     * The task hasn't been started.
     */
    PENDING = 0,

    /**
     * The task is ongoing and duration is counting.
     * Users cannot start another task while the task is ongoing.
     */
    ONGOING = 1,

    /**
     * The task has been paused and duration is not counting.
     * Users can start another task if the task is paused.
     */
    PAUSED = 2,

    /**
     * The task has been ended.
     */
    ENDED = 3,
}