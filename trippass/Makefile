start:
	PORT=3001 npm start
build:
	docker build -t dockerId/imageName:latest .
push:
	docker push dockerId/imageName:latest
deploy:
	kubectl apply -f secret.yaml
	kubectl apply -f deployment.yaml
