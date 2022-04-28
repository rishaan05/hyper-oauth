# Unofficial SDK for [Hyper](https://hyper.co)

You can view official api documentation [here](https://docs.hyper.co/)

> ⚠️ This sdk is still being developed. Do not use in production in and expect breaking changes between versions.

Currently only oauth functionality is built. 

# Features 

## Hyper

### Usage
```javascript
const Hyper = require('@yummy05/hyper-oauth');
const hyper = new Hyper({
  domain: 'https://yummyfnf.hyper.co',
  publishableKey: 'pk_...',
  secretKey: 'sk_...',
});
```

### Parameters
- domain - your dashboards domain
- publishableKey - your dashboards publishable api key
- secretKey - your dashboards secret api key

## hyper.oauth.authorize

### Usage
```javascript
const Hyper = require('@yummy05/hyper-oauth');
const hyper = new Hyper({ domain: "https://yummyfnf.hyper.co"});

const result = await hyper.oauth.authorize();
```

### Parameters
- successUrl - Optional redirect url after logging in
- urlOpener - Optional custom function to handle opening url (uses [open](https://www.npmjs.com/package/open) by default)
- grantType - Available options: user, license (defaults to license)