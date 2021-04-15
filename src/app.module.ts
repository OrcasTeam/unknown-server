import * as config from 'config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user.module/user.module';
import { CommonModule } from './common.module/common.module';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video.module/video.module';

const dbConfig = config.get('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type || 'mongodb',
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/**/*/entity/*.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    CommonModule,
    UserModule,
    VideoModule,
  ],
})
export class AppModule {}
