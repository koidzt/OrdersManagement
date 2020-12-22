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
    // console.log(targetUser, payload);
    if (targetUser) {
      // console.log(
      //   new Date(payload.created_at),
      //   typeof new Date(payload.created_at),
      //   targetUser.updated_at,
      //   typeof targetUser.updated_at
      // );

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
