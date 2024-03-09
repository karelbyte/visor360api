import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import RoleSeeder from './seeds/role.seeder';
import UserSeeder from './seeds/user.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [RoleSeeder, UserSeeder],
      factories: [],
    });
  }
}
