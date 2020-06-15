service := app

build:
	@docker-compose build

# Builds, (re)creates, starts, and attaches to containers for a service
start:
	@docker-compose up -d
	@docker-compose ps

# Stops running containers without removing them
stop:
	@docker-compose stop

# Restarts service
restart:
	@docker-compose restart ${service}

# Removes stopped service containers
clean:
	@docker-compose rm --force

# Stops running containers with removing, removes service image
kill:
	@docker-compose stop
	@docker-compose rm --force
	@docker rmi -f simpleiftaapp_app

# Pulls latest service images
pull:
	@docker-compose pull

# Lists containers and their statuses
status:
	@docker-compose ps

# Displays log output from services. Default is main service
logs:
	@docker-compose logs -f ${service}

.PHONY: start stop restart clean kill pull status logs