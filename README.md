# Web Server Performance Comparison

## Purpose
This codebase is created to compare the performance of web servers implemented in Node.js. The comparison includes three different setups:

1. Node.js web server
2. Node.js web server with cluster
3. Node.js web server with worker thread

The goal is to analyze and benchmark the performance differences between these implementations under varying levels of load.

## Time consumption
To check time consumption, run the below command:
```sh
$ time curl --get <endpoint>
```

## Load Test Setup
To run load tests on your machine, follow these steps:

### Prerequisites
Make sure you have the following installed on your system:
- Node.js

### Steps
1. Clone this repository to your local machine.
2. Navigate to the root directory of the repository.

#### Run NodeJs Web Server (without workers) on port No 4000
```sh
$ cd nodejs
$ node index.js
$ time curl --get http://localhost:4000/calc/
```
Calculation result: 0.44792441847937586
real    0m21.566s
user    0m0.015s
sys     0m0.000s

#### Run NodeJs Web Server (with cluster) on port No 5000
```sh
$ cd nodejs-cluster
$ node index.js
$ time curl --get http://localhost:5000/cluster/
```
Calculation result: 0.44792441847937586
real    0m20.798s
user    0m0.000s
sys     0m0.015s

#### Run NodeJs Web Server (with worker thread) on port No 6000
```sh
$ cd nodejs-cluster
$ node index.js
$ time curl --get http://localhost:6000/worker/
```

Calculation result: 0.44792441847937586
real    0m3.690s
user    0m0.031s
sys     0m0.047s

### Running Load Tests
Close all running applications and server except current, then run the following commands to run load test on each web server

Load Test on NodeJs Webserver
```sh
$ ab -n 2000 -c 50 http://127.0.0.1:4000/calc
```


Load Test on NodeJs Webserver(with cluster)
```sh
$ ab -n 2000 -c 50 http://127.0.0.1:5000/cluster
```


Load Test on NodeJs Webserver(with worker thread)
```sh
$ ab -n 2000 -c 50 http://127.0.0.1:6000/worker
```