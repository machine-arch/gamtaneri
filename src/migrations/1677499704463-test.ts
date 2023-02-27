import { MigrationInterface, QueryRunner } from "typeorm";

export class test1677499704463 implements MigrationInterface {
    name = 'test1677499704463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`our_users\` CHANGE \`position\` \`isTop\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` CHANGE \`position\` \`isTop\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`our_users\` DROP COLUMN \`isTop\``);
        await queryRunner.query(`ALTER TABLE \`our_users\` ADD \`isTop\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`isTop\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`isTop\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`complated_projects\` DROP COLUMN \`isTop\``);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` ADD \`isTop\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`our_users\` DROP COLUMN \`isTop\``);
        await queryRunner.query(`ALTER TABLE \`our_users\` ADD \`isTop\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`complated_projects\` CHANGE \`isTop\` \`position\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`our_users\` CHANGE \`isTop\` \`position\` int NULL`);
    }

}
