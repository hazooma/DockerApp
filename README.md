


## Installation & Run

* *npm install* - Install dependencies
* *npm run start* - Start application (It needs a mysql database)

### Running with Docker

* *docker-compose up* (compose and run, it also creates the mysql database)
* *docker-compose down* (Destroy application and mysql containers)

## Useful npm commands

* *npm run clean* - Remove dist, node_modules, coverage folders
* *npm run lint* - Lint your TypeScript code
* *npm run start:dev* - Run application in dev mode (debug & watch). Debug mode is running on port 5858 (open `chrome://inspect/#devices`).
* *npm run test* - Run unit tests
