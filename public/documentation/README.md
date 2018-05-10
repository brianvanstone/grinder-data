# Overview

## System Architecture
[Diagram of sytem architecture](/documentation/sysarch.png)

### Client Side
- React App runs rendering all front end content

### Data Model
- Data stored in Dynamo DB
- //TODO model schemas

### Data Access Layer
- Data retrieved via Lambda based controllers
- //TODO API contract
- //TODO public API documentation for custom integrations / more features

## Security Model

### Auth0: Authentication as a Service
- Supports accounts registered for our site, Google Auth, Facebook Auth
- React APP logs users in against Auth0
- //TODO Lambdas validate user's temporary auth token against Auth0

## DevOps Pipeline
- //TODO document work with Travis CI

## Test Architecture and Coverage
- //TODO this is waaaaaay in the backlog