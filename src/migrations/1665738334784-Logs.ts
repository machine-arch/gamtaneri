import { MigrationInterface, QueryRunner } from "typeorm";

export class Logs1665738334784 implements MigrationInterface {
    name = 'Logs1665738334784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`apiName\` text NULL, \`errorMessage\` text NULL, \`remoteIp\` text NULL, \`localeIp\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`ip\` \`ip\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`tokenExpire\` \`tokenExpire\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`tokenExpire\` \`tokenExpire\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`ip\` \`ip\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`logs\``);
    }

}
