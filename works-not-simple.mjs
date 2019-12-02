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

        cl(`:: Requesting >${this.uri}<`) // will log two times >Wario<

        let res = await get(this.uri)
        this.res = res

        cl(`:: Response for >${this.uri}< arrived: `, this.res)
        // When the second promise settles, `this.uri` will already be
        // assigned to >Wario<, so this will never log >Mario<.

        return; // returning an empty promise; request response will be
                // handled via instance methods
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

//working on Mario

let w = new Work (data)

w.selectSubset(0)
w.prepareQuery()

w.doRequest() // returns Promise, which -- one might think -- is already awaited for

w.logResult()
w.processResult()


//working on Wario

// w.selectSubset(1)
// w.prepareQuery()

// w.doRequest()

// w.logResult()
// w.processResult()
