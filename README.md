# Cars API

This API uses the [w3tecch Express Typescript Boilerplate](https://github.com/w3tecch/express-typescript-boilerplate). Check the repository for related documentation.

## ❯ Getting Started

### Step 1: Install Docker and Docker Compose

Before you start, make sure you have a recent version of [Docker](https://docs.docker.com/engine/installation/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Step 2: Set up the API

Clone this project and go into it:

```bash
git clone git@github.com:guham/cars-api.git
```

```bash
cd cars-api
```

Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

Build Docker images:

```bash
docker-compose build
```

Start the containers in the background:

```bash
docker-compose up -d
```

Then show containers logs:

```bash
docker-compose logs -f
```

(To shut it down, press CTRL + C at any time)

The API is now ready on <http://127.0.0.1:3000/api/v1>.

### Step 3: Seed the database

2 options:

1. put the cars CSV (filename must be **MOCK_DATA.csv**) into the data folder (`cars-api/data`) and then seed the database:

```bash
docker-compose exec api yarn start db.seed
```

2. upload the CSV file from the API: <http://127.0.0.1:3000/swagger/#/Car/CarController.upload>.

## ❯ API Routes

The route prefix is `/api/v1`.

| Route          | Description |
| -------------- | ----------- |
| **/api/v1**       | Shows us the name, description and the version of the package.json |
| **/swagger**   | This is the Swagger UI with our API documentation |
| **/monitor**   | Shows a small monitor page for the server |
| **api/v1/cars** | Cars endpoint |

## ❯ Test the API

### With Swagger

- [<http://127.0.0.1:3000/swagger/>](<http://127.0.0.1:3000/swagger/>)

Default HTTP basic auth login/password: admin/1234

### With Postman

- Import the `cars-api/Cars_API.postman_collection.json` file into Postman
