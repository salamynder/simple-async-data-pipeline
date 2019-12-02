let rp = require('request-promise')
let Promise = require('bluebird')

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

    async doRequest() {

        this.res = await rp(opts)
        
        return this
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


function work (data){
    new T(data)
    .selectSubset()
    .doRequest()
    .then(t => {
        t.logResult()
        t.processResult()
        work(t.data)
    })
}

work(1)
