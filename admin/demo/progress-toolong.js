let ProgressBar = require("progress");

var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
    complete: '='
  , incomplete: ' '
  , width: 1024     /* something longer than the terminal width */
  , total: 100
});

(function next() {
  bar.tick(1);

  if (!bar.complete) {
    setTimeout(next, 10);
  }
})();