let clock = d3.select('.clock')

let face = clock.append('g')
  .classed('face', true)

face.append('circle')
  .classed('circle', true)

let quarterHourScale = d3.scaleLinear()
  .range([0, 360 - 360 / 96])
  .domain([0, 96 - 1])

face.selectAll('.quarter-hour-tick')
  .data(Array(96))
  .enter()
  .append('line')
  .classed('quarter-hour-tick', true)
  .attr('x1', '0')
  .attr('x2', '0')
  .attr('y1', '42vmin')
  .attr('y2', '38vmin')
  .attr('transform', (d, i) => `rotate(${quarterHourScale(i)})`)

let hourScale = d3.scaleLinear()
  .range([0, 360 - 360 / 24])
  .domain([0, 24 - 1])

face.selectAll('.hour-tick')
  .data(Array(24))
  .enter()
  .append('line')
  .classed('hour-tick', true)
  .attr('x1', '0')
  .attr('x2', '0')
  .attr('y1', '42vmin')
  .attr('y2', '38vmin')
  .attr('transform', (d, i) => `rotate(${hourScale(i)})`)

face.selectAll('.hour-text')
  .data([
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ])
  .enter()
  .append('text')
  .classed('hour-text', true)
  .text(d => d)
  .attr('x', (d, i) => `${
    33 * Math.sin(Math.PI / 180 * (hourScale(i) + 180))
  }vmin`)
  .attr('y', (d, i) => `${
    -33 * Math.cos(Math.PI / 180 * (hourScale(i) + 180))
  }vmin`)

let handScale = d3.scaleLinear()
  .range([0, 360 - 360 / (24 * 60)])
  .domain([0, (24 * 60) - 1])

let utcOffsetColorScale = d3.scaleSequential(d3.interpolateRainbow)
  .domain([0, 24 * 60])

let handData = [
  {zone: 'America/New_York', label: 'New York'},
  {zone: 'America/Chicago', label: 'Chicago'},
  {zone: 'America/Denver', label: 'Denver'},
  {zone: 'America/Los_Angeles', label: 'San Francisco'}
]

let hand = face.selectAll('.hand')
  .data(handData)
  .enter()
  .append('g')
  .classed('hand', true)
  .attr('transform', d => `rotate(${
    handScale(moment().tz(d.zone).diff(moment().tz(d.zone).startOf('day'), 'minutes'))
  })`)

hand.append('line')
  .attr('x1', '0')
  .attr('x2', '0')
  .attr('y1', '40.3vmin')
  .attr('y2', '49.5vmin')
  .attr('stroke', d => utcOffsetColorScale(
    moment().tz(d.zone).utcOffset()
  ))

hand.append('text')
  .text(d => d.label)
  .attr('transform', 'rotate(90)')
  .attr('x', '40.5vmin')
