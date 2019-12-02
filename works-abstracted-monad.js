let rp = require('request-promise')
let Promise = require('bluebird')
let Fiber = require('fibers')

let q = "https://api.github.com/search/repositories?q=tetris+klotz+language:assembly&sort=stars&order=desc"

let opts = {
    uri: q,
    headers: {
        "User-Agent": "node.js request / 00000 <test>"
    }}

let cl = (x) => console.log(x)

class T {
    constructor(data){
        this.data = data
        this.res = null
        cl(":: input data: "+ data)
    }

    selectSubset (){
        return this
    }

    prepareQuery () {
        return this
    }

    async doRequest() {

        // this.res = 
        // cl(">>> After request.")
        
        return await rp(opts)
    }


    logResult () {
        cl(":: query result: "+this.res)
        return this
    }

    processResult () {
        cl("Processing...")
        this.data++
        cl("Done!")
    }
}
//rest arguments: "...xs" then body of function has array xs of all individual args (a1, a2) passed to it 
const composeMonad = method => (...mf) => ( //mf: monadic fns
    mf.reduce((f,g) => x => g(x)[method](f))
)

// composing f after g (last fn used first)
// yields composition c 
//
// :: ~f:(a -> P b) -> ~g:(b -> P c) -> ~c(a -> P c)
const composePromise = composeMonad ('then')
const cP = composePromise
// now we need for every fn applied to datastructure `d` a then-method

let t = new T(1)
    .selectSubset()
    .prepareQuery()

// put into context: unit/return
let p1 = Promise.resolve(t)
// not needed for compose

const unit = Promise.resolve

function reqT (t) {
    // cl(">>> Before request.")
    
    // setImmediate(t.doRequest.bind(t))
    
    

    return t.doRequest().then(res => {t.res = res;cl(t.res)})
}

function postT (t) {
    cl("postTA ", t.res)
    t.logResult()
    t.data++
    cl(t.data)
    t.processResult()
    cl(t.data)
    cl("postTB ", t.res)
    return Promise.resolve(t)
}

async function workOn (t){
    const pipeline = cP(reqT, postT)
    pipeline(t)
}

workOn(t) // how to chain Ts? Also, callback has no value
