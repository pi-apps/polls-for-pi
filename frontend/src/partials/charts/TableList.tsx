import { List, Tag } from 'antd-mobile';
import { useEffect, useState } from 'react';
import pollsAPI from '../../apis/pollsAPI';
import ChartProps from '../../types/ChartProps';
import { PollResponse } from '../../types/PollResponse';

const PieChart = (props: ChartProps) => {
  const [pollResponses, setPollResponses] = useState<PollResponse[]>([]);

  const generateData = async (pollId: string | undefined) => {
    const resp = await pollsAPI.get(`/v1/polls/${pollId}`);
    setPollResponses(resp.data.data.responses);
  }

  useEffect(() => {
    generateData(props.poll._id);
  }, []);

  return (
    <List>
      {pollResponses.map((item: PollResponse, index: number) =>
        <List.Item
          key={index}
          extra={
            <>
              <span style={{padding: 5}}>{item.username}</span>
              {item.isRewarded &&
                <Tag round color='success'>rewarded</Tag>
              }
            </>
          }
        >
          {`${item.response} `}
        </List.Item>
      )}
    </List>
  );
};

export default PieChart;