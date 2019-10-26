_:
	@make css
	@make injections
	@make tokens

css:
	sass themes:dist --no-source-map

injections:
	npx ts-node ./grammars/nginx.ts
	npx ts-node ./grammars/html.ts
	npx ts-node ./grammars/css.ts

tokens:
	npx ts-node ./tokens.ts
	cp ./themes/*.json ./dist
