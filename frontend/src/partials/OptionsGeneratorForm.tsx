import {
  Button, Form, Input, List, Space
} from 'antd-mobile';
import { UndoOutline, EditSOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import pollsAPI from '../apis/pollsAPI';
import HOCProps from '../types/HOCProps';

import './PollStarter.css';

const OptionsGeneratorForm = (props: HOCProps) => {
  const navigate = useNavigate()
  const [options, setOptions] = useState<string[]>(props.poll.options || []);

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  const getPollOptions = async (prompt: string) => {
    const optionsCount = props.poll.optionCount;
    const options = await pollsAPI.post('/v1/polls_ai', { prompt, optionsCount });
    return options.data.data;
  }

  const generateOptions = async () => {
    const options = await getPollOptions(props.poll.title)
    setOptions(options)
  }

  const proceedToPayment = async (values: any) => {
    navigate('/payment', { state: { message: 'Home', type: 'success' } })
  }

  let modOptions = options;
  if (options.length < props.poll.optionCount) {
    let i = 0;
    while (modOptions.length < props.poll.optionCount) {
      modOptions.push(`Edit Option ${i}`);
    }
  }
  console.log('props.poll.options', props.poll.options)
  console.log('modOptions', modOptions)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ai = searchParams.get("ai");

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            {props.poll.title ?
              <>
                <Form
                  layout='vertical'
                  footer={
                    <>
                      {/* <div
                        style={{
                          marginBottom: '24px',
                          fontSize: '15px',
                          color: 'var(--adm-color-weak)',
                        }}
                      >
                        Proceed to payment page.
                      </div> */}
                      <Space block justify="between">
                        <Button
                          fill='outline'
                          className='p-4'
                          size='large'
                          onClick={() => navigate('/poll_config', { state: { message: 'Home', type: 'success' } })}
                        >
                          Back
                        </Button>
                        <Button type='submit' color='primary' size='large'>
                          Proceed to Payment
                        </Button>
                      </Space>
                    </>
                  }
                  onFinish={proceedToPayment}
                >
                  <Form.Header>
                    <Space block justify="between">
                      <span>
                        <h3 style={{marginBottom: '10px'}}>
                          {props.poll.title}
                        </h3>
                        <p style={{fontSize: '1em', marginBottom: '5px'}}>
                          {ai === "1" && <>These are AI generated options.<br/></>}
                          Click an option to edit.
                        </p>
                      </span>
                      {ai === "1" &&
                        <Button
                          onClick={generateOptions}
                          color='success' size='large'
                        >
                          <UndoOutline />
                        </Button>
                      }
                    </Space>
                  </Form.Header>
                  <List>
                    {modOptions.map((item, index) =>
                      <Form.Item
                        name={item ? item : `Option ${index + 1}`}
                        label={<EditSOutline />}
                        key={index}
                        initialValue={item ? item : `Option ${index + 1}`}
                        layout="horizontal"
                        style={{
                          '--prefix-width': '25%'
                        }}
                        className='generated-option'
                      >
                        <Input onChange={console.log} placeholder={item ? item : `Option ${index + 1}`} />
                      </Form.Item>
                    )}
                  </List>
                </Form>
              </>
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

export default OptionsGeneratorForm;