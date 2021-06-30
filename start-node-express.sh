# build container
docker build ./node-express -t kriscfoster/node-express
# deleting stale
kubectl delete deployment,service postgres node-express kotlin-spring --ignore-not-found
# starting services
kubectl apply -f ./kubernetes/postgres-deployment.yml
kubectl apply -f ./kubernetes/postgres-service.yml
printf "waiting 10 seconds before starting app so posgres service will be available..\n"
sleep 10
kubectl apply -f ./kubernetes/node-express-deployment.yml
kubectl apply -f ./kubernetes/node-express-service.yml
