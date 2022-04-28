const Config = require('./Config');
const Oauth = require('./Oauth');

class Hyper {
  /**
   * Description
   * @param {Object} options
   * @param {String} options.domain
   * @param {String} options.publishableKey
   * @param {String} options.secretKey
   * @returns {Promise<String>}
  * */
  constructor({ domain, publishableKey, secretKey }) {
    this.config = new Config({ domain, publishableKey, secretKey });
    this.oauth = new Oauth(this.config);
  }
}

module.exports = Hyper;
