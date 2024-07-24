import { MigrationInterface, QueryRunner } from 'typeorm';

export class Logs1709656839645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[logs] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_logs_id] DEFAULT NEWSEQUENTIALID(),
              [user_id] uniqueidentifier,
              [action] nvarchar(255) NOT NULL,
              [url] nvarchar(max) NULL,
              [payload] nvarchar(max) NULL,
              [response] nvarchar(max) NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].logs`);
  }
}
