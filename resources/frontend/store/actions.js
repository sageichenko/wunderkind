import Vue from 'vue';

function saveImg(image, id) {
    const data = new FormData();

    data.set('id', id);
    data.set('image', image);

    Vue.axios.post(`/save-img`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

    )
        .then(function (response) {
            console.log('response save img', response.data);
        })
        .catch(function (error) {
            console.log('error save img', error);
        });
}

const actions = {
    getAllTasks: ( { commit } ) => {
        Vue.axios.get('/get-tasks')
            .then(function (response) {
                commit('setTasks', response.data);
                console.log('response', response.data);
            })
            .catch(function (error) {
                console.log('error', error);
            });
    },
    getTasks: ({ commit }, options) => {
        Vue.axios.get('/get-filter-tasks', {params: options})
            .then(function (response) {
                console.log('response', response.data);
                commit('setTasks', response.data);
            })
            .catch(function (error) {
                console.log('error', error);
            });

        // commit(
        //     'setTasks',
        //     allTasksList.reduce(
        //         (reqTask, currentTask) => {
        //             let isReq = true;
        //
        //             for (const optionId in options) {
        //                 if (!options.hasOwnProperty(optionId)) {
        //                     return;
        //                 }
        //
        //                 isReq = isReq && (currentTask[optionId] === options[optionId]);
        //             }
        //
        //             if (isReq) {
        //                 reqTask.push(currentTask);
        //             }
        //
        //             return reqTask;
        //         }, []
        //     )
        // );
    },
    setCategories: ({ commit }) => {
        Vue.axios.get('/get-categories')
            .then(function (response) {
                commit('setCategories', response.data);
                console.log('response', response.data);
            })
            .catch(function (error) {
                console.log('error', error);
            });
    },
    getTask: ({ commit }, id) => {
        Vue.axios.get(`/get-task`, {
            params: {
                id: id
            }
        })
            .then(function (response) {
                commit('setTask', response.data);
                console.log('response', response.data);
            })
            .catch(function (error) {
                console.log('error', error);
            });
    },
    saveTask: ({ commit }, props) => {
        Vue.axios.post(`/save-task`, {
            params: {
                task: JSON.stringify(props.task)
            }
        })
            .then(function (response) {
                if (props.image && response.data.id) {
                    saveImg(props.image, response.data.id);
                }
                console.log('response save task', response.data);
            }.bind(this))
            .catch(function (error) {
                console.log('error save task', error);
            });
    },
    deleteTask: ({ commit }, id) => {
        Vue.axios.get(`/delete-task`, {
            params: {
                id: id
            }
        })
            .then(function (response) {
                console.log('response delete task', response.data);
            })
            .catch(function (error) {
                console.log('error delete task', error);
            });
    },
};
export default actions;
