import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCredentialsLog1709649399650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[users_credential_log] (
              [id] INT PRIMARY KEY IDENTITY(1,1),
              [user_id] uniqueidentifier,
              [password] nvarchar(255) NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT FK_credential_log_id FOREIGN KEY (user_id) REFERENCES users(id)
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].users_credential_log`);
  }
}
