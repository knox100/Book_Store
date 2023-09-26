import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { Customer } from './customer.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'CUSTOMER_REPO',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Customer),
      inject: ['DATA_SOURCE'],
    },
    CustomerService,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
