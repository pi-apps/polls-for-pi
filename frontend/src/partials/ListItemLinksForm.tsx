import { ConfigProvider, theme, Typography } from 'antd';
import {
  Button, ErrorBlock, Form, Skeleton, Tabs
} from 'antd-mobile';
import { HistogramOutline, PieOutline, UnorderedListOutline } from 'antd-mobile-icons';
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate } from 'react-router-dom';
import ListItemPollProps from '../types/ListItemPollProps';
import ColumnChart from './charts/ColumnChart';
import PieChart from './charts/PieChart';
import TableList from './charts/TableList';
const { Link } = Typography;

import './ListItemLinksForm.css';

const ListItemLinksForm = (props: ListItemPollProps) => {
  const { poll } = props;
  const navigate = useNavigate()

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

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
                <Form.Header>POLL: {poll.title}</Form.Header>
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
                      <>
                      <Paragraph copyable>{`${window.location.origin}/polls/${poll.responseUrl}/response`}</Paragraph>
                      <ConfigProvider
                        theme={{
                          algorithm: theme.darkAlgorithm,
                        }}
                      >
                        <Link href={`${window.location.origin}/polls/${poll.responseUrl}/response`} target="_blank">Open</Link>
                        </ConfigProvider>
                      </>
                      :
                      <Skeleton.Title />
                    }
                  </ConfigProvider>
                </Form.Item>
                <>
                  <h1 className="pl-3">Responses</h1>
                  <Tabs>
                    <Tabs.Tab title={<PieOutline />} key='pie'>
                      {props.poll?.responses?.length > 0 ?
                        <PieChart {...props} />
                        :
                        <ErrorBlock
                          title='Nothing to see here.'
                          status='empty'
                          description={
                            <span>
                              No responses collected yet.
                            </span>
                          }
                          style={{
                            '--image-height': '150px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                          }}
                        />
                      }
                    </Tabs.Tab>
                    <Tabs.Tab title={<HistogramOutline />} key='bar'>
                      {props.poll?.responses?.length > 0 ?
                        <ColumnChart {...props} />
                        :
                        <ErrorBlock
                          title='Nothing to see here.'
                          status='empty'
                          description={
                            <span>
                              No responses collected yet.
                            </span>
                          }
                          style={{
                            '--image-height': '150px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                          }}
                        />
                      }
                    </Tabs.Tab>
                    <Tabs.Tab title={<UnorderedListOutline />} key='table'>
                      {props.poll?.responses?.length > 0 ?
                        <TableList {...props} />
                        :
                        <ErrorBlock
                          title='Nothing to see here.'
                          status='empty'
                          description={
                            <span>
                              No responses collected yet.
                            </span>
                          }
                          style={{
                            '--image-height': '150px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                          }}
                        />
                      }
                    </Tabs.Tab>
                  </Tabs>
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

export default ListItemLinksForm;