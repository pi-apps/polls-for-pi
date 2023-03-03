import { Pie } from '@ant-design/plots';
import ChartProps from '../../types/ChartProps';

const PieChart = (props: ChartProps) => {
  const data = [
    {
      type: 'Yes',
      value: 50,
    },
    {
      type: 'No',
      value: 25,
    },
    {
      type: 'Maybe',
      value: 25,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: (item: any) => `${(item.percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieChart;