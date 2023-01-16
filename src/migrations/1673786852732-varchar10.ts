import { MigrationInterface, QueryRunner } from "typeorm";

export class varchar101673786852732 implements MigrationInterface {
    name = 'varchar101673786852732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`our_users\` ADD \`profile_link\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`position\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name_eng\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name_eng\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`images\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`images\` varchar(300) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`images\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`images\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name_eng\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name_eng\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`project_name\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`project_name\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`position\``);
        await queryRunner.query(`ALTER TABLE \`our_users\` DROP COLUMN \`profile_link\``);
    }

}
