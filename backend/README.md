# Backend

Metrics Monkey is a Node.js backend repository for the Performance Metrics Application. It collects performance metrics from the system, including CPU usage, memory utilization, disk I/O, and network traffic. The collected data is then sent to the frontend for analysis and visualization. Metrics Monkey facilitates system performance monitoring and optimization.

This is a NodeJS project, which collects various performance metrics from the system and sends it to the frontend

## Tech Stack

- Apache Kafka --- for Getting Data from Producer and Persist then use socket and Kafka consumer to sent to the frontend
- ExpressJS --- for creating the REST API
- Socket.io --- for Websocket connection

## Installation

### Requirements

1. Install OpenJDK 8 -> [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04)
2. Download Apache Kafka -> [Kafka](https://kafka.apache.org/downloads)
3. Install NodeJS -> [Nodejs.org](https://nodejs.org/en/download/package-manager/)
4. Setup Kafka -> [GeeksforGeeks](https://www.geeksforgeeks.org/how-to-install-kafka-with-zookeeper-on-ubuntu/)

### Kafka Setup

1. Start Zookeeper and Kafka Server
for More Info see 4. Setup Kafka 

2. Now You can Create a Topic. In the Application i used name ``brainless-bison`` so you can use the same name or change it in the code

## Get Started

1. Clone the Repository

```sh
git clone https:
```

2. Install the Dependencies

```sh
cd backend
npm install
```
3. Start the Server

```sh
npm start
```
!! If You re on CRON Tab wont work so you need to run the producer.js file manually when required
### Crontab Config

Note: I use cronjob to run the producer.js file every 2 minutes. that will emit the data to the Kafka topic.

1. Open the crontab config file

```sh
crontab -e
```

2. Modify the Config file Here i used to run the CRON job every 2 minutes

```sh
# Edit this file to introduce tasks to be run by cron.

# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
#
# m h  dom mon dow   command
*/2 * * * * node /home/lakshman/Desktop/vision/backend/src/producer.js
```

3. To check the Current CRON job

```sh
crontab -l
```
