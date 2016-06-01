module.exports = {
  session: {
    /* secret session key */
    key: '5882f7fb6f8ba38723332ef3780167c6d6721767bb0648ff9c8315ed852fa5994a9cf44f7dd5df830b1650f0500be11024f3e208e610b9178e37fe885db735a5',
    /* max age of the session cookie */
    max_age: 1000 * 60 * 60 * 24 * 7, // 1 week
    /* mongodb uri for session storage */
    uri: 'mongodb://localhost/app_session_storage',
    /* mongodb collection for session storage */
    collection: 'sessions'
  },
  database: {
    /* mongodb uri for the application database */
    uri: 'mongodb://localhost/security_app'
  }
}
