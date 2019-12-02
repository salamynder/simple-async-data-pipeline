// async function logFetch(url) {
//   try {
//     const response = await fetch(url);
//     console.log(await response.text());
//   }
//   catch (err) {
//     console.log('fetch failed', err);
//   }
// }

let rp = require('request-promise')

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        console.log("Checking gen!!!!!===============")
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        debugger
        resolve(value);
    } else {
        debugger
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function logFetch(_x) {
    debugger
  return _logFetch.apply(this, arguments);
}

function _logFetch() {
  _logFetch = _asyncToGenerator(function* (url) {
    try {
      console.log("First")
      const response = yield rp(url);
      console.log(response);
      console.log("Last")
        return response
    } catch (err) {
      console.log('fetch failed', err);
    }
  });
  return _logFetch.apply(this, arguments);
}

let cnt = 1
setInterval(() => {
    console.log(cnt++)
}, 10)

logFetch("http://duckduckgo.com")
