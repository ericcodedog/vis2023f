function _1(md){return(
md`# HW04 Strong baseline`
)}

function _artist1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artist-1.csv"),{from:{table:"artist-1"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artist(FileAttachment){return(
FileAttachment("artist-1.csv").csv()
)}

function _column1(artist){return(
Object.keys(artist[0])[2]
)}

function _column2(artist){return(
Object.keys(artist[0])[3]
)}

function _countsByRegion(artist,column1){return(
artist.reduce((acc, row) => {
  acc[row[column1]] = (acc[row[column1]] || 0) + 1;
  return acc;
}, {})
)}

function _counts(artist,column2){return(
artist.reduce((acc, row) => {
  acc[row[column2]] = (acc[row[column2]] || 0) + 1;
  return acc;
}, {})
)}

function _NcountsByRegion(artist,column1,column2){return(
artist.reduce((acc, row) => {
  if([row[column1]]=='北部'){
    const score = parseInt(row[column2]);
    acc[row[column1]] = (acc[row[column1]] || 0) + score;// 1;
  }else if([row[column1]]=='南部'){
    const score = parseInt(row[column2]);
    acc[row[column1]] = (acc[row[column1]] || 0) + score;// 1;
  }else if([row[column1]]=='中部'){
    const score = parseInt(row[column2]);
    acc[row[column1]] = (acc[row[column1]] || 0) + score;// 1;
  }else if([row[column1]]=='東部'){
    const score = parseInt(row[column2]);
    acc[row[column1]] = (acc[row[column1]] || 0) + score;// 1;
  }else if([row[column1]]=='國外'){
    const score = parseInt(row[column2]);
    acc[row[column1]] = (acc[row[column1]] || 0) + score;// 1;
  }
  return acc;
}, {})
)}

function _scoresByRegion(artist,NcountsByRegion,countsByRegion){return(
artist.reduce((acc, row) => {
  acc['北部'] = Math.round(NcountsByRegion['北部']/countsByRegion['北部']*100)/100
  acc['南部'] = Math.round(NcountsByRegion['南部']/countsByRegion['南部']*100)/100
  acc['中部'] = Math.round(NcountsByRegion['中部']/countsByRegion['中部']*100)/100
  acc['東部'] = Math.round(NcountsByRegion['東部']/countsByRegion['東部']*100)/100
  acc['國外'] = Math.round(NcountsByRegion['國外']/countsByRegion['國外']*100)/100
  
  return acc;
}, {})
)}

function _scoresByRegion1(artist,column1){return(
artist.reduce((acc, row) => {
  if(acc[row[column1]]=='北部'){
  
}
  acc[row[column1]] = (acc[row[column1]] || 0) + 1;
  return acc;
}, {})
)}

function _dataForChart(scoresByRegion){return(
Object.keys(scoresByRegion).map(key => ({
  name: key,
  value: scoresByRegion[key]
}))
)}

function _width(){return(
800
)}

function _height(){return(
600
)}

function _margin(){return(
{ top: 20, right: 20, bottom: 30, left: 50 }
)}

function _svg(d3,width,height){return(
d3.create("svg")
  .attr("viewBox", [0, 0, width, height])
)}

function _x(d3,dataForChart,margin,width){return(
d3.scaleBand()
  .domain(dataForChart.map(d => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.1)
)}

function _y(d3,dataForChart,height,margin){return(
d3.scaleLinear()
  .domain([0, d3.max(dataForChart, d => d.value)]).nice()
  .range([height - margin.bottom, margin.top])
)}

function _18(svg,dataForChart,x,y,tooltip){return(
svg.append("g")
  .selectAll("rect")
  .data(dataForChart)
  .join("rect")
    .attr("x", d => x(d.name))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d.value))
    .attr("height", d => y(0) - y(d.value))
    .attr("fill", "steelblue")
    // 添加交互性
    .on("mouseover", (event, d) => {
      // 显示工具提示
      tooltip.html(`名称: ${d.name}<br>值: ${d.value}`)
        .style("visibility", "visible");
    })
    .on("mousemove", (event) => {
      tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
    })
    .on("mouseout", () => {
      // 隐藏工具提示
      tooltip.style("visibility", "hidden");
    })
)}

function _19(svg,height,margin,d3,x){return(
svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x))
)}

function _20(svg,margin,d3,y){return(
svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y))
)}

function _tooltip(d3){return(
d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden")
  .style("background", "white")
  .style("border", "solid 1px black")
  .style("padding", "5px")
)}

function _22(svg){return(
svg.node()
)}

function _23(md){return(
md`<h2>結論</h2>
<h3>從上圖中，我們可以看出：
  <ul>
    <li>東部和南部的受訪者認為藝術產業的碳排放量較高</li>
    <li>主要受訪者集中在北部</li>
  </ul>
</h3>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist-1.csv", {url: new URL("../../artist@1.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artist1")).define("artist1", ["__query","FileAttachment","invalidation"], _artist1);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("column1")).define("column1", ["artist"], _column1);
  main.variable(observer("column2")).define("column2", ["artist"], _column2);
  main.variable(observer("countsByRegion")).define("countsByRegion", ["artist","column1"], _countsByRegion);
  main.variable(observer("counts")).define("counts", ["artist","column2"], _counts);
  main.variable(observer("NcountsByRegion")).define("NcountsByRegion", ["artist","column1","column2"], _NcountsByRegion);
  main.variable(observer("scoresByRegion")).define("scoresByRegion", ["artist","NcountsByRegion","countsByRegion"], _scoresByRegion);
  main.variable(observer("scoresByRegion1")).define("scoresByRegion1", ["artist","column1"], _scoresByRegion1);
  main.variable(observer("dataForChart")).define("dataForChart", ["scoresByRegion"], _dataForChart);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("svg")).define("svg", ["d3","width","height"], _svg);
  main.variable(observer("x")).define("x", ["d3","dataForChart","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","dataForChart","height","margin"], _y);
  main.variable(observer()).define(["svg","dataForChart","x","y","tooltip"], _18);
  main.variable(observer()).define(["svg","height","margin","d3","x"], _19);
  main.variable(observer()).define(["svg","margin","d3","y"], _20);
  main.variable(observer("tooltip")).define("tooltip", ["d3"], _tooltip);
  main.variable(observer()).define(["svg"], _22);
  main.variable(observer()).define(["md"], _23);
  return main;
}
