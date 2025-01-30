import { Module } from '@nestjs/common';
import { ApiKeyService } from './services/api-key.service';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { ApiKeyGuard } from './guard/api-key.guard';
import { ApiKeyStrategy } from './strategy/api-key.strategy';
import { TokenGuard } from './guard/token.guard';

@Module({
  providers: [
    ApiKeyService,
    ApiKeyRepository,
    ApiKeyGuard,
    TokenGuard,
    ApiKeyStrategy,
  ],
})
export class AuthModule {}
