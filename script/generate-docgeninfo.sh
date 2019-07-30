#!/usr/bin/env bash

echo Generating docgenInfo...
echo $1
if [ -z $1 ]; then
  for i in $(find ./src/components/* ./src/__experimental__/components/* -type d 2>/dev/null)
  do
    react-docgen $i -o $i/docgenInfo.json --resolver findAllComponentDefinitions --pretty 2>/dev/null
  done
else
  react-docgen $1 -o $1/docgenInfo.json --resolver findAllComponentDefinitions --pretty 2>/dev/null
fi
echo Finished generating docgenInfo files.