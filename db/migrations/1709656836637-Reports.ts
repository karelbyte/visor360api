import { MigrationInterface, QueryRunner } from 'typeorm';

export class Reports1709656836637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[reports] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_reports_id] DEFAULT NEWSEQUENTIALID(),
              [name] nvarchar(255) NULL,
              [url] nvarchar(255) NULL,
              [is_active] bit NOT NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [PK_reports_id] PRIMARY KEY ([id])
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].reports`);
  }
}
