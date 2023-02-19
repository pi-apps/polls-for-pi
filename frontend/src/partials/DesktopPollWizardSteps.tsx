
import { DeploymentUnitOutlined, DollarOutlined, HourglassOutlined } from '@ant-design/icons';
import { Button, Form, Steps, theme } from 'antd';
import { Button as MobileButton, Form as MobileForm, Stepper, Steps as MobileSteps } from 'antd-mobile';
import { FillinOutline, SetOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HOCProps from '../types/HOCProps';
import { Poll } from '../types/Poll';

const { Step } = MobileSteps;

type SizeType = Parameters<typeof Form>[0]['size']

const steps = [
  {
    key: 1,
    title: 'Options',
    content:
      <MobileForm
        layout='horizontal'
      >
        <MobileForm.Item name='amount' label='How many options will your poll have?' childElementPosition='right'>
          <Stepper />
        </MobileForm.Item>
    </MobileForm>,
    icon: <SetOutline />,
  },
  {
    key: 2,
    title: 'Duration',
    content:
      <MobileForm
        layout='horizontal'
      >
        <MobileForm.Item name='amount' label='How long will it gather responses?' childElementPosition='right'>
          <Stepper />
        </MobileForm.Item>
      </MobileForm>,
    icon: <HourglassOutlined />,
  },
  {
    key: 3,
    title: 'Responses',
    content:
      <MobileForm
        layout='horizontal'
      >
        <MobileForm.Item name='amount' label='How many responses will it get?' childElementPosition='right'>
          <Stepper />
        </MobileForm.Item>
      </MobileForm>,
    icon: <FillinOutline />,
  },
  {
    key: 4,
    title: 'Budget',
    content: 'How much budget does the poll have??',
    icon: <DollarOutlined />,
  },
  {
    key: 5,
    title: 'Distribution',
    content: 'When will you distribute the rewards?',
    icon: <DeploymentUnitOutlined />,
  },
];

const PollWizardSteps = (hocProps: HOCProps) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [ current, setCurrent ] = useState(0);
  const [ poll, setPoll ] = useState<Poll | null>(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    // color: "#ffffff",
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative bg-white dark:bg-black">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          <div className='mb-10' style={contentStyle}>{steps[current].content}</div>
          {/* Desktop */}
          <div className="hidden md:flex max-w-3xl mx-auto pb-12 md:pb-16">
            <Steps
              current={current} items={steps}
              className='text-white dark:text-white'
              style={{color: 'white' }}
            />
          </div>
          <div className="hidden md:flex max-w-3xl mx-auto pb-12 md:pb-16">
              <div style={{ marginTop: 24 }} className='dark:text-white'>
                {current < steps.length - 1 && (
                  <Button
                    className='btn bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0 dark:text-white'
                    //type='primary'
                    onClick={() => next()}
                  >
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    className='btn bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0 dark:text-white'
                    //type='primary'
                    onClick={() => navigate("/poll_config")}
                  >
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button
                    className='btn bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0  dark:text-white'
                    style={{ margin: '0 8px' }} onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
              </div>
          </div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileSteps current={current}>
              {steps.map((item) =>
                <Step title={item.title} icon={item.icon} />
              )}
            </MobileSteps>
          </div>
          <div className="md:hidden">
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
                    onClick={() => navigate("/poll_config")}
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