// http://blog.minimum.se/2017/07/18/fluent-chained-api-asynchronous-functions-async-methods-Javascript.html
//THINK:
// - how to catch errors? ()
// - not every method might be async, how to use sync method in chain?

function someAsyncFunc(cb) {
  console.log('someAsyncFunc() called')
  setTimeout(() => cb(), 100);
}

function otherAsyncFunc(cb) {
  console.log('otherAsyncFunc() called')
  setTimeout(() => cb('otherAsyncFunc() result'), 100);
}

const someFunc = () => new Promise(resolve => someAsyncFunc(resolve))
const otherFunc = () => new Promise(resolve => otherAsyncFunc(resolve))

const MyApi = (previousActions = Promise.resolve()) => {
    console.log(previousActions) // will be forwarded in methods below
    return {
        someFunc: () => MyApi(previousActions //the old
                              .then(someFunc) //with something attached
                             ),

        otherFunc: (cb) => MyApi(previousActions
                                 .then(otherFunc)
                                 .then(res => cb(res))
                                )
    };
}

const api = MyApi();
exports.api = api;

console.log("before chain")
api
  .someFunc()
  .someFunc()
  .otherFunc(result => console.log(result))
  .someFunc()
  // .otherFunc(result => console.log(result))
console.log("after chain")
