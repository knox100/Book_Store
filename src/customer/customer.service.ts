import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPO')
    private readonly customerRepositry: Repository<Customer>,
  ) {}
}
