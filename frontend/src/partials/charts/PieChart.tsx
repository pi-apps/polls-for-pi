import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import pollsAPI from '../../apis/pollsAPI';
import ChartProps from '../../types/ChartProps';
import { PollResponse } from '../../types/PollResponse';

const PieChart = (props: ChartProps) => {
  const [data, setData] = useState<any>([]);

  const generateData = async (pollId: string | undefined) => {
    console.log("get poll id", pollId);
    const resp = await pollsAPI.get(`/v1/polls/${pollId}`);
    console.log('resp.data.data', resp.data.data);

    const poll = resp.data.data;

    const dataMap: any = {};
    poll.responses?.forEach((pollResp: PollResponse) => {
      const { response, username } = pollResp;
      if (dataMap[response]) {
        dataMap[response] += 1;
      } else {
        dataMap[response] = 1;
      }
    });

    const data: any[] = [];
    Object.keys(dataMap).forEach((key: any) => {
       data.push({type: key, value: dataMap[key]})
    });

    setData(data);
    console.log('data', data);
  }

  useEffect(() => {
    generateData(props.poll._id);
  }, []);

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