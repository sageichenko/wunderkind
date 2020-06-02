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
    task: state => taskId => state.allTasksList.reduce(
        (acc, task) => {
            if (task.id === taskId) {
                acc = task;
            }

            return acc;
        }, {})
};
export default getters;
