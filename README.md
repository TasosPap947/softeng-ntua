# TL21-17

# Introduction

This repository houses the implementation and documentation of the "Software Engineering" project. Its main purpose is to calculate debts between different highway toll providers.

# Components

### API

The API is built on node/express. It returns data for passes made during a certain time period etc. (as documented in the project's requirements).

### Backend

The backend is also built on node, and communication with the database is made using plain SQL queries.

### CLI

The CLI is built on node.

yargs is used for argument parsing and axios is used for making HTTP requests.

It offers the same functionality as the API.

### Database

For the database, MySQL/MySQLWorkbench was used.

# Installation

To install all node dependencies:

> bash install.sh

To start the api:

> bash api.sh

To start the frontend :

> bash frontend.sh
