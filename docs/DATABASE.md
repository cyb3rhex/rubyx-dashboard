# Database

In order to manage the database, you can use this documentation.

## Database Helpers

### Migrations
Migrations are created and run using simple wrappers around [go-migrate](https://github.com/golang-migrate/migrate).

```bash
# create files for a new migration
postgres/new my_migration_name

# execute any new migrations (this is also run automatically the container is created)
postgres/migrate up

# go down 1 migration
postgres/migrate down 1

# goto a migration by index
postgres/migrate goto 3
```

### Open a psql client
```bash
# remember to use \q to exit
postgres/psql
```