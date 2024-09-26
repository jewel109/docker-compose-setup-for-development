FROM node:20-alpine

# Install dockerize
ADD https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz /usr/local/bin/
RUN tar -C /usr/local/bin -xzvf /usr/local/bin/dockerize-linux-amd64-v0.6.1.tar.gz

# Set up application directory and permissions
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copy package files and install dependencies as the node user
COPY package*.json ./
USER node
RUN npm install --verbose

# Copy the rest of the application files and set ownership
COPY --chown=node:node . /home/node/app/

# Expose the application port
EXPOSE 3000

# Use dockerize to wait for dependencies before starting the app
CMD ["dockerize", "-wait", "tcp://db:27017", "-wait", "tcp://redis:6379","-wait","tcp://broker:9092","-wait","tcp://blog-zookeeper:2181","-wait","tcp://elasticsearch:9200","-timeout", "5s", "npm", "start"]

