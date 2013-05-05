module.exports = {

  /**
   * Database
   */

  SQLITE: true,

  /**
   * Facebook Auth
   */

  FACEBOOK_APP_ID: '0987654321',
  FACEBOOK_APP_SECRET: 'abcdefghijklmnopqrstuv0987654321',
  FACEBOOK_CALLBACK_URL: 'http://localhost:3000/auth/facebook/callback',

  /**
   * Twitter Auth
   */

  TWITTER_CONSUMER_KEY: 'a0b1c2d3e4f5',
  TWITTER_CONSUMER_SECRET: 'abcdefghijklmnopqrstuv0987654321',
  TWITTER_CALLBACK_URL: 'http://localhost:3000/auth/twitter/callback',

  /**
   * Global View Locals
   */

  LOCALS_SITE_NAME: 'Polly',

  /**
   * Express Config
   */

  EXPRESS_SESSION_SECRET: 'keyboard cat'

};