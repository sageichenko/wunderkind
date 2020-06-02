const getters = {
    tasksList: state => categoryId => {
        state.tasksList = state.allTasksList.reduce((reqTask, currentTask) => {
            if (currentTask.category_id === categoryId) {
                reqTask.push(currentTask);
            }

            return reqTask;
        }, []);
    },
    allTasksList: state => {
        state.tasksList = state.allTasksList;
    },
    tasks: state => state.tasksList,
};
export default getters;
