FROM registry.access.redhat.com/ubi7/nodejs-12

WORKDIR /opt/app-root

#USER root

COPY . .

USER root

#RUN npm install --only=prod && fix-permissions ./ && npm run build
RUN  npm install  && fix-permissions ./  &&   npm run build

EXPOSE 8080

USER 1001

CMD ["sh", "-c", "echo 'sleep 2' && sleep 2 && npm start"]