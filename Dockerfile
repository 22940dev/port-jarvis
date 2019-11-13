# Custom Hugo Extended fork, pre-built on GitHub Package Registry:
#     https://hub.docker.com/r/jakejarvis/hugo-custom
#     https://github.com/jakejarvis/hugo-custom/blob/master/Dockerfile
# 
# Usage:
#     docker build -t jarv.is:develop -f Dockerfile .
#     docker run -v $(pwd):/src -p 1313:1313 jarv.is:develop
# ...then open http://localhost:1313 for the live-refresh server.

FROM jakejarvis/hugo-custom:latest

# verify everything's OK
RUN /usr/bin/hugo version

# add site source as volume
VOLUME /src
WORKDIR /src

# expose live-refresh server
EXPOSE 1313

ENTRYPOINT ["/usr/bin/hugo"]
CMD ["server", "--buildDrafts", "--buildFuture", "--bind", "0.0.0.0", "--port", "1313", "--verbose"]
