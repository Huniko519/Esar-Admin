# LaravelAPIBoilerplateJWT

[![Build Status](https://travis-ci.org/Tony133/laravel-api-boilerplate-jwt.svg?branch=master)](https://travis-ci.org/Tony133/laravel-api-boilerplate-jwt)

An API Boilerplate to create a ready-to-use REST API in seconds with Laravel 8.x

## Install with Composer

```
    $ curl -s http://getcomposer.org/installer | php
    $ php composer.phar install or composer install
```

## Set Environment

```
    $ cp .env.example .env
```

## Set the application key

```
   $ php artisan key:generate
```

## Generate jwt secret key

```
    $ php artisan jwt:secret
```

## User Registration with Curl

```
    $ curl  -H 'content-type: application/json' -H 'Accept: application/json' -v -X POST -d '{"name":"tony","email":"tony_admin@laravel.com","password":"secret"}' http://127.0.0.1:8000/api/auth/register
```

## User Authentication with Curl

```
    $ curl  -H 'content-type: application/json' -H 'Accept: application/json' -v -X POST -d '{"email":"tony_admin@laravel.com","password":"secret"}' http://127.0.0.1:8000/api/auth/login
```

## Get the logged in user with Curl

```
    $ curl  -H 'content-type: application/json' -H 'Accept: application/json'  -v -X GET http://127.0.0.1:8000/api/auth/me?token=[:token]
```

## User Logout with curl

```
    $ curl  -H 'content-type: application/json' -H 'Accept: application/json' -v -X GET http://127.0.0.1:8000/api/auth/logout?token=[:token]

```

## Refresh token with curl

```
    $ curl  -H 'content-type: application/json' -H 'Accept: application/json' -v -X GET http://127.0.0.1:8000/api/auth/refresh?token=[:token]

```

## User Forgot Password with Curl

```
    $ curl -H 'content-type: application/json' -H 'Accept: application/json' -v POST -d '{"email": "tony_admin@laravel.com"}' http://127.0.0.1:8000/api/auth/forgot
```

## User Change Password with Curl

```
    $ curl -H 'content-type: application/json' -H 'Accept: application/json' -v POST -d '{"email": "tony_admin@laravel.com", "password": "secret"}' http://127.0.0.1:8000/api/auth/change?token=[:token]
```

