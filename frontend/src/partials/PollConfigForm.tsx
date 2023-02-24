import {
  Button, Form, Input, Selector, Stepper, Switch
} from 'antd-mobile';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';
import HOCProps from '../types/HOCProps';

import { options as distributionOptions } from './options';
import './PollStarter.css';

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
console.log('_window.__ENV', _window.__ENV)
console.log('backendURL', backendURL)

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const PollConfigForm = (props: HOCProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  // const onBudgetChange = (value: number | number[]) => {
  //   let text = ''
  //   if (typeof value === 'number') {
  //     text = `${value}`
  //     props.poll.budget = value;
  //     props.setPoll(props.poll);
  //   }
  // }

  const onRewardChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      props.poll.perResponseReward = value;
      props.setPoll(props.poll);
    }
  }

  const onRewardChangeStepper = (value: number) => {
    props.poll.perResponseReward = value;
    props.setPoll(props.poll);
  }

  const getPollOptions = async (prompt: string, optionsCount: number) => {
    console.log("get poll options ai API", { prompt, optionsCount });
    const options = await axiosClient.post('/v1/polls_ai', { prompt, optionsCount });
    return options.data.data;
  }

  const onFinish = async (values: any) => {
    setLoading(true);
    const options: any = await getPollOptions(values.title, props.poll.optionCount)
    setLoading(false);
    console.log('options', options)

    props.poll.options = options;
    props.setPoll(props.poll)

    navigate('/options', { state: { message: 'Home', type: 'success' } })
  }

  // useEffect(() => {
  //   getPollOptions(props?.title);
  // });
  console.log('props.poll', props.poll);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            {props.poll.title ?
              <Form
                layout='horizontal'
                requiredMarkStyle='none'
                footer={
                  <>
                    {/* <div
                      style={{
                        marginBottom: '24px',
                        fontSize: '15px',
                        color: 'var(--adm-color-weak)',
                      }}
                    >
                      Proceed to options generation.
                    </div> */}
                    <Button
                      block
                      loading={loading}
                      type='submit' color='primary' size='large'
                    >
                      Generate Options
                    </Button>
                  </>
                }
                onFinish={onFinish}
              >
                <Form.Header>Poll Configuration</Form.Header>
                <Form.Item
                  name='title'
                  label='Title'
                  rules={[{ required: true, message: 'Title is required' }]}
                  initialValue={props.poll.title}
                  layout="vertical"
                >
                  <Input
                    onChange={(value) => {
                      props.poll.title = value;
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
                  initialValue={props.poll?.optionCount}
                >
                  <Stepper
                    max={10}
                    onChange={value => {
                      props.poll.optionCount = value;
                      props.setPoll(props.poll);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='isLimited'
                  label='Will it limit the number of responses?'
                  childElementPosition='right'
                  initialValue={props.poll.isLimitResponse}
                >
                  <Switch
                    uncheckedText='No' checkedText='Yes'
                    checked={props.poll.isLimitResponse}
                    onChange={isLimitResponse => {
                      props.poll.isLimitResponse = isLimitResponse;
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='responses'
                  label='How many responses will it gather?'
                  childElementPosition='right'
                  disabled={!props.poll.isLimitResponse}
                  rules={[
                    {
                      min: 1,
                      type: 'number',
                      message: 'Should gather at least one response'
                    },
                  ]}
                  initialValue={props.poll.responseLimit}
                >
                  <Stepper
                    step={10}
                    min={0}
                    max={1000}
                    onChange={value => {
                      props.poll.responseLimit = value;
                      props.setPoll(props.poll);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='perResponseReward'
                  label='How much incentive would you like each response to get?'
                  childElementPosition='right'
                  initialValue={props.poll.perResponseReward}
                >
                  <Stepper
                    style={{
                      "--input-width": '80px'
                    }}
                    min={0.001}
                    formatter={value => `${value} π`}
                    step={0.001}
                    onChange={onRewardChangeStepper}
                  />
                  {/* <Slider
                    min={0}
                    max={1}
                    onAfterChange={onRewardChange}
                    icon='π'
                    step={0.001}
                    popover={(value) => <span>{value} π</span>}
                    residentPopover
                    className='mt-12'
                    // step={10}
                    // ticks
                    // marks={marks}
                  /> */}
                </Form.Item>
                <Form.Item
                  name='duration'
                  label='For how long will you gather responses?'
                  childElementPosition='right'
                  initialValue={props.poll.durationDays}
                  rules={[
                    {
                      min: 1,
                      type: 'number',
                      message: 'Should gather responses for at least one day'
                    },
                  ]}
                >
                  <Stepper
                    style={{
                      "--input-width": '80px'
                    }}
                    step={1}
                    min={1}
                    max={90}
                    formatter={value => `${value} days`}
                    onChange={value => {
                      props.poll.durationDays = value;
                      props.setPoll(props.poll);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='distribution'
                  label='When will you distribute the incentives?'
                  initialValue={[props.poll?.distribution || '1']}
                  layout='vertical'
                >
                  <Selector
                    columns={2}
                    options={distributionOptions}
                    onChange={(arr, extend) => {
                      props.poll.distribution = arr[0];
                      props.setPoll(props.poll);
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