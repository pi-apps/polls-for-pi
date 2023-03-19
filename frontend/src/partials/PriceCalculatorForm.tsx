import {
  Button, Form, List
} from 'antd-mobile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';
import HOCProps from '../types/HOCProps';

import './PollStarter.css';

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const PollConfigForm = (hocProps: HOCProps) => {
  const navigate = useNavigate()

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  const getPollOptions = (prompt?: string) => {
    console.log("get poll options ai API", prompt);
    return axiosClient.post('/v1/polls_ai', { prompt });
  }

  const generateOptions = async (values: any) => {
    const options = await getPollOptions(values.title)
    console.log('options', options)
  }

  // useEffect(() => {
  //   getPollOptions(hocProps?.title);
  // });
  console.log('hocProps.poll', hocProps.poll);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            {hocProps.poll.title ?
              <>
                <Form
                  layout='horizontal'
                  footer={
                    <>
                      {/* <div
                        style={{
                          marginBottom: '24px',
                          fontSize: '15px',
                          color: 'var(--adm-color-weak)',
                        }}
                      >
                        Proceed to payment page.
                      </div> */}
                      <Button block type='submit' color='primary' size='large'>
                        Proceed
                      </Button>
                    </>
                  }
                  onFinish={onFinish}
                >
                  <Form.Header>
                      Click on the Generate button to adjust the options for your poll:<br/>
                      {hocProps.poll.title}
                  </Form.Header>
                  <Button
                    block
                    color='primary' size='large'
                    className='mb-4'
                    onClick={generateOptions}
                    >
                    Generate
                  </Button>
                </Form>
                <List header='基础用法'>
                  <List.Item>1</List.Item>
                  <List.Item>2</List.Item>
                  <List.Item>3</List.Item>
                </List>
              </>
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

export default PollConfigForm;