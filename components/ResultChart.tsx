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
    { subject: '外向型 (E)', A: score.E, fullMark: 3 },
    { subject: '内向型 (I)', A: score.I, fullMark: 3 },
    { subject: '感覚型 (S)', A: score.S, fullMark: 3 },
    { subject: '直観型 (N)', A: score.N, fullMark: 3 },
    { subject: '思考型 (T)', A: score.T, fullMark: 3 },
    { subject: '感情型 (F)', A: score.F, fullMark: 3 },
    { subject: '判断型 (J)', A: score.J, fullMark: 3 },
    { subject: '知覚型 (P)', A: score.P, fullMark: 3 },
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
