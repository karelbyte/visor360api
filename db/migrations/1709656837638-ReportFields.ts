import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReportFields1709656837638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[report_fields] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_report_fields_id] DEFAULT NEWSEQUENTIALID(),
              [report_id] uniqueidentifier,
              [name] nvarchar(255) NULL,
              [field_name] nvarchar(255) NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [PK_report_fields_id] PRIMARY KEY ([id]),
              CONSTRAINT FK_report_fields_report_id FOREIGN KEY (report_id) REFERENCES reports(id),
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].report_fields`);
  }
}
