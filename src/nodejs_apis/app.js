'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  //Expose the documentation
  app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log('Server is Up and Running\n- To access the swagger documentation go to the following URL: http://127.0.0.1:' + port + '/docs');
  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('- Call Entrypoint Example:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }


});
