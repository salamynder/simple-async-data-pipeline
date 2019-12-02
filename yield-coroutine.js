let rp = require('request-promise')
let Promise = require('bluebird')

let q = "https://api.github.com/search/repositories?q=tetris+klotz+language:assembly&sort=stars&order=desc"

let opts = {uri: q,
            headers: {
                "User-Agent": "node.js request / 00000 <test>"
            }}

let cl = (x) => console.log(x)

class T {
    constructor(){
        this.res = null
    }

    async find() {


        // async function f   ( ) {let res = await rp(opts); this.res = res}
        // async function runf( ) {return await f()}
        //this.fa()
        // setTimeout(() => {
        //     console.log(this)
        // }, 2000)
        this.res = await rp(opts)
        
        // this.res = runf()
        // console.log(this.res)
        return this
    }


    getRes(){
        console.log(":: (from getRes) "+this.res)
        return this.res
    }
}

T.prototype.init = Promise.coroutine(function* () {
    let res = yield rp(opts);
    // let res = yield Promise.delay(1000).then(()=>"hello")
    cl(":: (from init) "+res)
    // while (true) {
    
    //     // if (res instanceof Promise)
    // }
    this.res = res
})

T.prototype.i = Promise.coroutine(function* (){
    yield this.init()
})

Promise.coroutine( function* () {
    let t = new T()
    yield t.init()
    t.getRes()
})()

// does not work, must be specified at call site: the yielding
// let t = new T()
// t.i()
// t.getRes()
