## Description

GuruHotel is a Mexican based Startup that allow Hotels to sell rooms through its products (API’s, Checkout, External Integrations).

The GuruHotel team wants to provide a clear way to let the Hotel managers see whats the price in other competitors in order to provide them with tools that can be helpful while assigning prices to their rooms in their self-hosted website.

Using Typescript, Node.js, MongoDB and Apollo server create a new Graphql API which could retrieve prices about certain hotel from different competitors, group this information in 3 different periods of time (30 Days, 60 Days or 90 Days) and expose it in a single Query.

##### Nestjs was used for this lab.

[Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

#### Rename env file:

```
.env.example to .env
```

#### Set IP provider data (backend-internal-tool-assesment):

    IP The IP of the local network
    Example:
        PROVIDER_HOST=http://192.168.0.190

```
# .env file
...
PROVIDER_HOST=http://192.168.0.190
PROVIDER_PORT=5000
PROVIDER_PATH_HOTELS=/hotels
PROVIDER_PATH_PRICES=/prices
...
```

## Running the app

```bash
$ docker-compose up -d
```

## Test

#### Important:

`For the -Health Services- tests to pass correctly, it is required that the service containers are running.`

```bash
# Lint validate
$ yarn lint

# Format validate
$ yarn format

# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Endpoints

##### [Local graphql URL](`http://127.0.0.1:3000/graphql`): `http://127.0.0.1:3000/graphql`

##### [Demo Live graphql URL](`http://127.0.0.1:3000/graphql`): `http://127.0.0.1:3000/graphql`

--- **Hotel Insights** - Retrieve prices about certain hotel from different competitors.

```
query {
  getHotelInsights( input: {hotel_id: 1, period: P30, room_type: business, limit: 0} ) {
    room {
      room_id
      room_name
      room_type
      prices {
        competitor_name
        currency
        taxes
        amount
        date
      }
     last_updated_at
    }
  }
}

```

--- **Hotel Metrics** - Query that could respond the best price, the avg price, and worst price in a specific date for all hotel rooms.

```
query {
  getHotelMetrics(input: {hotel_id: 1, day: "18/07/2022", room_type: residential}) {
    room {
      room_id
      room_name
      date
      metrics {
        best_price {
          competitor_name
          gross_amount
          net_amount
        }
        average_price {
          competitor_name
          gross_amount
          net_amount
        }
        worst_price {
          competitor_name
          gross_amount
          net_amount
        }
      }
    }
  }
}
```

--- **Health Services** - Query to validate services status.

```
query {
  ping {
    db
    local_api
    external_api
    local_cache
  }
}
```

# Tools

##### RedisInsight 2.0

-Reference: https://redis.com/blog/introducing-redisinsight-2/

##### [Monitoring Cache](`http://127.0.0.1:8001/`): `http://127.0.0.1:8001/`
