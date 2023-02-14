
import { Button, Input, message, Steps, theme } from 'antd';
import React, { useState } from 'react';
import HOCProps from '../types/HOCProps';

import './PollStarter.css';

const { Search } = Input;

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
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            <div className='mb-10' style={contentStyle}>{steps[current].content}</div>
            <Steps
              current={current} items={items}
              className='text-white dark:text-white'
              style={{color: 'white' }}
            />
              <div style={{ marginTop: 24 }} className='dark:text-white'>
                {current < steps.length - 1 && (
                  <Button className='btn bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0 dark:text-white' onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    className='btn bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0 dark:text-white'
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
        </div>
      </div>
    </section>
  );
}

export default PollWizardSteps;