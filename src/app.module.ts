import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakConnectModule, ResourceGuard, RoleGuard, AuthGuard, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
