npm install -g mustache

node ./dist/jane-and-john-result.js \
  | mustache - ./doc/asset/report.mustache \
  > ./doc/output/jane-and-john.md
