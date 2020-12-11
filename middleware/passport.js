const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStrategy = new Strategy(option, async (payload, done) => {
  try {
    const targetUser = await db.User.findOne({ where: { id: payload.id } });
    if (targetUser) {
      if (new Date(payload.created_at) < targetUser.updated_at) {
        done(null, false);
      } else {
        done(null, targetUser);
      }
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

passport.use('jwt', jwtStrategy);
