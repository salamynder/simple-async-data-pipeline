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

                cl(`:: Requesting >${uri}< (from Promise)`)
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

        cl(`:: Response for >${this.uri}< arrived: `, this.res)

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
        cl("====================\n\n")
        return this
    }
}

let t = new Work(data)
    .selectSubset(0) // select `Mario` for query
    .prepareQuery()
    .doRequest() // :: Promise { t }
    .then(t => {
        t.logResult()
        t.processResult()

        // t.selectSubset(1) // select `Wario` for query
        // t.prepareQuery()
        // t.doRequest()
        //     .then(t => {
        //         t.logResult()
        //     })
        
    })
