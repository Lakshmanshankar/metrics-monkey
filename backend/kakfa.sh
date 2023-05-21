 # File for Starting zookeeper and Kafka
 # Replace the path with your own path
cd /home/lakshman/Projects/kakfa/kafka_2.12-3.3.2/bin/

# for starting zookeeper and kafka
# start zookeeper first
./zookeeper-server-start.sh ../config/zookeeper.properties 
./kafka-server-start.sh ../config/server.properties

# Create a new topic you can also create this using Js see the file in backend/kafka/kafka.js
./kafka-topics.sh --bootstrap-server localhost:9092 --topic vision-api --create --partitions 2 --replication-factor 1
./kafka-topics.sh --bootstrap-server localhost:9092 --topic vision-api --describe

# for listing all the topics
./kafka-topics.sh --list --bootstrap-server localhost:9092