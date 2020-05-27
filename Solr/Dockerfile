FROM solr:8.5.0
WORKDIR /
ADD ./web.xml /opt/solr-8.5.0/server/solr-webapp/webapp/WEB-INF/
USER solr
CMD solr start -f
ENTRYPOINT ["docker-entrypoint.sh"]