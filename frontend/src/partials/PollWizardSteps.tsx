
import { Button, Input, message, Steps, theme } from 'antd';
import { Button as MobileButton, Steps as MobileSteps } from 'antd-mobile';
import React, { useState } from 'react';
import HOCProps from '../types/HOCProps';

import './PollStarter.css';

const { Search } = Input;
const { Step } = MobileSteps;

const steps = [
  {
    title: 'Options',
    content: 'How many options will your poll have?',
  },
  {
    title: 'Chart',
    content: 'How would you like to see the results?',
  },
  {
    title: 'Distribution',
    content: 'When will you distribute the rewards?',
  },
];

const PollWizardSteps = (hocProps: HOCProps) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

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
              current={current} items={items}
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
                    onClick={() => message.success('Processing complete!')}>
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
              <Step title='标题1' description='描述' />
              <Step title='标题2' description='描述' />
              <Step title='标题3' description='描述' />
            </MobileSteps>
          </div>
          <div className="md:hidden">
            <div className='dark:text-white' style={{ justifyItems: "center"}}>
              <div>
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
              </div>
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
                    onClick={() => message.success('Processing complete!')}>
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