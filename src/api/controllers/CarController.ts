import { Request } from 'express';
import {
    Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, QueryParams, Req, UploadedFile,
    UseBefore
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { uploadOptions } from '../../lib/UploadOptions';
import { UploadResult } from '../interfaces';
import { CarParamsMapper } from '../mappers';
import { ExistsMiddleware } from '../middlewares';
import { Car } from '../models';
import { CarService } from '../services';
import { CarBody, CarParams } from './requests';
import { Response } from './responses';

@JsonController('/cars')
@OpenAPI({})
export class CarController {

    constructor(
        private carService: CarService
    ) { }

    @OpenAPI({
        description: 'Return all cars',
        parameters: [
            {
                $ref: '#/components/parameters/brand',
            },
            {
                $ref: '#/components/parameters/model',
            },
            {
                $ref: '#/components/parameters/color',
            },
            {
                $ref: '#/components/parameters/vin',
            },
            {
                $ref: '#/components/parameters/year',
            },
            {
                $ref: '#/components/parameters/order',
            },
            {
                $ref: '#/components/parameters/orderType',
            },
            {
                $ref: '#/components/parameters/perPage',
            },
            {
                $ref: '#/components/parameters/page',
            },
        ],
        responses: {
            200: {
                description: 'The request has succeeded.',
                content: {
                    'application/json': {
                        schema: {
                            allOf: [
                                {
                                    $ref: '#/components/schemas/SuccessfulResponse',
                                },
                                {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/CarResponse',
                                            },
                                        },
                                        _pagination: {
                                            $ref: '#/components/schemas/Pagination',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },

            },
            400: {
                $ref: '#/components/responses/BadRequestError',
            },
            500: {
                $ref: '#/components/responses/InternalServerError',
            },
        },
    })
    @Get()
    public async find(@QueryParams() params: CarParams, @Req() req: Request): Promise<Response<Car>> {
        const carParams = new CarParamsMapper(params);
        const { data, _pagination } = await this.carService.find(carParams, req);
        return new Response('Cars found', data, _pagination);
    }

    @OpenAPI({
        description: 'Return the given car',
        parameters: [
            {
                $ref: '#/components/parameters/id',
            },
        ],
        responses: {
            200: {
                description: 'The request has succeeded.',
                content: {
                    'application/json': {
                        schema: {
                            allOf: [
                                {
                                    $ref: '#/components/schemas/SuccessfulResponse',
                                },
                                {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            $ref: '#/components/schemas/CarResponse',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },

            },
            400: {
                $ref: '#/components/responses/BadRequestError',
            },
            404: {
                $ref: '#/components/responses/NotFoundError',
            },
            500: {
                $ref: '#/components/responses/InternalServerError',
            },
        },
    })
    @UseBefore(ExistsMiddleware)
    @Get('/:id')
    public async one(@Req() req: Request): Promise<Response<Car>> {
        const { entities: { Car: car } } = req;
        return new Response('Car found', car as Car);
    }

    @OpenAPI({
        description: 'Create a car',
        responses: {
            201: {
                description: 'The request has succeeded and a new resource has been created as a result.',
                content: {
                    'application/json': {
                        schema: {
                            allOf: [
                                {
                                    $ref: '#/components/schemas/SuccessfulResponse',
                                },
                                {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            $ref: '#/components/schemas/CarResponse',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },

            },
            400: {
                $ref: '#/components/responses/BadRequestError',
            },
            409: {
                $ref: '#/components/responses/ConflictError',
            },
            500: {
                $ref: '#/components/responses/InternalServerError',
            },
        },
        requestBody: {
            $ref: '#/components/requestBodies/NewCar',
        },
    })
    @Post()
    @HttpCode(201)
    public async create(@Body({ validate: true }) car: CarBody): Promise<Response<Car>> {
        const createdCar = await this.carService.create(car);
        return new Response('Car created', createdCar);
    }

    @OpenAPI({
        description: 'Upload a cars CSV file',
        responses: {
            201: {
                description: 'The request has succeeded and a new resources have been created as a result.',
                content: {
                    'application/json': {
                        schema: {
                            allOf: [
                                {
                                    $ref: '#/components/schemas/SuccessfulResponse',
                                },
                                {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            $ref: '#/components/schemas/UploadResult',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },

            },
            400: {
                $ref: '#/components/responses/BadRequestError',
            },
            413: {
                $ref: '#/components/responses/PayloadTooLargeError',
            },
            500: {
                $ref: '#/components/responses/InternalServerError',
            },
        },
        requestBody: {
            $ref: '#/components/requestBodies/CsvFile',
        },
    })
    @Post('/upload')
    @HttpCode(201)
    public async upload(@UploadedFile('file', uploadOptions) file: Express.Multer.File): Promise<Response<UploadResult>> {
        // improvements: set the response status code to 202 and process the CSV
        // in background (for example, with a message broker like RabbitMQ)
        const uploadResult = await this.carService.upload(file);
        return new Response('CSV file process result', uploadResult);
    }

    @OpenAPI({
        description: 'Update the given car',
        parameters: [
            {
                $ref: '#/components/parameters/id',
            },
        ],
        responses: {
            200: {
                description: 'The request has succeeded.',
                content: {
                    'application/json': {
                        schema: {
                            allOf: [
                                {
                                    $ref: '#/components/schemas/SuccessfulResponse',
                                },
                                {
                                    type: 'object',
                                    properties: {
                                        data: {
                                            $ref: '#/components/schemas/CarResponse',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },

            },
            400: {
                $ref: '#/components/responses/BadRequestError',
            },
            404: {
                $ref: '#/components/responses/NotFoundError',
            },
            409: {
                $ref: '#/components/responses/ConflictError',
            },
            500: {
                $ref: '#/components/responses/InternalServerError',
            },
        },
        requestBody: {
            $ref: '#/components/requestBodies/NewCar',
        },
    })
    @UseBefore(ExistsMiddleware)
    @Put('/:id')
    public async update(@Body({ validate: true }) car: CarBody, @Req() req: Request): Promise<Response<Car>> {
        const { entities: { Car: currentCar } } = req;
        const updatedCar = await this.carService.update(currentCar as Car, car);
        return new Response('Car updated', updatedCar);
    }

    @OpenAPI({
        description: 'Removes the given car',
        parameters: [
            {
                $ref: '#/components/parameters/id',
            },
        ],
        responses: {
            200: {
                $ref: '#/components/responses/OK',
            },
            400: {
                $ref: '#/components/responses/BadRequestError',
            },
            404: {
                $ref: '#/components/responses/NotFoundError',
            },
            500: {
                $ref: '#/components/responses/InternalServerError',
            },
        },
    })
    @UseBefore(ExistsMiddleware)
    @Delete('/:id')
    public async delete(@Param('id') id: string): Promise<Response<void>> {
        await this.carService.delete(id);
        return new Response('Car deleted');
    }

}
