import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpRequestService } from './http.service';
import { Rol } from '../entities/rol.entity';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    private http: HttpRequestService,
  ) {}

  async getAll() {
    return await this.rolRepository.find();
  }
}
