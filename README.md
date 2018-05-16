# react-performance-observer

> Get performance measurements from React Fiber

## Install

```sh
yarn add --dev react-performance-observer
```

## Usage

`react-performance-observer` is a small abstraction over [PerformanceObserver]
which reports only the measurements that come from React and parses information
out of the name (See [ReactDebugFiberPerf]).

```js
import { observe } from 'react-performance-observer';

observe(measurements => {
  console.log(measurements);
  // [
  //   {
  //     entryType: "measure",
  //     name: "⚛ App [mount]",
  //     componentName: "App",
  //     phase: "mount",
  //     startTime: 281,
  //     duration: 4,
  //     warning: null
  //   },
  //   ...
  // ]
});
```

Or if you want to create your own `PerformanceObserver` you can use just the
`parseEntry()` method.

```js
import { parseEntry } from 'react-performance-observer';

let observer = new window.PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    console.log(parseEntry(entry)); // parsed entry or null
  });
});
```

This code was largely based on [react-perf-devtool] by [@nitin42](https://github.com/nitin42).

[PerformanceObserver]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
[ReactDebugFiberPerf]: https://github.com/facebook/react/blob/8227e54ccf32f47e4c6bf5f30d08f84b8fed455d/packages/react-reconciler/src/ReactDebugFiberPerf.js
[react-perf-devtool]: https://github.com/nitin42/react-perf-devtool/blob/eae41fcad84749bf37aaad6491dffc7924e84955/src/shared/parseMeasures.js
