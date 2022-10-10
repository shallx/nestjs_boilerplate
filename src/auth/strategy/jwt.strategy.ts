import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()// if we don't use injector, we cant get params in constructor
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) { // Whatever is passed to authModule is also available here
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    })
  }
}
