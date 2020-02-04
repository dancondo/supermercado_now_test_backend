import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = this.authService.findByPayload(payload);
    if (!user) {
      return done(
        new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED),
        false
      )
    }
    return done(null, user, payload);
  }
}