import { MigrationInterface, QueryRunner } from "typeorm";

export class user1666082846156 implements MigrationInterface {
    name = 'user1666082846156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` text NULL, \`lastName\` text NULL, \`email\` text NULL, \`password\` text NOT NULL, \`createdAt\` timestamp NULL, \`updatedAt\` timestamp NULL, \`ip\` text NULL, \`token\` text NULL, \`tokenExpire\` timestamp NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`apiName\` text NULL, \`errorMessage\` text NULL, \`remoteIp\` text NULL, \`localeIp\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`logs\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
