import { MigrationInterface, QueryRunner } from 'typeorm';

export class Filials1709656839645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[filials] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_filial_id] DEFAULT NEWSEQUENTIALID(),
              [bank_id] uniqueidentifier,
              [name] nvarchar(255) NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [PK_filial_id] PRIMARY KEY ([id]),
              CONSTRAINT FK_filial_bank_id FOREIGN KEY (bank_id) REFERENCES banks(id),
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].filials`);
  }
}
