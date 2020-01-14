export const requestBodies = {
    NewCar: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/NewCar',
                },
            },
        },
    },

    CsvFile: {
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
        },
        required: true,
    },
};
