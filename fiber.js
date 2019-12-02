let Fiber = require('fibers')

function sample(callback) {
    setTimeout(function() {
        callback("this callback");
    }, 500);
}
var f = Fiber(function() {
    var fiber = Fiber.current;

    sample(function(str) {
        fiber.run(str);
    });

    var str = Fiber.yield();
    console.log(str); // "this callback"
});

f.run();
