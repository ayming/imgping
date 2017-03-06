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

Image responses waiting time (millisecond)

```js
ping.timeout = 1000

// es6
import ping from 'imgping'
ping.timeout = 1000
```

## API

### img(src)

Get a single image response time

```js
ping.img('http://my.image/link.jpg')
.then(function(responseTime) {
  // success response time
  console.log(responseTime) // 100
})
.catch(function(responseTime) {
  // failure response time
  console.log(responseTime) // 3000
});

// es6
import ping from 'imgping'
ping.img('http://my.image/link.jpg')
.then((responseTime) => {
  // success response time
  console.log(responseTime) // 100
})
.catch((responseTime) => {
  // failure response time
  console.log(responseTime) // 3000
})
```

### imgs(list)

Get a batch of images response time

```js
ping.imgs(['http://my.image/link1.jpg', 'http://my.image/link2.jpg'])
.then(function(result) {
  // list of response time
  console.log(result);
  /**
   * [
   *   {
   *     imageSrc: 'http://my.image/link1.jpg'
   *     responseTime: 100
   *     success: true
   *   },
   *   ...
   * ]
   */
});

// es6
import ping from 'imgping'
ping.imgs(['http://my.image/link1.jpg', 'http://my.image/link2.jpg'])
.then((result) => {
  // list of response time
  console.log(result)
  /**
   * [
   *   {
   *     imageSrc: 'http://my.image/link1.jpg'
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
ping.race(['http://my.image/link1.jpg', 'http://my.image/link2.jpg'])
.then(function(result) {
  // fastest image result
  console.log(result);
  /**
   * {
   *   imageSrc: 'http://my.image/link1.jpg'
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
   *     imageSrc: 'http://my.image/link1.jpg'
   *     responseTime: 3000
   *     success: false
   *   },
   *   ...
   * ]
   */
});

// es6
import ping from 'imgping'
ping.race(['http://my.image/link1.jpg', 'http://my.image/link2.jpg'])
.then((result) => {
  // response time
  console.log(result)
  /**
   * {
   *   imageSrc: 'http://my.image/link1.jpg'
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
   *     imageSrc: 'http://my.image/link1.jpg'
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

1.0.0
-----

### Features
* init
