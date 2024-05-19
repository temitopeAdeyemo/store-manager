#!/bin/bash

# Run TypeScript compilation
echo "Compiling TypeScript..."

# chmod -R 777 "./dist"
yarn run tsc

# Check the exit code of the TypeScript compilation
if [ $? -ne 0 ]; then
  echo "TypeScript compilation failed. Exiting..."
  exit 1
fi

echo "--------------Compiling TypeScript completed--------------"

npm run start:dev


