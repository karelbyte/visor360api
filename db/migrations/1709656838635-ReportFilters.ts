import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReportFilters1709656838635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[report_filters] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_report_filters_id] DEFAULT NEWSEQUENTIALID(),
              [report_id] uniqueidentifier,
              [name] nvarchar(255) NULL,
              [field_name] nvarchar(255) NULL,
              [type] nvarchar(255) NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [PK_report_filters_id] PRIMARY KEY ([id]),
              CONSTRAINT FK_report_filters_report_id FOREIGN KEY (report_id) REFERENCES reports(id),
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].report_filters`);
  }
}
