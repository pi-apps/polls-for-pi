
import { DeploymentUnitOutlined, DollarOutlined } from '@ant-design/icons';
import { Button as MobileButton, Form as MobileForm, Selector, Slider, Stepper, Steps as MobileSteps } from 'antd-mobile';
import { SetOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HOCProps from '../types/HOCProps';
import { options as distributionOptions } from './options';



const { Step } = MobileSteps;

import './PollWizardSteps.css';

const marks: any = { };
let x = 0;
while (x <= 10) {
  marks[x] = `${x} π`;
  x = x + 1;
}

const PollWizardSteps = (props: HOCProps) => {
  const navigate = useNavigate();
  const [ current, setCurrent ] = useState(0);

  const onBudgetChange = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
      props.poll.budget = value;
      props.setPoll(props.poll);
    }
  }

  const next = () => {
    if(current === steps.length - 2 && props.poll.budget === 0) {
      navigate("/poll_config");
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onDone = () => {
    navigate("/poll_config")
  };

  const steps = [
    {
      key: 1,
      title: 'Options',
      content:
        <MobileForm
          layout='horizontal'
        >
          <MobileForm.Item
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
            initialValue={props.poll.optionCount}
          >
            <Stepper
              min={2}
              max={10}
              onChange={value => {
                props.poll.optionCount = value;
                props.setPoll(props.poll);
              }}
            />
          </MobileForm.Item>
      </MobileForm>,
      icon: <SetOutline />,
    },
    {
      key: 4,
      title: 'Budget',
      content:
        <MobileForm
          layout='vertical'
        >
          <MobileForm.Item
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
              residentPopover
              className='mt-12'
              //ticks
              //marks={marks}
            />
          </MobileForm.Item>
        </MobileForm>,
      icon: <DollarOutlined />,
    },
    {
      key: 5,
      title: 'Distribution',
      content:
        <MobileForm
          layout='vertical'
        >
          <MobileForm.Item
            name='distribution'
            label='When will you distribute the incentives?'
            initialValue={props.poll.distribution}
          >
            <Selector
              columns={2}
              options={distributionOptions}
              onChange={(arr, extend) => {
                props.poll.distribution = arr[0];
                props.setPoll(props.poll);
              }}
            />
          </MobileForm.Item>
        </MobileForm>,
      icon: <DeploymentUnitOutlined />,
    },
  ];

  const contentStyle: React.CSSProperties = {

  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative bg-white dark:bg-black">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          <div className='mb-10' style={contentStyle}>{steps[current].content}</div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileSteps current={current}>
              {steps.map((item) =>
                <Step key={item.key} title={item.title} icon={item.icon} />
              )}
            </MobileSteps>
          </div>
          <div>
            <div className='dark:text-white' style={{ justifyItems: "center"}}>
              {/* <div>
                {current > 0 && (
                  <MobileButton
                    block
                    fill='outline'
                    className='mb-4'
                    size='large'
                    onClick={() => prev()}
                  >
                    Previous
                  </MobileButton>
                )}
              </div> */}
              <div>
                {current < steps.length - 1 && (
                  <MobileButton
                    block
                    className='mb-4'
                    color='primary' size='large'
                    onClick={() => next()}
                  >
                    Next
                  </MobileButton>
                )}
              </div>
              <div>
                {current === steps.length - 1 && (
                  <MobileButton
                    block
                    color='primary' size='large'
                    className='mb-4'
                    onClick={onDone}
                    >
                    Done
                  </MobileButton>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollWizardSteps;