import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'mysql',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'love_koa_docker',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        // logging: true,
      });
      return dataSource.initialize();
    },
  },
];
