const cl = console.log

const data = [
    {
        user: 'Mario'
    },
    {
        user: 'Wario'
    }
]

// work on subset of data, also do api calls in between

class Work {

    constructor(data){

        this.data = data
        this.dataIndex = null
        this.res = null
        this.uri = ''

        cl(":: input data: \n", this.data)
    }

    selectSubset (arrayIndex){

        this.dataIndex = arrayIndex
        return this
    }

    prepareQuery () {

        let user = this.data[this.dataIndex]
        this.uri = `${user.user}`
        return this
    }

    async doRequest() {

        function get(uri){
            return new Promise((resolve,reject) => {

                setTimeout(() => {
                    if (uri==='Mario')
                        resolve("It'seh meeeh, Mario!")
                    else 
                        resolve("Evil twin detected! )=D")

                }, 1000)
            })
        }

        cl(`:: Requesting >${this.uri}<`)

        let res = await get(this.uri)
        this.res = res

        cl(`:: Response for >${this.uri}< arrived: `, this.res, ' (from doRequest() )')

        return this
    }

    async doR (){

        await this.doRequest()
        return this
    }


    logResult () {
        cl(":: query result: ", this.res, "(from .logResult)")
        return this
    }

    processResult () {
        cl(":: merging query result with data....")
        this.data[this.dataIndex] = Object.assign(this.data[this.dataIndex], {verdict: this.res} )
        cl(this.data)
        cl(":: Done!")
        cl("====================\n")
        return this
    }
}

// As soon as you have/use an async method in your class, you need to
// run your code in async context via some async function:
let w = new Work (data)
async function run (w){


    //working on Mario

    w.selectSubset(0)
    w.prepareQuery()

    w.doRequest()
    // await w.doR() //still must be awaited for, needs `await`!!!!

    w.logResult() 
    w.processResult()

    //--------------------

    // working on Wario

    // w.selectSubset(1)
    // w.prepareQuery()

    // await w.doRequest()

    // w.logResult()
    // w.processResult()

}

let cnt = 1
let i = setInterval(() => {
    if(cnt === 15)
        clearInterval(i)
    console.log("++ working on counter :",cnt++)
}, 100)


run(w)
