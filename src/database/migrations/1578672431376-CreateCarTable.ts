import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCarTable1578672431376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "car" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "brand" character varying(255) NOT NULL,
                "model" character varying(255) NOT NULL,
                "year" smallint NOT NULL,
                "color" character varying(255) NOT NULL,
                "vin" character varying(255) UNIQUE NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('car');
    }

}
