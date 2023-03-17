import {
  Button, Form, Input, List, Selector, Stepper, Switch, Toast
} from 'antd-mobile';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';
import ListItemPollProps from '../types/ListItemPollProps';
import { Poll } from '../types/Poll';

import { options as distributionOptions } from '../constants/options';
import { accessTypes } from '../constants/accessTypes';
import './PollStarter.css';

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
console.log('_window.__ENV', _window.__ENV)
console.log('backendURL', backendURL)

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const ListItemPollForm = (props: ListItemPollProps ) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  const onRewardChangeStepper = (value: number) => {
    props.poll.perResponseReward = value;
  }

  const updatePoll = async (poll: Poll) => {
    console.log('patch poll', poll)
    const updatedPoll = await axiosClient.put(`/v1/polls/${poll._id}`, {
      title: poll.title,
      options: poll.options,
    });
    return updatedPoll.data.data;
  }

  const onFinish = async (values: any) => {
    console.log('values', values)
    setLoading(true);
    const patchedPoll: any = await updatePoll(props.poll);
    setLoading(false);
    console.log('patchedPoll', patchedPoll)

    navigate('/dashboard/polls', { state: { message: 'Home', type: 'success' } })
    props.setDisplayPopup(false);
    Toast.show('Poll successfully updated!');
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-10 md:pt-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto">
            {props.poll.title ?
              <Form
                layout='horizontal'
                requiredMarkStyle='none'
                footer={
                  <>
                    {!props.buttonTxt ?
                      <Button
                        block
                        loading={loading}
                        type='submit' color='primary' size='large'
                      >
                        Update
                      </Button>
                      :
                      <Button
                        block
                        loading={loading}
                        color='primary' size='large'
                        onClick={(e) => {
                          if (props.callback) {
                            props.callback();
                          }
                        }}
                      >
                        {props.buttonTxt}
                      </Button>
                    }
                  </>
                }
                onFinish={onFinish}
              >
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
                  disabled={true}
                >
                  <Stepper
                    max={10}
                    onChange={value => {
                      props.poll.optionCount = value;
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='isLimited'
                  label='Will it limit the number of responses?'
                  childElementPosition='right'
                  initialValue={props.poll.isLimitResponse}
                  disabled={true}
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
                  disabled={true}
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
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='perResponseReward'
                  label='How much incentive would you like each response to get?'
                  childElementPosition='right'
                  initialValue={props.poll.perResponseReward}
                  disabled={true}
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
                  disabled={true}
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
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='distribution'
                  label='When will you distribute the incentives?'
                  initialValue={[props.poll.distribution]}
                  layout='vertical'
                  rules={[{ required: true, message: 'Distribution method is required' }]}
                  disabled={true}
                >
                  <Selector
                    columns={2}
                    options={distributionOptions}
                    onChange={(arr, extend) => {
                      props.poll.distribution = arr[0];
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='accessType'
                  label='Access'
                  initialValue={props.poll.accessType}
                  layout='vertical'
                  rules={[{ required: true, message: 'Access type is required' }]}
                >
                  <Selector
                    columns={2}
                    options={accessTypes}
                    onChange={(arr, extend) => {
                      props.poll.accessType = arr[0];
                    }}
                  />
                </Form.Item>
                <>
                  <List header='Options'>
                    {props.poll.options?.map((item, index) =>
                      <Form.Item
                        name={item}
                        key={item}
                        initialValue={item}
                      >
                        <Input
                          onChange={(value) => {
                            if (props.poll.options) {
                              props.poll.options[index] = value;
                            }
                          }}
                          placeholder={item}
                        />
                      </Form.Item>
                    )}
                  </List>
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

export default ListItemPollForm;