LOCAL_DEVELOPMENT_FILES = -f docker-compose.inf.yml -f docker-compose.dev.yml

up:down
	@docker compose $(LOCAL_DEVELOPMENT_FILES) up --build
down:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) down -v
add-migrations:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec server bash -c "poetry run alembic revision --autogenerate -m /"$(name)/""
add-python-dependency:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec server bash -c "poetry add $(NAME)"
	@docker compose $(LOCAL_DEVELOPMENT_FILES) cp server:/code/pyproject.toml ./backend/pyproject.toml
	@docker compose $(LOCAL_DEVELOPMENT_FILES) cp server:/code/poetry.lock ./backend/poetry.lock
shell-into-server-python:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec server bash -c "poetry run python"
shell-into-server:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec server bash
format:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec server bash -c "poetry run black ."
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec server bash -c "poetry run isort ."
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec ui bash -c "npm run format"
unit-test:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec server bash -c "poetry run pytest"
