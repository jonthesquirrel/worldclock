let clock = d3.select('.clock')

let face = clock.append('g')
  .classed('face', true)

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
  .attr('y1', '34.9px')
  // little tick length end
  .attr('y2', '37.3px')
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
  .attr('y1', '34.9px')
  // big tick length end
  .attr('y2', '37.3px')
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
    30.6 * Math.sin(Math.PI / 180 * (hourScale(i) + 180))
  }px`)
  .attr('y', (d, i) => `${
    // numbers radius
    -30.6 * Math.cos(Math.PI / 180 * (hourScale(i) + 180))
  }px`)

let handScale = d3.scaleLinear()
  .range([0, 360 - 360 / (24 * 60)])
  .domain([0, (24 * 60) - 1])

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
  .classed('local', d => moment().tz(moment.tz.guess()).utcOffset() == moment().tz(d.zone).utcOffset())

hands.append('line')
  .attr('x1', '0')
  .attr('x2', '0')
  // city label inner
  .attr('y1', '38.5px')
  // city label outer
  .attr('y2', '49.5px')

hands.append('text')
  .text(d => d.label)
  .attr('transform', 'rotate(90)')
  // city label text distance
  .attr('x', '44px')

// approximation, actual international date line is jagged
let dateline = face.selectAll('.dateline.idl')
  .data(Array(1))
  .enter()
  .append('g')
  .classed('dateline idl', true)

dateline.append('line')
  .attr('x1', '0')
  .attr('x2', '0')
  // date line inner
  .attr('y1', '38.5px')
  // date line outer
  .attr('y2', '49.5px')

// will daylight savings time mess up the dateline text if done this way?

dateline.append('text')
  .classed('idl-before', true)
  .attr('transform', 'rotate(88.5)')
  // text distance
  .attr('x', '44px')

dateline.append('text')
  .classed('idl-after', true)
  .attr('transform', 'rotate(91.5)')
  // text distance
  .attr('x', '44px')

// midnight (inner) dateline
face.append('line')
  .classed('dateline', true)
  .attr('x1', '0')
  .attr('x2', '0')
  // midnight line inner
  .attr('y1', '14px')
  // midnight line outer
  .attr('y2', '27px')

face.append('text')
  .classed('dateline midnight-before', true)
  .attr('transform', 'rotate(86)')
  .attr('x', '21px')

face.append('text')
  .classed('dateline midnight-after', true)
  .attr('transform', 'rotate(94)')
  .attr('x', '21px')

function updateHands() {
  hands.data(handData)
    .transition()
    .attr('transform', d => `rotate(${
      handScale(moment().tz(d.zone).diff(moment().tz(d.zone).startOf('day'), 'minutes'))
    })`)

  dateline.data(Array(1))
    .transition()
    .attr('transform', `rotate(${
      handScale(moment().utc().utcOffset(13.5 * 60).diff(moment().utc().utcOffset(13.5 * 60).startOf('day'), 'minutes'))
    })`)

  face.select('.idl-before')
    .text(moment().tz('Pacific/Auckland').format('dddd'))
  face.select('.idl-after')
    .text(moment().tz('Pacific/Honolulu').format('dddd'))
  face.select('.midnight-before')
    .text(moment().tz('Pacific/Honolulu').format('dddd'))
  face.select('.midnight-after')
    .text(moment().tz('Pacific/Auckland').format('dddd'))
}

// initialize clock
updateHands()

// update every second
setInterval(updateHands, 1 * 1000)

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

// hidden by default
function hideUI() {
  document.querySelector(".ui").setAttribute("hidden", "")
}

function showUI() {
  document.querySelector(".ui").removeAttribute("hidden")
}

// hide github corner after mouse movement has stopped for a bit
let mouseHideTimer = debounce(hideUI, 500)

window.addEventListener("mousemove", () => {
  // show github corner
  showUI()
  // hide eventually
  mouseHideTimer()
})
