export const parameters = {
    id: {
        name: 'id',
        in: 'path',
        description: 'ID of the required resource.',
        required: true,
        schema: {
            type: 'string',
            format: 'uuid',
        },
    },

    perPage: {
        name: 'per_page',
        in: 'query',
        description: 'Number of results to return per page. By default **10**.',
        required: false,
        schema: {
            type: 'integer',
        },
    },

    page: {
        name: 'page',
        in: 'query',
        description: 'Number of page to return. By default **1**.',
        required: false,
        schema: {
            type: 'integer',
        },
    },

    order: {
        name: 'order',
        in: 'query',
        description: 'Order cars by attribute. By default **brand**.',
        required: false,
        schema: {
            type: 'string',
            enum: ['brand', 'model', 'year', 'color', 'vin', 'updated_at', 'created_at'],
            default: 'brand',
        },
    },

    orderType: {
        name: 'order_type',
        in: 'query',
        description: 'Choose between ascending or descending ordering. Uses ascending order by default.',
        required: false,
        schema: {
            type: 'string',
            enum: ['asc', 'desc'],
            default: 'asc',
        },
    },

    brand: {
        name: 'brand',
        in: 'query',
        description: 'Filter by brand. Valid operators: **contains**, **eq**.',
        required: false,
        style: 'deepObject',
        schema: {
            type: 'object',
        },
        example: '{ "contains": "value" }',
    },

    model: {
        name: 'model',
        in: 'query',
        description: 'Filter by model. Valid operators: **contains**, **eq**.',
        required: false,
        style: 'deepObject',
        schema: {
            type: 'object',
        },
        example: '{ "contains": "value" }',
    },

    color: {
        name: 'color',
        in: 'query',
        description: 'Filter by color. Valid operators: **eq**.',
        required: false,
        style: 'deepObject',
        schema: {
            type: 'object',
        },
        example: '{ "eq": "violet" }',
    },

    vin: {
        name: 'vin',
        in: 'query',
        description: 'Filter by VIN. Valid operators: **contains**, **eq**.',
        required: false,
        style: 'deepObject',
        schema: {
            type: 'object',
        },
        example: '{ "eq": "WDDGF4HB9ER802405" }',
    },

    year: {
        name: 'year',
        in: 'query',
        description: 'Filter by year. Valid operators: **eq**, **gte**, **lte**, **gt**, **lt**, **neq** .',
        required: false,
        style: 'deepObject',
        schema: {
            type: 'object',
        },
        example: '{ "gte": 2000 }',
    },
};
