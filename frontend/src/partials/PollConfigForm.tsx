import {
  Button, Form, Input, Selector, Slider, Stepper, Switch, Toast
} from 'antd-mobile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HOCProps from '../types/HOCProps';

import { options as distributionOptions } from './options';
import './PollStarter.css';

interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
    viteBackendURL: string, // REACT_APP_BACKEND_URL environment variable
    viteSandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
console.log('_window.__ENV', _window.__ENV)
console.log('backendURL', backendURL)

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const PollConfigForm = (hocProps: HOCProps) => {
  const navigate = useNavigate()

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  const onBudgetChange = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
      hocProps.poll.budget = value;
      hocProps.setPoll(hocProps.poll);
    }
  }

  const getPollOptions = (prompt?: string) => {
    console.log("get poll options ai API", prompt);
    return axiosClient.post('/v1/polls_ai', { prompt });
  }

  const onFinish = async (values: any) => {
    const options = await getPollOptions(values.title)
    console.log('options', options)
    Toast.show("options", options)
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
              <Form
                layout='horizontal'
                footer={
                  <>
                    <div
                      style={{
                        marginBottom: '24px',
                        fontSize: '15px',
                        color: 'var(--adm-color-weak)',
                      }}
                    >
                      Pressing Submit will bring you to the payment page.
                    </div>
                    <Button block type='submit' color='primary' size='large'>
                      Submit
                    </Button>
                  </>
                }
                onFinish={onFinish}
              >
                <Form.Header><h1>Are you ok with this configuration?</h1></Form.Header>
                <Form.Item
                  name='title'
                  label='Title'
                  rules={[{ required: true, message: 'Title is required' }]}
                  initialValue={hocProps.poll.title}
                >
                  <Input
                    onChange={(value) => {
                      hocProps.poll.title = value;
                    }}
                    placeholder='Poll Title'
                  />
                </Form.Item>
                <Form.Item
                  className='custom-width'
                  name='options'
                  label='How many options will your poll have?'
                  childElementPosition='right'
                  rules={[
                    {
                      min: 2,
                      type: 'number',
                      message: 'Should have at least two options'
                    },
                  ]}
                  initialValue={hocProps.poll?.optionCount}
                >
                  <Stepper
                    max={10}
                    onChange={value => {
                      hocProps.poll.optionCount = value;
                      hocProps.setPoll(hocProps.poll);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='isLimited'
                  label='Will it limit the number of responses?'
                  childElementPosition='right'
                  initialValue={hocProps.poll.isLimitResponse}
                >
                  <Switch
                    uncheckedText='No' checkedText='Yes'
                    checked={hocProps.poll.isLimitResponse}
                    onChange={isLimitResponse => {
                      hocProps.poll.isLimitResponse = isLimitResponse;
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='responses'
                  label='How many responses will it gather?'
                  childElementPosition='right'
                  disabled={!hocProps.poll.isLimitResponse}
                  rules={[
                    {
                      min: 1,
                      type: 'number',
                      message: 'Should gather at least one response'
                    },
                  ]}
                  initialValue={hocProps.poll.responseLimit}
                >
                  <Stepper
                    step={10}
                    min={0}
                    max={1000}
                    onChange={value => {
                      hocProps.poll.responseLimit = value;
                      hocProps.setPoll(hocProps.poll);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='budget'
                  label='How much budget does it have?'
                  layout='vertical'
                >
                  <Slider
                    min={0}
                    max={10}
                    onAfterChange={onBudgetChange}
                    icon='π'
                    step={0.5}
                    popover={(value) => <span>{value} π</span>}
                    residentPopover
                    className='mt-12'
                    defaultValue={hocProps.poll.budget}
                    // step={10}
                    // ticks
                    // marks={marks}
                  />
                </Form.Item>
                <Form.Item
                  name='distribution'
                  label='When will you distribute the incentives?'
                  initialValue={[hocProps.poll?.distribution || '1']}
                  layout='vertical'
                >
                  <Selector
                    columns={2}
                    options={distributionOptions}
                    onChange={(arr, extend) => {
                      hocProps.poll.distribution = arr[0];
                      hocProps.setPoll(hocProps.poll);
                    }}
                  />
                </Form.Item>
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

export default PollConfigForm;