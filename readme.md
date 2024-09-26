
## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

# Introduction

This repo is for setup a development server for `node.js` with **database**,**cache**,and **message-broker** in `doker-compose`. Just run `docker-compose up` in **terminal** in your project root directory to get started with all the services running in isolated containers.

# Getting Started

To get started you must have `docker` and `docker-compose` installed in your local development environment. I am in linux so this setup is for linux only. If you are in other operating system you had setup on your own way.
First copy the `.env.example` to `.env`.Then run `docker-compose up --build`

# Features

- running a development server in docker

# Project Structure

# Technologies Used

- nodejs
- typescript
- mongodbd

#### Test the API endpoints

you need to have `curl` to run this test otherwise you can test in your own away

To create a user

```sh
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \

-d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30
}'
```

# Reference

<https://github.com/ufoscout/docker-compose-wait/tree/master>
<https://stackoverflow.com/questions/30063907/docker-compose-how-to-execute-multiple-commands>
<https://stackoverflow.com/questions/31746182/docker-compose-wait-for-container-x-before-starting-y/41854997#41854997>
<https://github.com/jwilder/dockerize>
