#!/bin/bash

# Change to the parent directory containing the "client" and "server" directories
cd "$(2023-MoViagem "$0")"

# Start the client and server processes in the background
npm run start:dev --prefix ./client &    # Start the client in the "client" directory
npm run start:dev --prefix ./server &    # Start the server in the "server" directory

# Wait for both processes to finish
wait
