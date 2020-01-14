export const schemas = {
    SuccessfulResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: 'Resource found|created|updated|deleted.',
            },
        },
    },

    ErrorResponse: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            message: {
                type: 'string',
            },
        },
    },

    ValidationError: {
        type: 'object',
        properties: {
            field: {
                type: 'string',
                example: 'brand',
            },
            constraints: {
                type: 'object',
                example: {
                    isNotEmpty: 'brand should not be empty',
                },
            },
            children: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/ValidationError',
                },
                example: {
                    field: 0,
                    children: [
                        {
                            field: 'id',
                            constraints: {
                                isUuid: 'id must be an UUID',
                            },
                        },
                    ],
                },
            },
        },
    },

    NewCar: {
        type: 'object',
        properties: {
            brand: {
                type: 'string',
                required: true,
                example: 'Ford',
            },
            model: {
                type: 'string',
                required: true,
                example: 'E150',
            },
            year: {
                type: 'number',
                required: true,
                example: 2011,
            },
            color: {
                type: 'string',
                required: true,
                example: 'Orange',
            },
            vin: {
                type: 'string',
                required: true,
                example: 'WBAKX6C52CC102155',
            },
        },
    },

    Pagination: {
        type: 'object',
        properties: {
            total_records: {
                type: 'number',
                example: '50',
            },
            page_size: {
                type: 'number',
                example: '10',
            },
            page_number: {
                type: 'number',
                example: '1',
            },
            _links: {
                type: 'object',
                properties: {
                    first: {
                        type: 'string',
                        example: '/api/v1/cars?order=brand&order_type=asc&page=1&per_page=10',
                    },
                    previous: {
                        type: 'string',
                        example: 'null',
                    },
                    actual: {
                        type: 'string',
                        example: '/api/v1/cars?order=brand&order_type=asc&page=1&per_page=10',
                    },
                    next: {
                        type: 'string',
                        example: '/api/v1/cars?order=brand&order_type=asc&page=2&per_page=10',
                    },
                    last: {
                        type: 'string',
                        example: '/api/v1/cars?order=brand&order_type=asc&page=3&per_page=10',
                    },
                },
            },
        },
    },

    LineError: {
        type: 'object',
        properties: {
            line: {
                type: 'number',
                example: 17,
            },
            message: {
                type: 'string',
                example: 'Car VIN must be unique',
            },
        },
    },

    UploadResult: {
        type: 'object',
        properties: {
            total: {
                type: 'number',
                example: 150,
            },
            insertedRows: {
                type: 'number',
                example: 140,
            },
            errors: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/LineError',
                },
                example: {
                    line: 17,
                    message: 'Car VIN must be unique',
                },
            },
        },
    },
};
