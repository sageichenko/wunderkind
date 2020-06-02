const state = {
    allTasksList: [
        {
            id: '0',
            title: 'Task 1',
            category_id: 'logic',
            exercises: [
                {
                    taskCondition: 'Составь выражение, значение которого равно 8',
                    inputs: [
                        {
                            order: 3,
                            content: {
                                image: '',
                                text: '4',
                            }
                        },
                        {
                            order: 1,
                            content: {
                                image: '',
                                text: '2',
                            }
                        },
                        {
                            order: null,
                            content: {
                                image: '',
                                text: '4',
                            }
                        },
                        {
                            order: 2,
                            content: {
                                image: '',
                                text: '*',
                            }
                        },
                    ],
                }
            ],

        },
        { id: '1', title: 'Task 2', category_id: 'math' },
        { id: '2', title: 'Task 3', category_id: 'math' },
        { id: '3', title: 'Task 4', category_id: 'english' },
        { id: '4', title: 'Task 5', category_id: 'math' },
    ],

    tasksList: [],
};

export default state;
