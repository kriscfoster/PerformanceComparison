docker build ../node-express -t kriscfoster/node-express
docker-compose -f ../kotlin-spring/docker-compose.yml down
docker-compose -f ../node-express/docker-compose.yml down
docker-compose -f ../node-express/docker-compose.yml up
