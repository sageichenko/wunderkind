const actions = {
    setTasks: ( state, tasksList ) => {
        state.tasksList = [...tasksList];
    },
    setCategories: ( state, categories ) => {
        state.categories = [...categories];
    },
    setTask: ( state, task ) => {
        state.task = task;
    },
};
export default actions;
