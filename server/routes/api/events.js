var codes = require('../../helpers/httpCodes')
  , Event = require('../../models/event');

module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });
  var eventRouter = express.Router({mergeParams: true});


  /**
   * @api {get} / Gets a list of the most recent events.
   * @apiName ListEvents
   * @apiGroup Events
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/events
   */
  router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Event.getEvents(function(err, data){
      if (err) return res.send({_errors: err})
      else return res.send( data );
    }, "option")
  });

  /**
   * @api {post} / Creates a new event.
   * @apiName CreateEvent
   * @apiGroup Events
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/events
   */
  router.post('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    var e = new Event(req.body);
    e.save(function(err, data){
      if (err) return res.send(err)
      else return res.send(data);
    })
  });

  router.use('/:event_id', eventRouter);

  /**
   * @api {get} /:event_id Gets details of a given event.
   * @apiName GetEvent
   * @apiGroup Events
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/events/:event_id
   */
  eventRouter.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {

    Event.getEvent( req.params.event_id , function(err, data){
      if (err) return res.send({_errors: err})
      else return res.send( data );
    })
  });

  /**
   * @api {put} /:event_id Updates details of a given event.
   * @apiName UpdateEvent
   * @apiGroup Events
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/events/:event_id
   */
  eventRouter.put('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
};
