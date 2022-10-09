"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kata1665309887222 = void 0;
class kata1665309887222 {
    name = 'kata1665309887222';
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
exports.kata1665309887222 = kata1665309887222;
