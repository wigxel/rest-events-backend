#!/bin/bash
set -e

SERVER="rest_events_local_development"
DB="postgres"
MAIN_DB="rest_events_dv1"
PW=""

echo "Stop & Remove old docker [$SERVER] and starting new fresh instance of [$SERVER] \ "
(docker kill $SERVER || :) &&
(docker rm $SERVER || :) &&
    docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
        -e PGPASSWORD=$PW \
        -p 5432:5432 \
        -d postgres:11.5

# wait for pg to start
echo "Waiting for for pg-server [$SERVER] to start \
"
SLEEP 3

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres

echo "CREATE DATABASE $MAIN_DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres

# TODO: implement mongoose for docker
