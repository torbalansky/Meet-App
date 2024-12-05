const config = require('../auth-server/config.json');

const getAuthUrl = () => {
  return `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${config.CLIENT_ID}
    &redirect_uri=http://localhost:3000
    &scope=https://www.googleapis.com/auth/calendar.events.public.readonly
    &response_type=token`;
};

module.exports = { getAuthUrl };