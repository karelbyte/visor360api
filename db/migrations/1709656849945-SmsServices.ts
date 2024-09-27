import { MigrationInterface, QueryRunner } from 'typeorm';

export class SmsServices1709656849945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[sms_services] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_sms_services_id] DEFAULT NEWSEQUENTIALID(),
              [national] int NULL,
              [international] int NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].sms_services`);
  }
}
