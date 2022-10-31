import { MigrationInterface, QueryRunner } from "typeorm";

export class gamtaner1666878072377 implements MigrationInterface {
    name = 'gamtaner1666878072377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` text NULL, \`lastName\` text NULL, \`email\` text NULL, \`password\` text NOT NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, \`ip\` text NULL, \`token\` text NULL, \`tokenExpire\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`apiName\` text NULL, \`errorMessage\` text NULL, \`remoteIp\` text NULL, \`localeIp\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` text NULL, \`address_eng\` text NULL, \`email\` text NULL, \`phone\` int NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`about_us\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NULL, \`title_eng\` text NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, \`image\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`our_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NULL, \`title_eng\` text NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`complated_projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`project_name\` text NOT NULL, \`project_name_eng\` text NOT NULL, \`description\` text NULL, \`description_eng\` text NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, \`images\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`complated_projects\``);
        await queryRunner.query(`DROP TABLE \`our_users\``);
        await queryRunner.query(`DROP TABLE \`about_us\``);
        await queryRunner.query(`DROP TABLE \`contacts\``);
        await queryRunner.query(`DROP TABLE \`logs\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
