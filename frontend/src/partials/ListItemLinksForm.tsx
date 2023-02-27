import { ConfigProvider, theme } from 'antd';
import {
  Button, Form, Skeleton
} from 'antd-mobile';
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate } from 'react-router-dom';
import ListItemPollProps from '../types/ListItemPollProps';

import './PollStarter.css';

const ListItemLinksForm = (props: ListItemPollProps ) => {
  const { poll } = props;
  const navigate = useNavigate()

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  console.log('poll', props.poll);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-10 md:pt-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto">
            {poll.title ?
              <Form
                layout='horizontal'
                requiredMarkStyle='none'
                style={{width: '100%'}}
              >
                <Form.Item
                  name='responseUrl'
                  label='Response URL'
                  layout="vertical"
                >
                  <ConfigProvider
                    theme={{
                      algorithm: theme.darkAlgorithm,
                    }}
                  >
                    {poll.responseUrl ?
                      <Paragraph copyable>{poll.responseUrl}</Paragraph>
                      :
                      <Skeleton.Title />
                    }
                  </ConfigProvider>
                </Form.Item>
                <>
                  <h1>Responses</h1>
                  <DemoPie />
                </>
              </Form>
              :
              <Button
                block
                color='primary' size='large'
                className='mb-4'
                onClick={toRoot}
                >
                Home
              </Button>
            }
          </div>
        </div>
      </div>
    </section>
  );
}

import { Pie } from '@ant-design/plots';

const DemoPie = () => {
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

export default ListItemLinksForm;