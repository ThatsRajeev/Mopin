function readRawBody(req, res, next) {
   var data = "";
   req.on('data', function(chunk) {
      data += chunk;
   });
   req.on('end', function() {
      req.rawBody = data;
      next();
   });
}

exports.readRawBody = readRawBody;
