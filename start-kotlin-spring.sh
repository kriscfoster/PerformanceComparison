# build container
docker build ./kotlin-spring -t kriscfoster/kotlin-spring
# deleting stale
kubectl delete deployment,service postgres node-express kotlin-spring --ignore-not-found
# starting services
kubectl apply -f ./kubernetes/postgres-deployment.yml
kubectl apply -f ./kubernetes/postgres-service.yml
printf "waiting 10 seconds before starting app so posgres service will be available..\n"
sleep 10
kubectl apply -f ./kubernetes/kotlin-spring-deployment.yml
kubectl apply -f ./kubernetes/kotlin-spring-service.yml
