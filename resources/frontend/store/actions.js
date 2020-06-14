const allTasksList = [
    {
        id: '0',
        title: 'Task 1',
        categoryId: 'logic',
        categoryImg: '/frontend/assets/images/tasks/1.jpg',
        authorId: 0,
        exercises: [
            {
                type: 'combination',
                condition: 'Составь выражение, значение которого равно 8',
                results: [
                    [0, 2, 1],
                    [1, 2, 0],
                ],
                inputs: [
                    {
                        id: 0,
                        content: {
                            image: '',
                            text: '4',
                        }
                    },
                    {
                        id: 1,
                        content: {
                            image: '',
                            text: '2',
                        }
                    },
                    {
                        id: 2,
                        content: {
                            image: '',
                            text: '*',
                        }
                    },
                ],
            },
            {
                type: 'order',
                condition: 'Составь предложение из слов',
                results: [
                    [3, 2, 0, 1],
                ],
                inputs: [
                    {
                        id: 0,
                        content: {
                            image: '',
                            text: 'is',
                        }
                    },
                    {
                        id: 1,
                        content: {
                            image: '',
                            text: 'red',
                        }
                    },
                    {
                        id: 2,
                        content: {
                            image: '',
                            text: 'ball',
                        }
                    },
                    {
                        id: 3,
                        content: {
                            image: '',
                            text: 'the',
                        }
                    },
                ],
            },
            {
                type: 'combination',
                condition: 'Составь выражение, значение которого равно 12',
                results: [
                    [0, 2, 1],
                    [1, 2, 0],
                ],
                inputs: [
                    {
                        id: 0,
                        content: {
                            image: '',
                            text: '4',
                        }
                    },
                    {
                        id: 1,
                        content: {
                            image: '',
                            text: '3',
                        }
                    },
                    {
                        id: 2,
                        content: {
                            image: '',
                            text: '*',
                        }
                    },
                    {
                        id: 3,
                        content: {
                            image: '',
                            text: '8',
                        }
                    },
                ],
            }
        ],

    },
    { id: '1', title: 'Task 2', categoryId: 'math',
        categoryImg: '/frontend/assets/images/tasks/1.jpg', },
    { id: '2', title: 'Task 3', categoryId: 'math',
        categoryImg: '/frontend/assets/images/tasks/1.jpg', },
    { id: '3', title: 'Task 4', categoryId: 'english',
        categoryImg: '/frontend/assets/images/tasks/1.jpg', },
    { id: '4', title: 'Task 5', categoryId: 'math',
        categoryImg: '/frontend/assets/images/tasks/1.jpg', },
];

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
        commit(
            'setTasks',
            allTasksList.reduce(
                (reqTask, currentTask) => {
                    let isReq = true;

                    for (const optionId in options) {
                        if (!options.hasOwnProperty(optionId)) {
                            return;
                        }

                        isReq = isReq && (currentTask[optionId] === options[optionId]);
                    }

                    if (isReq) {
                        reqTask.push(currentTask);
                    }

                    return reqTask;
                }, []
            )
        );
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
