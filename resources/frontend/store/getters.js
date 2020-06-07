const getters = {
    tasks: state => state.tasksList,
    task: state => state.task,
    categories: state => state.categories,
    currentUser: state => state.currentUser,
};
export default getters;
