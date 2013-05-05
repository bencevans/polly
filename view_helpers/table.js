
var _ = require('underscore');

function dataValues (data) {
  return _.map(data, function(item) {
    return _.toArray((item.values || item)).join('</td><td>');
  });
}

module.exports = function(data) {
  var keys = [];

  data = data.values || data;

  if(data[0]) keys = Object.keys(data[0].values || data[0]);

  return [
    '<table class="table table-bordered table-striped table-hover">',
    '  <thead>',
    '    <tr>',
    '      <th>' + keys.join('</th><th>') + '</th>',
    '    </tr>',
    '  </thead>',
    '  <tbody>',
    '    <tr><td>' + dataValues(data).join('</td></tr><tr><td>') + '</td></tr>',
    '  </tbody>',
    '</table>'
  ].join('');

};