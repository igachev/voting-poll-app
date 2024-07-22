

import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

interface FormatVote {
    name: string;
    value: number;
  }

interface VoteChartProps {
    votes: FormatVote[];
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const VoteChart = ({
    votes
}: VoteChartProps) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
    <h4 className='text-center mt-2 text-lg sm:text-2xl'>Vote Results:</h4>
        <ResponsiveContainer>
          <PieChart>
          <Pie
            data={votes}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {votes.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
  )
}

export default VoteChart