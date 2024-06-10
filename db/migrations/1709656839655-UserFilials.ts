import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserFilials1709656839655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[user_filials] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_user_filial_id] DEFAULT NEWSEQUENTIALID(),
              [user_id] uniqueidentifier,
              [filial_id] uniqueidentifier,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [PK_user_filials_id] PRIMARY KEY ([id]),
              CONSTRAINT FK_user_filial_bank_id FOREIGN KEY (filial_id) REFERENCES filials(id),
              CONSTRAINT FK_user_filial_user_id FOREIGN KEY (user_id) REFERENCES users(id),
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].user_filials`);
  }
}
