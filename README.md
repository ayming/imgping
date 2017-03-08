# Image Ping

Ping utility for testing the reachability of a host by image link. It is not reliable to test a host by domain because:
* `net::ERR_NAME_NOT_RESOLVED` is uncatchable
* domain fail does not mean assets under that domain are fail
* cross origin issue limits the ping methods

## Requirements
* node `^6.2.0`
* yarn `^0.21.0`

## Getting Started

```bash
yarn install
```

## Setting

### timeout (default=3000)

Maximum time (ms) to wait for a image to response

```js
ping.timeout = 1000

// es6
import ping from 'imgping'
ping.timeout = 1000
```

## API

Please choose image by the following condition:
* as small as possible
* valid image source
* same image to `race`

### img(src)

Get response time (ms) for a single image

```js
ping.img('http://my.image/link.jpg')
.then(function(result) {
  // success
  console.log(result);
  /**
   * {
   *   hash: ''
   *   host: 'my.image'
   *   hostname: 'my.image'
   *   imageSrc: 'http://my.image/link.jpg'
   *   pathname: '/link.jpg'
   *   port: ''
   *   protocol: 'http:'
   *   responseTime: 100
   * }
   */
})
.catch(function(result) {
  // failure
  console.log(result);
  /**
   * {
   *   hash: ''
   *   host: 'my.image'
   *   hostname: 'my.image'
   *   imageSrc: 'http://my.image/link.jpg'
   *   pathname: '/link.jpg'
   *   port: ''
   *   protocol: 'http:'
   *   responseTime: 3000
   * }
   */
});

// es6
import ping from 'imgping'
ping.img('http://my.image/link.jpg')
.then((result) => {
  // success
  console.log(result)
  /**
   * {
   *   hash: ''
   *   host: 'my.image'
   *   hostname: 'my.image'
   *   imageSrc: 'http://my.image/link.jpg'
   *   pathname: '/link.jpg'
   *   port: ''
   *   protocol: 'http:'
   *   responseTime: 100
   * }
   */
})
.catch((result) => {
  // failure
  console.log(result)
  /**
   * {
   *   hash: ''
   *   host: 'my.image'
   *   hostname: 'my.image'
   *   imageSrc: 'http://my.image/link.jpg'
   *   pathname: '/link.jpg'
   *   port: ''
   *   protocol: 'http:'
   *   responseTime: 3000
   * }
   */
})
```

### imgs(list)

Get response time (ms) for a batch of images

```js
ping.imgs(['http://my.image.a/link.jpg', 'http://my.image.b/link.jpg'])
.then(function(result) {
  // list of response time
  console.log(result);
  /**
   * [
   *   {
   *     hash: ''
   *     host: 'my.image.a'
   *     hostname: 'my.image.a'
   *     imageSrc: 'http://my.image.a/link.jpg'
   *     pathname: '/link.jpg'
   *     port: ''
   *     protocol: 'http:'
   *     responseTime: 100
   *     success: true
   *   },
   *   ...
   * ]
   */
});

// es6
import ping from 'imgping'
ping.imgs(['http://my.image.a/link.jpg', 'http://my.image.b/link.jpg'])
.then((result) => {
  // list of response time
  console.log(result)
  /**
   * [
   *   {
   *     hash: ''
   *     host: 'my.image.a'
   *     hostname: 'my.image.a'
   *     imageSrc: 'http://my.image.a/link.jpg'
   *     pathname: '/link.jpg'
   *     port: ''
   *     protocol: 'http:'
   *     responseTime: 100
   *     success: true
   *   },
   *   ...
   * ]
   */
})
```

### race(list)

Resolve as soon as one of the images is loaded

```js
ping.race(['http://my.image.a/link.jpg', 'http://my.image.b/link.jpg'])
.then(function(result) {
  // fastest image result
  console.log(result);
  /**
   * {
   *   hash: ''
   *   host: 'my.image.a'
   *   hostname: 'my.image.a'
   *   imageSrc: 'http://my.image.a/link.jpg'
   *   pathname: '/link.jpg'
   *   port: ''
   *   protocol: 'http:'
   *   responseTime: 100
   *   success: true
   * }
   */
})
.catch(function(result) {
  // list of response time if no image is loaded
  console.log(result);
  /**
   * [
   *   {
   *     hash: ''
   *     host: 'my.image.a'
   *     hostname: 'my.image.a'
   *     imageSrc: 'http://my.image.a/link.jpg'
   *     pathname: '/link.jpg'
   *     port: ''
   *     protocol: 'http:'
   *     responseTime: 3000
   *     success: false
   *   },
   *   ...
   * ]
   */
});

// es6
import ping from 'imgping'
ping.race(['http://my.image.a/link.jpg', 'http://my.image.b/link.jpg'])
.then((result) => {
  // response time
  console.log(result)
  /**
   * {
   *   hash: ''
   *   host: 'my.image.a'
   *   hostname: 'my.image.a'
   *   imageSrc: 'http://my.image.a/link.jpg'
   *   pathname: '/link.jpg'
   *   port: ''
   *   protocol: 'http:'
   *   responseTime: 100
   *   success: true
   * }
   */
})
.catch((result) => {
  // list of response time if no image is loaded
  console.log(result)
  /**
   * [
   *   {
   *     hash: ''
   *     host: 'my.image.a'
   *     hostname: 'my.image.a'
   *     imageSrc: 'http://my.image.a/link.jpg'
   *     pathname: '/link.jpg'
   *     port: ''
   *     protocol: 'http:'
   *     responseTime: 3000
   *     success: false
   *   },
   *   ...
   * ]
   */
})
```

## Development

```bash
yarn start
```

## Build

```bash
npm run build
```

## Changelog

1.1.0
-----

### Improvements
* update api response

1.0.1
-----

### Fixes
* update build config

1.0.0
-----

### Features
* init
