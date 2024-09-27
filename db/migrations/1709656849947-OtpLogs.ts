import { MigrationInterface, QueryRunner } from 'typeorm';

export class OtpLogs1709656849947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[otp_logs] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_otp_logs_id] DEFAULT NEWSEQUENTIALID(),
              [user_id] uniqueidentifier,
              [clientname] nvarchar(250) NOT NULL,
              [phone] nvarchar(25) NOT NULL,
              [service] nvarchar(25) NOT NULL,
              [otps] nvarchar(max) NOT NULL,
              [intent] int NOT NULL,
              [status] nvarchar(25) NOT NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [PK_otp_logs_id] PRIMARY KEY ([id]),
              CONSTRAINT [FK_otp_logs_user_id] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]),
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].otp_logs`);
  }
}
