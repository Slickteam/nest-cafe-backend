#/bin/sh

docker run -it --rm --name nodedev-back \
-p 127.0.0.1:3000:3000 \
-v ${PWD}:/app \
-w /app \
-u $(id -u):$(id -g) \
node:18.15.0 /bin/sh
