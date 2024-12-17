import passport from 'passport';
import { Strategy as OAuth2Strategy, VerifyCallback } from 'passport-oauth2';
import jwt from 'jsonwebtoken';

passport.use(
  'outlook',
  new OAuth2Strategy(
    {
      authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      clientID: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
      callbackURL: process.env.OAUTH_REDIRECT_URI || '',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) => {
      const user: Express.User = {
        id: profile.id || '',
        email: profile.emails?.[0]?.value,
        accessToken,
        refreshToken,
      };
      return done(null, user);
    }
  )
);

export const generateJwtForUser = (user: Express.User): string => {
    return jwt.sign(
      { user }, 
      process.env.JWT_SECRET || 'secure_jwt_secret',
      { expiresIn: '1h' }
    );
  };