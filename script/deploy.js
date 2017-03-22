var fs = require('fs');

var analytics = "<script>\n" +
" (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
" (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n" +
" m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n" +
" })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n" +

" ga('create', 'UA-77028225-13', 'auto');\n" +
" ga('send', 'pageview');\n" +
"</script>";

exports.default = function deploy() {
  fs.readFile('./deploy/index.html', 'utf8', function (err, data) {
    data = data.replace(/~~TIMESTAMP~~/g, Date.now());
    data = data.replace(/<!-- ~~ANALYTICS~~ -->/g, analytics);

    fs.writeFile('./deploy/index.html', data, 'utf8', function (err) {});
  });
}
