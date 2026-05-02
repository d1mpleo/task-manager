import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
<<<<<<< HEAD
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true
}),
=======
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
>>>>>>> af03cc6e413d0fc0357833a151335408c0be9cc0
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
