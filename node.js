var http = require("http");
    fs = require('fs');
    apiai = require('apiai');


fs.readFile('./web/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    
    http.createServer(function(request, response) {  
    
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
        
        var app = apiai("5b09e135674146fbad5de2a32ad85c0b");
 
        var request = app.textRequest('what is your age? ', {
            sessionId: '440282538f0c4ae09dcf59d6b956fb64'
        });
         
        request.on('response', function(response) {
            console.log("HELLLLOOOO");
            console.log(response);
        });
         
        request.on('error', function(error) {
            console.log("THERE IS AN ERROR");
            console.log(error);
        });
         
        request.end();

    }).listen(8081);
});

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
 

