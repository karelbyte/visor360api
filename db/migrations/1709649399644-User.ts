import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1709649399644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[users] (
              [id] uniqueidentifier NOT NULL CONSTRAINT [DF_users_id] DEFAULT NEWSEQUENTIALID(),
              [username] nvarchar(255) NOT NULL,
              [code] nvarchar(255) NULL,
              [names] nvarchar(255) NOT NULL,
              [email] nvarchar(255) NOT NULL,
              [password] nvarchar(255) NULL,
              [rol_id] uniqueidentifier NULL,
              [is_staff] bit NOT NULL,
              [is_active] bit NOT NULL,
              [boss_id] uniqueidentifier NULL,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT [UQ_users_email] UNIQUE ([email]),
              CONSTRAINT [PK_users_id] PRIMARY KEY ([id]),
              CONSTRAINT [FK_users_boss_id] FOREIGN KEY ([boss_id]) REFERENCES [dbo].[users]([id]),
              CONSTRAINT [FK_users_role_id] FOREIGN KEY ([role_id]) REFERENCES [dbo].[rols]([id])
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].users`);
  }
}
