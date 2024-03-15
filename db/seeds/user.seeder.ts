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

    const roleManager = await repositoryRole.findOne({
      where: {
        code: 'manager',
      },
    });

    const commercialBossManager = await repositoryRole.findOne({
      where: {
        code: 'commercial_boss',
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
      {
        username: 'ivandariovasquezgodoy',
        code: '0423',
        names: 'Ivan Dario Vasquez Godoy',
        email: 'idvasque@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: roleManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'germanantonioalvarezwoo',
        code: '0301',
        names: 'Germán Antonio Álvarez Woo',
        email: 'galvarez@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: roleManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'olgaluciaherreranino',
        code: '0306',
        names: 'Olga Lucia Herrera Niño',
        email: 'oherrera@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: commercialBossManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'cristianfelipecardenasjimenez',
        code: '0000',
        names: 'Cristian Felipe Cardenas Jimenez',
        email: 'cfcardenasj@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: commercialBossManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'mariacatalinagonzalezmerwin',
        code: '0340',
        names: 'María Catalina González Merwin',
        email: 'mgonzalezm@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: commercialBossManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'linamarcelacanovelasco',
        code: '0320',
        names: 'Lina Marcela Cano Velasco',
        email: 'lmcano@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: commercialBossManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'marthaceciliorocagomez',
        code: '0360',
        names: 'Martha Cecilia Roca Gómez',
        email: 'mcroca@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: commercialBossManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'juandavidvallejoocampo',
        code: '0464',
        names: 'Juan David Vallejo Ocampo',
        email: 'jdvallej@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: commercialBossManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'luisfernandomontoyaarango',
        code: '0425',
        names: 'Luis Fernando Montoya Arango',
        email: 'lfmontoy@davivienda.com',
        password: await bcrypt.hash('12345678', 10),
        rol_id: commercialBossManager.id,
        is_staff: false,
        is_active: true,
        boss_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (const dat of data) {
      const user = await repository.findOne({
        where: {
          email: dat.email,
        },
      });
      if (!user) {
        await repository.insert([dat]);
      }
    }
  }
}
