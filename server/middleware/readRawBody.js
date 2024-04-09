function readRawBody(req, res, next) {
  const buffers = [];

  req.on('data', (chunk) => {
    buffers.push(chunk);
  });

  req.on('end', () => {
    req.rawBody = Buffer.concat(buffers).toString();
    next();
  });
}

exports.readRawBody = readRawBody;
