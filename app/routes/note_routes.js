
const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  // GET
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id)};
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'err': 'An error has occured'});
      } else {
        res.send(item)
      }
    })
  });

  // POST
  app.post('/notes', (req, res) => {
    // console.log(req.body);
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occured' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

    // PUT
    app.put('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id)};
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').update(details, note, (err, item) => {
        if (err) {
          res.send({'err': 'An error has occured'});
        } else {
          res.send(note)
        }
      })
    });

  // DELETE
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
};
