let rp = require('request-promise')

let q = "https://api.github.com/search/repositories?q=tetris+klotz+language:assembly&sort=stars&order=desc"

let opts = {uri: q,
            headers: {
                "User-Agent": "node.js request / 00000 <test>"
            }}

let cl = (x) => console.log(x)

async function f   ( ) {
    const xx = await rp(opts)
    return xx
}

async function runf( ) {
    const yy = await f()
    return yy
}

async function runf2( ) {
    const yy = await f()
    cl("print from inner runf2: "+yy)
    return yy
}

// const x = runf() // will always yield <pending>
// cl("x: "+x)

// runf2() //but runf2 will print yy : so logic in the calling async function...

class T {
    constructor(){
        this.res = null
    }

    find() {


        let self = this
        // async function f   ( ) {let res = await rp(opts); this.res = res}
        // async function runf( ) {return await f()}
        this.fa()
        // setTimeout(() => {
        //     console.log(this)
        // }, 2000)
        
        // this.res = runf()
        // console.log(this.res)
        return this
    }

    async fa ( ) {
        let res = await rp(opts);
        cl("::"+res)
        // while (true) {

        //     // if (res instanceof Promise)
        // }

        this.res = res
    }

    getRes(){
        console.log(":: a bit later: "+this.res)
        return this.res
    }
}

let t = new T()
t.find()
    .getRes()




async function firstAsync() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 1000)
    });

    // wait until the promise returns us a value
    let result = await promise; 
  
    // "Now it's done!"
    console.log(result); 
}

// firstAsync();





const delay = (duration) =>
  new Promise(resolve => setTimeout(resolve, duration))

async function asyncWithAwait(prefix) {
  console.log(prefix + ' before await')
  await delay(1000)
  console.log(prefix + ' after await')
}

function asyncWithPromise(prefix) {
  console.log(prefix + ' before promise')
  return delay(1000)
  .then(_ => console.log(prefix + ' after promise'))
}

async function run() {
  let prefix = '(1)'
  console.log(prefix + ' with await')
  asyncWithAwait(prefix)
  console.log('---------------------')

  console.log(prefix + ' with promise')
  asyncWithPromise(prefix)
  console.log('---------------------')

  console.log(prefix + ' after all')
    //hiernach kommen noch die logs von async sowie promise
}

// run()

async function run() {
  let prefix = '(2)'
  console.log(prefix + ' with await')
    // await when calling the async func: up to the caller of async func whether it blocks/not blocks, here it blocks with `await`
  await asyncWithAwait(prefix)
  console.log(prefix + ' with promise')
  asyncWithPromise(prefix).then(_ => console.log(prefix + ' after all'))
}

// run()
