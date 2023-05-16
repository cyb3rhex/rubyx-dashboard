# Development

If you want to contribute to Rubyx, here is few documentation about the development.

## Rebuild everything, including database(!), from scratch
Maybe your postgres went sideways from a wonky migration and it's easier to restart from scratch.
```bash
docker-compose down -v && docker-compose up --build --force-recreate
docker-compose run golang go run initdb.go
```

## Run in Production
*Warning: Run in production at your own risk!*

`docker-compose.prod.yml` is designed for a setup where postgresql is _not_ dockerized.

Don't forget to copy `.env.example` -> `.env` and setup your secrets/passwords for the new environment!
At minimum, you'll need to change `ENV`, `APP_ROOT`, and `TOKEN_SECRET`!

```bash
# build production images, and run them in a detached state
docker-compose -f docker-compose.prod-build.yml up --build -d
```

