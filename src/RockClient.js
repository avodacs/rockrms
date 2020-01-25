const axios = require('axios');
const debug = require('debug')('RockClient:index');

class RockClient {
  constructor(config) {
    let { username, password, url } = config;

    this.username = username;
    this.password = password;
    this.url = url;
  }

  async authenticate() {
    debug(`Authenticating`);

    return new Promise(async (resolve, reject) => {
      try {
        let result = await axios({
          method: 'post',
          url: `${this.url}/api/Auth/Login`,
          data: {
            Username: this.username,
            Password: this.password,
            Persisted: true,
          },
        });

        if (result.status === 204) {
          this.cookie = result.headers['set-cookie'][0];

          return resolve();
        }

        reject();
      } catch (err) {
        reject(err);
      }
    });
  }

  async request(config) {
    debug(`Making API request`);

    return new Promise(async (resolve, reject) => {
      let fullUrl = `${this.url}/${config.path}`;

      debug(`Full URL is ${fullUrl}`);

      try {
        let result = await axios({
          method: config.method,
          url: `${this.url}/${config.path}`,
          headers: {
            Cookie: this.cookie,
          },
          params: config.params,
          data: config.data,
        });

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = RockClient;
