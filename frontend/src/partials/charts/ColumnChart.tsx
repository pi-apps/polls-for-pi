import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import pollsAPI from '../../apis/pollsAPI';
import ChartProps from "../../types/ChartProps";
import { PollResponse } from '../../types/PollResponse';

const ColumnChart = (props: ChartProps) => {

  const [data, setData] = useState<any>([]);

  const generateData = async (pollId: string | undefined) => {
    const resp = await pollsAPI.get(`/v1/polls/${pollId}`);
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
  }

  useEffect(() => {
    generateData(props.poll._id);
  }, []);

  const config = {
    data,
    xField: 'type',
    yField: 'value',
    label: {
      // 可手动配置 label 数据标签位置
      //position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};


export default ColumnChart;