import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Rol } from '../../src/entities/rol.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const repositoryRole = dataSource.getRepository(Rol);

    const roleAdmin = await repositoryRole.findOne({
      where: {
        code: 'admin',
      },
    });

    const adminEmail = 'admin@super.com';
    const data = [
      {
        username: 'admin',
        code: 'admin',
        names: 'Administrador',
        email: adminEmail,
        password: await bcrypt.hash('123456', 10),
        rol_id: roleAdmin.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const user = await repository.findOne({
      where: {
        email: adminEmail,
      },
    });

    if (!user) {
      await repository.insert(data);
    }
  }
}
