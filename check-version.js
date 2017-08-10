var exec = require('child_process').exec;

exec("npm -v", function(err, stdout, stderr) {
  if (parseFloat(stdout) < 5) {
    console.error("Using npm version: " + stdout);
    console.error("You need to be using at least npm version 5. To upgrade use `npm install npm@latest -g`.\n");
    process.exit(1);
  }
});
