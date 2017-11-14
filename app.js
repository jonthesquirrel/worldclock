let clock = d3.select('.clock')

let face = clock.append('g')
  .classed('face', true)

face.append('circle')
  .classed('circle', true)
  // circle radius
  .attr('r', '35vmin')

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
  // little tick length start
  .attr('y1', '33.8vmin')
  // little tick length end
  .attr('y2', '36vmin')
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
  // big tick length start
  .attr('y1', '33.5vmin')
  // big tick length end
  .attr('y2', '36vmin')
  .attr('transform', (d, i) => `rotate(${hourScale(i)})`)

face.selectAll('.hour-text')
  .data([
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
  ])
  .enter()
  .append('text')
  .classed('hour-text', true)
  .text(d => d)
  .attr('x', (d, i) => `${
    // numbers radius
    29.3 * Math.sin(Math.PI / 180 * (hourScale(i) + 180))
  }vmin`)
  .attr('y', (d, i) => `${
    // numbers radius
    -29.2 * Math.cos(Math.PI / 180 * (hourScale(i) + 180))
  }vmin`)

let handScale = d3.scaleLinear()
  .range([0, 360 - 360 / (24 * 60)])
  .domain([0, (24 * 60) - 1])

let utcOffsetColorScale = d3.scaleSequential(d3.interpolateRainbow)
  .domain([0, 24 * 60])

let handData = [
  {zone: 'Europe/London', label: 'London'},
  {zone: 'Europe/Berlin', label: 'Berlin'},
  {zone: 'Europe/Athens', label: 'Athens'},
  {zone: 'Europe/Moscow', label: 'Moscow'},
  {zone: 'Asia/Tehran', label: 'Tehran'},
  {zone: 'Asia/Dubai', label: 'Dubai'},
  {zone: 'Asia/Kabul', label: 'Kabul'},
  {zone: 'Asia/Tashkent', label: 'Tashkent'},
  {zone: 'Asia/Kolkata', label: 'Kolkata'},
  {zone: 'Asia/Kathmandu', label: 'Kathmandu'},
  {zone: 'Asia/Dhaka', label: 'Dhaka'},
  {zone: 'Asia/Yangon', label: 'Yangon'},
  {zone: 'Asia/Jakarta', label: 'Jakarta'},
  {zone: 'Asia/Shanghai', label: 'Shanghai'},
  {zone: 'Asia/Pyongyang', label: 'Pyongyang'},
  {zone: 'Australia/Eucla', label: 'Eucla'},
  {zone: 'Asia/Tokyo', label: 'Tokyo'},
  {zone: 'Australia/Darwin', label: 'Darwin'},
  {zone: 'Australia/Brisbane', label: 'Brisbane'},
  {zone: 'Australia/Adelaide', label: 'Adelaide'},
  {zone: 'Australia/Melbourne', label: 'Melbourne'},
  {zone: 'Pacific/Auckland', label: 'Auckland'},
  {zone: 'Asia/Anadyr', label: 'Anadyr'},
  {zone: 'Pacific/Honolulu', label: 'Honolulu'},
  {zone: 'America/Anchorage', label: 'Anchorage'},
  {zone: 'America/Los_Angeles', label: 'Los Angeles'},
  {zone: 'America/Denver', label: 'Denver'},
  {zone: 'America/Chicago', label: 'Chicago'},
  {zone: 'America/New_York', label: 'New York'},
  {zone: 'America/Sao_Paulo', label: 'Sao Paulo'},
  {zone: 'Atlantic/Cape_Verde', label: 'Cape Verde'},
  {zone: 'America/Buenos_Aires', label: 'Buenos Aires'},
  {zone: 'America/St_Johns', label: "St. John's"},
  {zone: 'America/Caracas', label: 'Caracas'},
  {zone: 'Pacific/Marquesas', label: 'Marquesas'}
]

let hands = face.selectAll('.hand')
  .data(handData)
  .enter()
  .append('g')
  .classed('hand', true)
  .attr('transform', d => `rotate(${
    handScale(moment().tz(d.zone).diff(moment().tz(d.zone).startOf('day'), 'minutes'))
  })`)

hands.append('line')
  .attr('x1', '0')
  .attr('x2', '0')
  // hand length start
  .attr('y1', '35.4vmin')
  // hand length end
  .attr('y2', '49.5vmin')
  .attr('stroke', d => utcOffsetColorScale(
    moment().tz(d.zone).utcOffset()
  ))

hands.append('text')
  .text(d => d.label)
  .attr('transform', 'rotate(90)')
  // city name radius
  .attr('x', '35.7vmin')

function updateHands() {
  hands.data(handData)
    .transition()
    .attr('transform', d => `rotate(${
      handScale(moment().tz(d.zone).diff(moment().tz(d.zone).startOf('day'), 'minutes'))
    })`)
}

setInterval(updateHands, 60 * 1000)
