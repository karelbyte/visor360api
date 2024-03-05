import { MigrationInterface, QueryRunner } from 'typeorm';

export class Subordinate1709656836536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE [dbo].[subordinates] (
              [id] INT PRIMARY KEY IDENTITY(1,1),
              [user_id] uniqueidentifier,
              [boss_id] uniqueidentifier,
              [created_at] datetime2(6) NOT NULL,
              [updated_at] datetime2(6) NOT NULL,
              CONSTRAINT FK_subordinate_boss FOREIGN KEY (boss_id) REFERENCES users(id),
              CONSTRAINT FK_subordinate_id FOREIGN KEY (subordinate_id) REFERENCES users(id)
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE [dbo].subordinates`);
  }
}
