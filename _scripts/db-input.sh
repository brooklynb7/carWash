#! /bin/bash
mongo car-wash-dev --eval "db.dropDatabase()" 
mongorestore -d car-wash-dev /Users/brooklynb7/百度云同步盘/carWash/backup/car-wash-dev --drop