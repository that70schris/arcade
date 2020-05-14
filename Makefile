_:
	@make css
	@make injections
	@make tokens
	@cp README.md dist

css:
	npx sass themes:dist --no-source-map

injections:
	npx ts-node ./grammars/nginx.ts
	npx ts-node ./grammars/css.ts

tokens:
	npx ts-node ./tokens.ts

major minor patch:
	@npx vsce publish $@
