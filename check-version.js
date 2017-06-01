var exec = require('child_process').exec;

exec("npm -v", function(err, stdout, stderr) {
  if (parseFloat(stdout) < 4) {
    console.error("Using npm version: " + stdout);
    console.error("You need to be using at least npm version 4. To upgrade use `npm install npm@4.6.1 -g`.\n");
    process.exit(1);
  }
});
