import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './configuration/account/account.module';
import { PrisonModule } from './configuration/prison/prison.module';
import { ProfileModule } from './configuration/profile/profile.module';
import { MailModule } from './notification/mail/mail.module';
import { ApplicationModule } from './adopt/application/application.module';
import { ChildModule } from './adopt/child/child.module';
import { ItemModule } from './donationModule/item/item.module';
import { RequisitionModule } from './donationModule/requisition/requisition.module';
import { DonationModule } from './donationModule/donation/donation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      }),
    }),

    AccountModule,
    PrisonModule,
    ProfileModule,
    MailModule,
    ChildModule,
    ApplicationModule,
    ItemModule,
    RequisitionModule,
    DonationModule,
  ],
  providers: [],
})
export class AppModule {}
