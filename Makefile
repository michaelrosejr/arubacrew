dev:
	pnpm run dev --open  
docker-build:
	docker build -t arubacrewlabs-app .
docker-run:
	docker run -p 3000:3000 arubacrewlabs-app