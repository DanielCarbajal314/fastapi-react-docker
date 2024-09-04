## Example Trello App

This is a fullstack app for task management base on the next techstack:

- Python
- Fastapi
- Poetry
- SQLAlchemy
- Alembic
- Docker
- Makefile
- React
- Vite
- Typescript
- Tailwind
- ReactQuery
- Bruno
- playwright

You can create users, create projects and add tasks to them, also show a report view to see all user tasks among projects. It runs on [http://localhost:3005/](http://localhost:3005/)

### Commands to Run the project

- `make up` : Builds the containers and start the up
- `make unit-test` : Runs unit test inside the server container
- `make integration-test` : Runs integration test on a separated container, it creates a project with 3 users, 3 steps and 3 tasks
- `make e2e-test` : Runs e2e test in a playwright container
- `make up-run-all-tests` : Starts the app and run all test (unit, integration and e2e)

Design Comments:

- The app is fully containerized to improve portability of the dev enviroment and reduce the complexity of CI/CD
- THe backend follows Hexagonal Architecture with Repository, Unit of Work and CQS Patterns using FastApi Dependency Injection
- The frontend is using Grouping by Features/Modules code distribution with Custom Hooks, react-query and tailwind
- Makefile hold a group of general use commands for development process
- The integration Test are implemented using Bruno
- The e2e Test are implemented using playwright inside a container
