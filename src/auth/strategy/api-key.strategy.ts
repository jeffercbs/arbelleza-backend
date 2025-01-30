import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ApiKeyService } from '../services/api-key.service';
import { ApiKeyEntity } from '../entities/api-key.entity';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly apiKeyService: ApiKeyService) {
    super(
      {
        header: 'Authorization',
        prefix: 'ApiKey',
      },
      false,
    );
  }

  public validate(apiKey: string): ApiKeyEntity {
    const key = this.apiKeyService.findKey(apiKey);

    console.log('key', key);
    if (!key) {
      throw new UnauthorizedException({ message: 'Invalid API key' });
    }

    return key;
  }
}
