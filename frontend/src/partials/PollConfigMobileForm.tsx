import {
  Button as MobileButton, Form as MobileForm, Input as MobileInput, TextArea as MobileTextArea
} from 'antd-mobile';
import HOCProps from '../types/HOCProps';

import './PollStarter.css';

const PollConfigMobileForm = (hocProps: HOCProps) => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            <MobileForm
              layout='horizontal'
              footer={
                <MobileButton block type='submit' color='primary' size='large'>
                  Submit
                </MobileButton>
              }
            >
              <MobileForm.Header>Poll Title</MobileForm.Header>
              <MobileForm.Item
                name='title'
                label='Tite'
                rules={[{ required: true, message: 'Title is required' }]}
              >
                <MobileInput onChange={console.log} placeholder='Poll Title' />
              </MobileForm.Item>
              <MobileForm.Item name='address' label='地址' help='详情地址'>
                <MobileTextArea
                  placeholder='请输入地址'
                  maxLength={100}
                  rows={2}
                  showCount
                />
              </MobileForm.Item>
            </MobileForm>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollConfigMobileForm;