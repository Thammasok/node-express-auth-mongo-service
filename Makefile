mongo:
	docker compose up mongo -d

redis:
	docker compose up redis -d

up:
	docker compose up -d

down:
	docker compose down -v

ng:
	ngrok http http://localhost:3030
