_:
	@make css
	@make injections
	@make tokens

css:
	npx sass ./src/themes:dist --no-source-map

injections:
	npx ts-node ./src/grammars/nginx.ts
	npx ts-node ./src/grammars/css.ts

tokens:
	npx ts-node ./src/themes/process 'Arcade'
	npx ts-node ./src/themes/process 'Arcade Light'

major minor patch:
	@make
	@npx vsce publish $@
