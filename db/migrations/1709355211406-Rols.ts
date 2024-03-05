import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rols1709355211406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[rols] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_rols_id] DEFAULT NEWSEQUENTIALID(),
              [description] nvarchar(255) NOT NULL,
              [code] nvarchar(255) NOT NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [UQ_rols_code] UNIQUE ([code]),
              CONSTRAINT [PK_rols_id] PRIMARY KEY ([id]),
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].rols`);
  }
}
