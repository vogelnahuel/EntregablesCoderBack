const cluster = require('cluster')
const express = require('express')
const numCPUs = require('os').cpus().length

const PORT = process.argv[2] || 8080
const MODE = process.argv[3] || 'CLUSTER'
const app = express()

if(MODE && MODE == 'CLUSTER' && cluster.isMaster) {

    console.log(`Master ${process.pid} is running on ${PORT}`) 

    for(let i=0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died :(`)
    })

} else {

    app.get('/api/randoms', (req, res) => {
        console.log(`Get Randoms +++++++ [${process.pid}] (${new Date().toLocaleString()})`)
        res.send('RANDOM !!')
    })

    app.get('/api/setting', (req, res) => {
        console.log(`Setting ======= [${process.pid}] (${new Date().toLocaleString()})`)
        res.send('The Settings !!')
    })

    app.listen(PORT, err => {
        console.log(`Listening ${PORT} [${MODE}]...`)
    })

    console.log('Worker ' + process.pid + ' stared')
}