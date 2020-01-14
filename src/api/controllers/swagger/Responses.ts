// import * as oa from 'openapi3-ts';

export const responses = {
    OK: {
        description: 'The request has succeeded.',
        content: {
            'application/ json': {
                schema: {
                    $ref: '#/components/schemas/SuccessfulResponse',
                },
            },
        },
    },

    BadRequestError: {
        description: 'The request body is invalid.',
        content: {
            'application/json': {
                schema: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/ErrorResponse',
                        },
                        {
                            type: 'object',
                            properties: {
                                errors: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/ValidationError',
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
    },

    NotFoundError: {
        description: 'The requested resource was not found.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    name: 'NotFoundError',
                    message: 'ResourceName not found',
                },
            },
        },
    },

    InternalServerError: {
        description: 'An error ocurred while performing the request.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    name: 'InternalServerError',
                    message: 'The server could not process the request, please try again later',
                },
            },
        },
    },

    ConflictError: {
        description: 'The request conflicts with the current state of the server.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    name: 'ConflictError',
                    message: 'Car VIN must be unique',
                },
            },
        },
    },

    PayloadTooLargeError: {
        description: 'Request entity is larger than limits defined by server.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    name: 'PayloadTooLargeError',
                    message: 'File Too Large',
                },
            },
        },
    },
};
