var clock = d3.select('.clock')
  .selectAll('circle')
  .data([1])

clock.enter().append('circle')
  .style('fill', 'transparent')
  .style('stroke', 'black')
  .style('stroke-width', '1vmin')
  .style('cx', '50vw')
  .style('cy', '50vh')
  .style('r', '40vmin')

clock.exit().remove()
