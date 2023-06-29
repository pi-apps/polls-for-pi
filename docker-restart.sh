cd /home/ubuntu/polls-for-pi 
sudo docker-compose restart 2>&1 | tee docker-restart.log | awk '{ print strftime("%Y-%m-%d %H:%M:%S"), $0; fflush(); }'
