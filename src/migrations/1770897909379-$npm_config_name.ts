import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1770897909379 implements MigrationInterface {
    name = ' $npmConfigName1770897909379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_destination_description" ON "destination" ("description") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_destination_description"`);
    }

}
