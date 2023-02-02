import { MigrationInterface, QueryRunner } from "typeorm";

export class varchar101674135223284 implements MigrationInterface {
    name = 'varchar101674135223284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name\` varchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name_eng\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name_eng\` varchar(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name_eng\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name_eng\` varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name\` varchar(300) NOT NULL`);
    }

}
