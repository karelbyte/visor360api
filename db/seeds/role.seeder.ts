import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Rol } from '../../src/entities/rol.entity';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Rol);

    const data = [
      {
        description: 'Administrador',
        code: 'admin',
      },
      {
        description: 'Gerente',
        code: 'manager',
      },
      {
        description: 'Jefe comercial',
        code: 'commercial_boss',
      },
      {
        description: 'Patrocinador',
        code: 'sponsors',
      },
      {
        description: 'Comercial',
        code: 'commercial',
      },
      {
        description: 'Usuario OTP',
        code: 'user_otp',
      },
      {
        description: 'Admin OTP',
        code: 'admin_otp',
      },
    ];

    for (const dat of data) {
      const rol = await repository.findOne({
        where: {
          code: dat.code,
        },
      });
      if (!rol) {
        await repository.insert([dat]);
      }
    }
  }
}
