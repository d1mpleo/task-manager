import { BadRequestException, ConflictException, Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { ApplicationEntity } from './application.entity';

import { Repository } from 'typeorm';
import { AddSubordinateDto } from './dto/add-subordinate.dto';
import { CreateApplicationDto } from './dto/application.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(ApplicationEntity)
        private appRepository: Repository<ApplicationEntity>,
      ) {}

    async addSubordinate(managerId: string, addSubordinateDto: AddSubordinateDto): Promise<User> {
    const { email  } = addSubordinateDto;

    // 1. Знаходимо менеджера
    const manager = await this.userRepository.findOne({ 
      where: { id: managerId }
    });
    
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    // 2. Знаходимо підлеглого (або по email, або по ID)
    let subordinate;
    
    if (email) {
      subordinate = await this.userRepository.findOne({ 
        where: { email }
      });
    } else {
      throw new BadRequestException('Either email or subordinateId is required');
    }
    
    if (!subordinate) {
      throw new NotFoundException('User not found');
    }

    // 3. Перевіряємо, чи не додає менеджер себе
    if (manager.id === subordinate.id) {
      throw new BadRequestException('Cannot add yourself as subordinate');
    }

    // 4. Ініціалізуємо масиви, якщо вони null
    if (!manager.subordinates) {
      manager.subordinates = [];
    }
    if (!subordinate.managers) {
      subordinate.managers = [];
    }

    // 5. Перевіряємо, чи вже є такий підлеглий
    if (manager.subordinates.includes(subordinate.id)) {
      throw new ConflictException('This user is already your subordinate');
    }

    // 6. Перевіряємо, чи не є цей користувач менеджером поточного
    if (subordinate.managers.includes(manager.id)) {
      throw new BadRequestException('This user is your manager, cannot add as subordinate');
    }

    // 7. Додаємо зв'язок
    manager.subordinates.push(subordinate.id);
    subordinate.managers.push(manager.id);

    // 8. Зберігаємо обох користувачів
    await this.userRepository.save(manager);
    await this.userRepository.save(subordinate);

    return manager;
  }

  async addApplication(userId: string, createApplicationDto: CreateApplicationDto): Promise<ApplicationEntity[]> {
    const application = this.appRepository.create({
      ...createApplicationDto,
      userId,
      appliedAt: new Date(),
    });

    await this.appRepository.save(application);

    return this.getApplications(userId);
  }

  async getApplications(userId: string): Promise<ApplicationEntity[]> {
    return this.appRepository.find({
      where: { userId },
      order: { appliedAt: 'DESC' }
    });
  }

}
