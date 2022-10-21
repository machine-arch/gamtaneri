import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1666186131081 implements MigrationInterface {
    name = 'createTables1666186131081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` text NULL, \`address_eng\` text NULL, \`email\` text NULL, \`phone\` int NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`about_us\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NULL, \`title_eng\` text NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, \`image\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`our_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NULL, \`title_eng\` text NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`complated_projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`project_name\` text NOT NULL, \`project_name_eng\` text NOT NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, \`images\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`ip\` \`ip\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`tokenExpire\` \`tokenExpire\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`apiName\` \`apiName\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`errorMessage\` \`errorMessage\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`remoteIp\` \`remoteIp\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`remoteIp\` \`remoteIp\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`errorMessage\` \`errorMessage\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`apiName\` \`apiName\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`tokenExpire\` \`tokenExpire\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`token\` \`token\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`ip\` \`ip\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`complated_projects\``);
        await queryRunner.query(`DROP TABLE \`our_users\``);
        await queryRunner.query(`DROP TABLE \`about_us\``);
        await queryRunner.query(`DROP TABLE \`contacts\``);
    }

}
