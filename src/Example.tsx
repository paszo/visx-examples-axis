import React from 'react';
import { AxisBottom } from '@visx/axis';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';

type CityName = 'New York' | 'San Francisco' | 'Austin';


export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

export const purple3 = '#a44afe';
export const background = '#eaedff';
const defaultMargin = { top: 50, right: 50, bottom: 50, left: 50 };

const data = cityTemperature.slice(0, 12);

console.log(data);

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

// accessors
const getDate = (d: CityTemperature) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});

console.log(dateScale.range());

export default function Example({
  width,
  height,
  margin = defaultMargin,
}: BarStackProps) {

  if (width < 10) return null;
  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  dateScale.rangeRound([0, innerWidth]);
    console.log(dateScale.range());

  return width < 10 ? null : (
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <AxisBottom
          top={innerHeight + margin.top}
          left={margin.left}
          scale={dateScale}
          tickFormat={formatDate}
          stroke={"red"}
          tickStroke={"green"}
          tickLabelProps={{
            fill: "blue",
            fontSize: 11,
            textAnchor: 'middle',
          }}
        />
      </svg>
  );
}