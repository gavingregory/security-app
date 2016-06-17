var codes = require('../../helpers/httpCodes')
  , Event = require('../../models/event')
  , Comment = require('../../models/comment');

console.log("Event: " + Event);

console.log("Comment: " + Comment);
module.exports = function (express, passport, io) {
  var router = express.Router({ mergeParams: true });
  var eventRouter = express.Router({mergeParams: true});
  var commentRouter = express.Router({mergeParams: true});

   io.on('connection', function(socket){
     console.log('a user connected');
   });

  /**
   * @api {get} / Gets a list of the most recent events.
   * @apiName ListEvents
   * @apiGroup Events
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/events
   */
  router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return Event.getAll(req.user, function(err, data) {
      if (err) return res.send({_errors: err});
      return res.send(data);
    });
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
    Event.create(req.user, req.body, function (err, data) {
      if (err) return res.status(codes.bad_request).send({_errors: err});
      return res.send(data);
    });
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

    return Event.get(req.user, req.params.event_id, function(err, data) {
      if (err) return res.send({_errors: err});
      return res.send(data);
    });
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

  eventRouter.use('/comments', commentRouter);

  /**
   * @api {get} / Gets a list of the most recent comments.
   * @apiName ListComments
   * @apiGroup Comments
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/events/:event_id/comments
   */
  commentRouter.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {

    return Comment.getAll(req.user, function(err, data) {
      if (err) return res.send({_errors: err});
      return res.send(data);
    });
  });

  /**
   * @api {post} / Creates a new comment.
   * @apiName CreateComment
   * @apiGroup Comments
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/events/:event_id/comments
   */
  commentRouter.post('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Comment.create(req.user, req.body, function (err, data) {
      if (err) return res.send({_errors: err});
      return res.send(data);
    });
  });

  return router;
};
