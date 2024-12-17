import express from 'express';
import passport from 'passport';
import { generateJwtForUser } from '../../src/oauth/outlookAuth';

const router = express.Router();

// Redirect to Outlook login
router.get('/login', passport.authenticate('outlook', { scope: ['openid', 'email', 'profile'], session: false }));

// Handle callback from Outlook OAuth
router.get(
  '/callback',
  passport.authenticate('outlook', { failureRedirect: '/auth/login', session: false }),
  (req, res): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: No user data returned' });
      return;
    }

    const jwtToken = generateJwtForUser(req.user as Express.User);
    res.json({ token: jwtToken });
  }
);

export default router;
