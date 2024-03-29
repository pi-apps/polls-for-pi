import {
  Button, Form, Input, Modal, Selector, Stepper, Switch
} from 'antd-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pollsAPI from '../apis/pollsAPI';
import HOCProps from '../types/HOCProps';

import { options as distributionOptions } from '../constants/options';
import { accessTypes } from '../constants/accessTypes';
import './PollStarter.css';

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

  const generateOptionsModal = async (values: any) => {
    Modal.confirm({
      content: <span style={{ fontWeight: 'bold', justifyContent: 'center', display: 'flex' }}>Generate options using AI?</span>,
      showCloseButton: true,
      onConfirm: () => generateAiOptions(values),
      onCancel: generateManualOptions,
      confirmText: "Yes",
      cancelText: "No",
    })
  }

  const generateAiOptions = async (values: any) => {
    setLoading(true);
    const options: any = await getPollOptions(values.title, props.poll.optionCount)
    setLoading(false);

    props.poll.options = options;
    props.setPoll(props.poll)

    navigate('/options?ai=1', { state: { message: 'Home', type: 'success' } })
  }

  const generateManualOptions = async () => {
    const options = Array.from(new Array(props.poll.optionCount), (val,index) => `Option ${index + 1}`);

    props.poll.options = options;
    props.setPoll(props.poll)

    navigate('/options?ai=0', { state: { message: 'Home', type: 'success' } })
  }

  const getPollOptions = async (prompt: string, optionsCount: number) => {
    const options = await pollsAPI.post('/v1/polls_ai', { prompt, optionsCount });
    return options.data.data;
  }

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
                onFinish={generateOptionsModal}
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
                    step={5}
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
                  initialValue={[props.poll?.distribution]}
                  layout='vertical'
                  rules={[{ required: true, message: 'Distribution method is required' }]}
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
                <Form.Item
                  name='accessType'
                  label='Access'
                  initialValue={[props.poll.accessType]}
                  layout='vertical'
                  rules={[{ required: true, message: 'Access type is required' }]}
                >
                  <Selector
                    columns={2}
                    options={accessTypes}
                    onChange={(arr, extend) => {
                      props.poll.accessType = arr[0];
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