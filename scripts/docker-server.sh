#!/bin/bash

# Make sure you run this script from the root of the site repository.

echo "Pull latest base image..."
docker pull jakejarvis/hugo-custom:latest

echo "Building Docker image..."
docker build -t jarv.is:develop -f Dockerfile .

echo "Starting live Hugo server..."
echo "Will go live at: http://localhost:1313"
docker run -v $(pwd):/src -p 1313:1313 jarv.is:develop
