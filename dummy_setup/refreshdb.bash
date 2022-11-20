

#https://stackoverflow.com/questions/18389124/simulate-create-database-if-not-exists-for-postgresql
echo "SELECT 'CREATE DATABASE test' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test')\gexec" | psql
psql -d postgres postgres -a -f ./db/removedb.sql
psql -d postgres postgres -a -f ./db/init.sql