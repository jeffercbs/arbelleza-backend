import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { OrdesModule } from './ordes/ordes.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';

import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { ActivityModule } from './activity/activity.module';
import { TokenGuard } from './auth/guard/token.guard';
import { OffersModule } from './offers/offers.module';
import { ResendModule } from './resend/resend.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApiKeyGuard } from './auth/guard/api-key.guard';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl:
          process.env.POSTGRES_SSL === 'true'
            ? { rejectUnauthorized: false }
            : null,
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    PaymentsModule,
    OrdesModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    OffersModule,
    AccountsModule,
    ActivityModule,
    ResendModule,
    AuthModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
