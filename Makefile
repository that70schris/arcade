_:
	@make css
	@make injections
	@make tokens

css:
	npx sass ./src/themes:dist --no-source-map

injections:
	npx tsx ./src/grammars/nginx.ts
	npx tsx ./src/grammars/css.ts

tokens:
	npx tsx ./src/themes/process 'Arcade'
	npx tsx ./src/themes/process 'Arcade Light'

major minor patch:
	@make
	npx vsce publish $@
