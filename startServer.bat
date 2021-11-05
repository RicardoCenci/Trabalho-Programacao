@echo off
cd ./Backend
start cmd /k php artisan serve --port 8001

cd ../Frontend 
start cmd /k npm start