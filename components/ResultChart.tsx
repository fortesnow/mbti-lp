import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { AxisScore } from '../types';

interface ResultChartProps {
  score: AxisScore;
}

const ResultChart: React.FC<ResultChartProps> = ({ score }) => {
  const data = [
    { subject: 'Extraversion', A: score.E, fullMark: 3 },
    { subject: 'Introversion', A: score.I, fullMark: 3 },
    { subject: 'Sensing', A: score.S, fullMark: 3 },
    { subject: 'Intuition', A: score.N, fullMark: 3 },
    { subject: 'Thinking', A: score.T, fullMark: 3 },
    { subject: 'Feeling', A: score.F, fullMark: 3 },
    { subject: 'Judging', A: score.J, fullMark: 3 },
    { subject: 'Perceiving', A: score.P, fullMark: 3 },
  ];

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 3]} tick={false} axisLine={false} />
          <Radar
            name="Personality"
            dataKey="A"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;
