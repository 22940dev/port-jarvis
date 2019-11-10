#!/bin/bash

# Make sure you run this script from the root of the site repository...

echo "Pull latest Docker image..."
docker pull jakejarvis/hugo-custom:latest

echo "Building Hugo from image..."
docker run -v $(pwd):/src jakejarvis/hugo-custom:latest --gc --cleanDestinationDir --verbose
