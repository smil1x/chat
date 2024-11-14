import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../core/entity';

export class AddAdminUser1731579398065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = 'admin';
    const hashedPassword = UserEntity.getPwdHash(password);

    await queryRunner.query(
      `INSERT INTO "user" ("userId", "username", "role", "pwdHash") VALUES (uuid_generate_v4(), 'admin', 'admin', $1)`,
      [hashedPassword],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE "username" = 'admin'`);
  }
}
