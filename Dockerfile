# pulls from pre-built Hugo base image:
# https://github.com/jakejarvis/hugo-docker/blob/master/Dockerfile
# https://hub.docker.com/r/jakejarvis/hugo-extended
FROM jakejarvis/hugo-extended:0.74.3

# expose live-refresh server (on custom port)
EXPOSE 1337

CMD ["server", "--disableFastRender", "--buildDrafts", "--buildFuture", "--port", "1337", "--bind", "0.0.0.0", "--verbose"]
