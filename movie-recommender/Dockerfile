# Build step #1: build the React front end
FROM node:14-alpine as build-step
ENV NODE_ENV production
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
# Copy app files
COPY . .
RUN yarn build

# Build step #2: build the API with the client as static files
FROM python:3.9-alpine
WORKDIR /app
COPY --from=build-step /app/build ./build
COPY api/requirements.txt api/api.py api/.flaskenv ./api/
RUN pip install --upgrade setuptools
RUN pip install -r ./api/requirements.txt
ENV FLASK_DEBUG false

EXPOSE 80 5000
WORKDIR /app/api
CMD ["gunicorn", "-b", ":80", "api:app"]