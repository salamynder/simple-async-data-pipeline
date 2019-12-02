const cl = console.log;
const data = [{
  user: 'Mario'
}, {
  user: 'Wario'
}]; // work on subset of data, also do api calls in between

class Work {
  constructor(data) {
    this.data = data;
    this.dataIndex = null;
    this.res = null;
    this.uri = '';
    cl(":: input data: \n", this.data);
  }

  selectSubset(arrayIndex) {
    this.dataIndex = arrayIndex;
    return this;
  }

  prepareQuery() {
    let user = this.data[this.dataIndex];
    this.uri = `${user.user}`;
    return this;
  }

  doRequest() {
    function get(uri) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (uri === 'Mario') resolve("It'seh meeeh, Mario!");else resolve("Evil twin detected! )=D");
        }, 1000);
      });
    }

    var _this = this;

    return Promise.resolve().then(function () {
      cl(`:: Requesting >${_this.uri}<`);
      return get(_this.uri);
    }).then(function (_resp) {
      let res = _resp;
      _this.res = res;
      cl(`:: Response for >${_this.uri}< arrived: `, _this.res);
      return _this;
    });
  }

  logResult() {
    cl(":: query result: ", this.res, "(from .logResult)");
    return this;
  }

  processResult() {
    cl(":: merging query result with data....");
    this.data[this.dataIndex] = Object.assign(this.data[this.dataIndex], {
      verdict: this.res
    });
    cl(this.data);
    cl(":: Done!");
    cl("====================\n");
    return this;
  }

} // As soon as you have/use an async method in your class, you need to
// run your code in async context via some async function:


let w = new Work(data);

function run(w) {
  // Promise.resolve + .then is needed!...
  return Promise.resolve().then(function () {
    //working on Mario
    w.selectSubset(0);
    w.prepareQuery();
    return w.doRequest();
  }).then(function () { // ... otherwise there is no method `then` at this moment
    w.logResult();
    w.processResult(); //--------------------
    // working on Wario

    w.selectSubset(1);
    w.prepareQuery();
    return w.doRequest();
  }).then(function () {
    w.logResult();
    w.processResult();
  });
}

run(w);
