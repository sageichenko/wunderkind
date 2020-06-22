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
    setUser: ( state, user ) => {
        state.currentUser = user;
    },
};
export default actions;
