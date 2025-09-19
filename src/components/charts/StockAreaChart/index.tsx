import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface StockData {
  date: Date;
  price: number;
}

interface StockAreaChartProps {
  data: StockData[];
  height?: number;
}

const StockAreaChart: React.FC<StockAreaChartProps> = ({
  data,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const margin = { top: 20, right: 40, bottom: 30, left: 50 };
    const containerWidth = wrapperRef.current.getBoundingClientRect().width;
    const width = containerWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${containerWidth} ${height}`)
      .attr("preserveAspectRatio", "none"); // stretch to container

    svg.selectAll("*").remove();

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.price)! - 5,
        d3.max(data, (d) => d.price)! + 5,
      ])
      .nice()
      .range([innerHeight, 0]);

    const area = d3
      .area<StockData>()
      .x((d) => x(d.date))
      .y0(innerHeight)
      .y1((d) => y(d.price));

    chart
      .append("path")
      .datum(data)
      .attr("fill", "steelblue")
      .attr("opacity", 0.4)
      .attr("d", area);

    const line = d3
      .line<StockData>()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    chart
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));
    chart.append("g").call(d3.axisLeft(y));

    // Tooltip elements
    const focusLine = chart
      .append("line")
      .attr("stroke", "gray")
      .attr("stroke-dasharray", "4")
      .style("opacity", 0)
      .attr("y1", 0)
      .attr("y2", innerHeight);

    const focusCircle = chart
      .append("circle")
      .attr("r", 5)
      .attr("fill", "steelblue")
      .style("opacity", 0);

    const tooltip = chart.append("g").style("opacity", 0);

    const tooltipRect = tooltip
      .append("rect")
      .attr("fill", "white")
      .attr("stroke", "gray")
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("opacity", 0.9);

    // Padding values
    const paddingLeft = 11;
    const paddingTop = 6;
    const paddingBottom = 3;
    const rowSpacing = 5;

    // Tooltip text elements
    const tooltipTextDate = tooltip
      .append("text")
      .attr("x", paddingLeft)
      .attr("fill", "black")
      .style("font-size", "12px");

    const tooltipTextPrice = tooltip
      .append("text")
      .attr("fill", "black")
      .style("font-size", "12px");

    // Colored square for price
    const tooltipPriceSquare = tooltip
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "steelblue")
      .attr("rx", 2)
      .attr("ry", 5);

    const formatDate = d3.timeFormat("%b %d %Y"); // "Mar 15 2025"

    chart
      .append("rect")
      .attr("width", width)
      .attr("height", innerHeight)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mousemove", (event) => {
        const [mouseX] = d3.pointer(event);
        const xDate = x.invert(mouseX);

        const bisect = d3.bisector<StockData, Date>((d) => d.date).left;
        const idx = bisect(data, xDate, 1);
        const d0 = data[idx - 1];
        const d1 = data[idx];
        const d =
          d1 &&
          xDate.getTime() - d0.date.getTime() >
            d1.date.getTime() - xDate.getTime()
            ? d1
            : d0;

        focusLine
          .attr("x1", x(d.date))
          .attr("x2", x(d.date))
          .style("opacity", 1);

        focusCircle
          .attr("cx", x(d.date))
          .attr("cy", y(d.price))
          .style("opacity", 1);

        tooltip
          .attr("transform", `translate(${x(d.date) + 10},${y(d.price) - 40})`)
          .style("opacity", 1);

        // First row
        tooltipTextDate
          .text(formatDate(d.date))
          .style("font-weight", "bold")
          .attr("y", paddingTop + 12);

        const bboxDate = (tooltipTextDate.node() as SVGTextElement).getBBox();

        // Second row (price)
        tooltipPriceSquare
          .attr("x", paddingLeft)
          .attr("y", bboxDate.y + bboxDate.height + rowSpacing);

        tooltipTextPrice
          .html(
            `Price: <tspan font-weight="bold">$${d.price.toFixed(2)}</tspan>`
          )
          .attr("x", paddingLeft + 14) // 10px square + 4px gap
          .attr(
            "y",
            bboxDate.y + bboxDate.height + rowSpacing + 10 // align with square
          );

        const bboxPrice = (tooltipTextPrice.node() as SVGTextElement).getBBox();

        // Tooltip rect size (include left + right padding)
        const tooltipWidth =
          Math.max(
            bboxDate.width + paddingLeft,
            bboxPrice.x + bboxPrice.width + 6
          ) + 6; // extra right padding
        const tooltipHeight =
          bboxDate.height +
          rowSpacing +
          bboxPrice.height +
          paddingTop +
          paddingBottom;

        tooltipRect.attr("width", tooltipWidth).attr("height", tooltipHeight);
      })
      .on("mouseout", () => {
        focusLine.style("opacity", 0);
        focusCircle.style("opacity", 0);
        tooltip.style("opacity", 0);
      });
  }, [data, height]);

  return (
    <div ref={wrapperRef} style={{ width: "100%" }}>
      <svg ref={svgRef} style={{ width: "100%", height }}></svg>
    </div>
  );
};

export default StockAreaChart;
