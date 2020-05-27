FROM node:12.16.3 as build-image 
ADD App /client/
RUN npm install -g @angular/cli
WORKDIR /client
RUN npm install
RUN npm run build --prod


FROM centos:latest
RUN rm -r /var/cache/dnf 
RUN yum -y install httpd
COPY --from=build-image /client/dist/LyricsSearch/ /var/www/html/
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
