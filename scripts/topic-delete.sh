#!/usr/bin/env bash
./opt/kafka_2.11-0.10.1.0/bin/kafka-topics.sh --delete --zookeeper 127.0.0.1:2181 --topic $1