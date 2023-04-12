import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'test',
      password: 'password',
      database: 'nest',
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
