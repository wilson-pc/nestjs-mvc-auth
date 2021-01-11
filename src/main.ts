import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config, engine } from 'express-edge';
import { join } from 'path';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';
import * as FileStore from 'session-file-store';
const sq = FileStore(session);
import { SessionInterceptor } from './session.interceptor';

const fileStoreOptions = {};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new SessionInterceptor());
  config({ cache: process.env.NODE_ENV === 'production' });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(engine);

  app.use(
    session({
      secret: 'nest cats',
      store: new sq(fileStoreOptions),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  await app.listen(3000);
}
bootstrap();
