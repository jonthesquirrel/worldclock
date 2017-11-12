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
    '00', '01', '02', '03', '04', '05',
    '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17',
    '18', '19', '20', '21', '22', '23'
  ])
  .enter()
    .append('text')
      .classed('hour-text', true)
      .text(d => d)
      // .attr('x', (d, i) => `rotate(${hourScale(i)})`)
      // .attr('y', (d, i) => `rotate(${hourScale(i)})`)
