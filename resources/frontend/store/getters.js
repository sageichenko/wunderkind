const getters = {
    tasks: state => state.tasksList,
    task: state => state.task,
    categories: state => state.categories,
    currentUser: state => state.currentUser,
    serverResponse: state => state.serverResponse,
};
export default getters;
