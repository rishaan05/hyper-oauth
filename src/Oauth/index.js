const express = require('express');
const getPort = require('get-port');
const open = require('open');
const assert = require('assert');

class Oauth {
  /**
   * Description
   * @param {Object} options
   * @param {String} options.domain
   * @returns {Promise<String>}
  * */
  constructor(config) {
    this.config = config;
  }

  /**
   * Description
   * @param {Object} options
   * @param {String} options.successUrl
   * @param {String} options.grantType
   * @param {Function} options.urlOpener
   * @returns {Promise<String>}
  * */
  async authorize(options) {
    const { domain } = this.config;
    assert(domain, 'domain is not configured');

    const { successUrl, grantType, urlOpener } = options || {};

    this.port = await getPort();

    const redirectURL = new URL(`http://localhost:${this.port}`);
    const OauthURL = new URL('/oauth/authorize', domain);
    OauthURL.searchParams.set('grant_type', grantType || 'license');
    OauthURL.searchParams.set('redirect_uri', redirectURL.href);

    await this.#startServer();
    const result = await new Promise((resolve) => {
      this.#registerServerRoutes({ successUrl, grantType }, resolve);
      if (urlOpener) {
        urlOpener(OauthURL.href);
      } else {
        open(OauthURL.href);
      }
    });
    await this.#stopServer();
    return result;
  }

  #registerServerRoutes({ successUrl, grantType }, resolve) {
    this.app.get('/', (req, res) => {
      const result = req.query[grantType || 'license'];
      resolve(result);
      if (successUrl) {
        return res.redirect(successUrl);
      }
      return res.send('Logged in<script>window.close();</script>');
    });
  }

  #startServer() {
    this.app = express();
    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, resolve);
    });
  }

  #stopServer() {
    return new Promise((resolve) => {
      this.server.close(resolve);
    });
  }
}

module.exports = Oauth;
