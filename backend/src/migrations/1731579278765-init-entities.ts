import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntities1731579278765 implements MigrationInterface {
  name = 'InitEntities1731579278765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(256) NOT NULL, "role" character varying(256) NOT NULL DEFAULT 'user', "pwdHash" character varying(256) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_6620cd026ee2b231beac7cfe578" UNIQUE ("role"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("messageId" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "createdBy" character varying(256) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, CONSTRAINT "PK_b664c8ae63d634326ce5896cecc" PRIMARY KEY ("messageId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
