import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bank1709656839635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[banks] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_bank_id] DEFAULT NEWSEQUENTIALID(),
              [name] nvarchar(255) NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [PK_bank_id] PRIMARY KEY ([id]),
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].banks`);
  }
}
