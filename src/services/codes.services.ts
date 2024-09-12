import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subordinate } from 'src/entities/subordinate.entity';
import { User } from 'src/entities/user.entity';
@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(Subordinate)
    private subordinateRepository: Repository<Subordinate>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getSubordinateByTerm = (
    bossId: string,
    mapper: (a: any) => any,
    data: Subordinate[],
  ) => {
    const subordinateIds = [];
    function getSubordinatesRecursively(bossId: string) {
      const directSubordinates = data
        .filter((subordinate) => subordinate.boss_id === bossId)
        .map((subordinate) => subordinate.user_id);
      subordinateIds.push(...directSubordinates);
      for (const subordinateId of directSubordinates) {
        getSubordinatesRecursively(subordinateId);
      }
    }
    getSubordinatesRecursively(bossId);
    const subordinates = data.filter((subordinate) =>
      subordinateIds.includes(subordinate.user_id),
    );
    return subordinates.map(mapper);
  };

  async getSubordinatesByBossOnlyCodes(boss_id: string): Promise<string[]> {
    const allData = await this.subordinateRepository.find({
      relations: {
        user: true,
      },
    });
    const payload = this.getSubordinateByTerm(
      boss_id,
      (subordinate) => subordinate.user.code,
      allData,
    );
    return [...new Set(payload)];
  }

  async findOneById(userId: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        filial: true,
        bank: true,
        rol: true,
        leaders: {
          boss: {
            rol: true,
            leaders: {
              boss: true,
            },
          },
        },
      },
    });
  }
  async getCodes(ids: string[]): Promise<string[]> {
    let codes: string[] = [];
    for (const clientId of ids) {
      const user = await this.findOneById(clientId);
      if (!user.rol || (user.rol && user.rol.code === 'commercial')) {
        codes.push(user.code);
      } else {
        const subordinatesCodes = await this.getSubordinatesByBossOnlyCodes(
          user.id,
        );
        codes = codes.concat(subordinatesCodes);
      }
    }
    return codes;
  }
}
