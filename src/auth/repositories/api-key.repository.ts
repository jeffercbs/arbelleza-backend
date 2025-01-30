import { Injectable } from '@nestjs/common';
import { ApiKeyEntity } from '../entities/api-key.entity';

@Injectable()
export class ApiKeyRepository {
  private keys: ApiKeyEntity[] = [
    {
      name: 'ar',
      key: 'fd94096ebf2f29fdcc8f49fa2fbcfb457dd1882f8dedee5cd70fb2b0811476cc',
    },
  ];

  public findOne(key: string): ApiKeyEntity {
    return this.keys.find((k) => k.key == key.trim());
  }
}
