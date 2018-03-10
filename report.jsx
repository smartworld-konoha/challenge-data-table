var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var data = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
]

var reduce = function (row, memo) {
  if (row.type === 'impression') memo.impressionsCnt = (memo.impressionsCnt || 0) + 1
  if (row.type === 'load') memo.loadsCnt = (memo.loadsCnt || 0) + 1
  if (row.type === 'display') memo.displaysCnt = (memo.displaysCnt || 0) + 1
  return memo
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressionsCnt',
    className: 'alignRight'
  },
  {
    title: 'Loads',
    value: 'loadsCnt',
    className: 'alignRight'
  },
  {
    title: 'Displays',
    value: 'displaysCnt',
    className: 'alignRight'
  },
  {
    title: 'Load Rate',
    value: function (row) {
      return row.loadsCnt / row.impressionsCnt * 100
    },
    template: function (val, row) {
      return val.toFixed(1) + '%'
    },
    className: 'alignRight'
  },
  {
    title: 'Display Rate',
    value: function (row) {
      return row.displaysCnt / row.impressionsCnt * 100
    },
    template: function (val, row) {
      return val.toFixed(1) + '%'
    },
    className: 'alignRight'
  }
]

module.exports = createReactClass({
  render: function () {
    return (
      <div>
        Report
        <div className=''>
          <ReactPivot rows={data}
                      dimensions={dimensions}
                      calculations={calculations}
                      reduce={reduce}
                      activeDimensions={['Date', 'Host']}
                      nPaginateRows={20} />
        </div>
      </div>
    )
  }
})
