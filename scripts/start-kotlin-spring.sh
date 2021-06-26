docker build ../kotlin-spring -t kriscfoster/kotlin-spring
docker-compose -f ../node-express/docker-compose.yml down
docker-compose -f ../kotlin-spring/docker-compose.yml down
docker-compose -f ../kotlin-spring/docker-compose.yml up
