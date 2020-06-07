const actions = {
    setTasks: ( state, tasksList ) => {
        state.tasksList = [...tasksList];
    },
    setTask: ( state, task ) => {
        state.task = task;
    },
};
export default actions;
