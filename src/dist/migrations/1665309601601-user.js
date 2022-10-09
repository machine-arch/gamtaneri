"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user1665309601601 = void 0;
class user1665309601601 {
    name = 'user1665309601601';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` text NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` text NULL DEFAULT 'NULL'`);
    }
}
exports.user1665309601601 = user1665309601601;
