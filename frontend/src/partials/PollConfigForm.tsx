import {
  Button, Form, Input, Selector, Slider, Stepper, Switch
} from 'antd-mobile';
import axios from 'axios';
import { useState } from 'react';
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
  const [optionCount, setOptionCount] = useState(0);
  const [ checked, setChecked ] = useState(true);
  const [ distribution, setDistribution] = useState('');

  const onBudgetChange = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
      if (hocProps.poll) {
        hocProps.poll.budget = value;
      }
    }
    console.log(value)
  }

  const getPollOptions = (prompt?: string) => {
    console.log("get poll options ai API", prompt);
    return axiosClient.post('/v1/polls_ai', { prompt });
  }

  const onFinish = async (values: any) => {
    console.log('values', values)
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
            <Form
              layout='horizontal'
              footer={
                <Button block type='submit' color='primary' size='large'>
                  Submit
                </Button>
              }
              onFinish={onFinish}
            >
              <Form.Header>Poll Title</Form.Header>
              <Form.Item
                name='title'
                label='Tite'
                rules={[{ required: true, message: 'Title is required' }]}
                initialValue={hocProps.poll?.title}
              >
                <Input
                  onChange={hocProps.setTitle}
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
                  onChange={value => setOptionCount(value)}
                />
              </Form.Item>
              <Form.Item
                name='isLimited'
                label='Will it limit the number of responses?'
                childElementPosition='right'
                initialValue={true}
              >
                <Switch
                  uncheckedText='No' checkedText='Yes'
                  checked={checked}
                  onChange={val => {
                    setChecked(val)
                  }}
                />
              </Form.Item>
              <Form.Item
                name='responses'
                label='How many responses will it gather?'
                childElementPosition='right'
                disabled={!checked}
                rules={[
                  {
                    min: 1,
                    type: 'number',
                    message: 'Should gather at least one response'
                  },
                ]}
                initialValue={100}
              >
                <Stepper
                  step={10}
                  min={0}
                  max={1000}
                />
              </Form.Item>
              <Form
                layout='vertical'
              >
                <Form.Item
                  name='budget'
                  label='How much budget does it have?'
                >
                  <Slider
                    min={0}
                    max={10}
                    onAfterChange={onBudgetChange}
                    icon='π'
                    popover={(value) => <span>{value} π</span>}
                    step={0.5}
                    // step={10}
                    // ticks
                    // marks={marks}
                    defaultValue={hocProps.poll?.budget}
                  />
                </Form.Item>
              </Form>
              <Form
                layout='vertical'
              >
                <Form.Item
                  name='distribution'
                  label='When will you distribute the incentives?'
                  initialValue={[hocProps.poll?.distribution || '1']}
                >
                  <Selector
                    columns={2}
                    options={distributionOptions}
                    onChange={(arr, extend) => {
                      console.log(arr, extend.items)
                      setDistribution(arr[0]);
                    }}
                  />
                </Form.Item>
              </Form>,
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollConfigForm;