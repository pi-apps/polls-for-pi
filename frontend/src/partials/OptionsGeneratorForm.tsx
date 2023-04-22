import {
  Button, Form, Input, List, Space
} from 'antd-mobile';
import { UndoOutline, EditSOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    console.log("get poll options ai API", `Generate ${optionsCount} choices for the question '${prompt}'`);
    const options = await pollsAPI.post('/v1/polls_ai', { prompt, optionsCount });
    return options.data.data;
  }

  const generateOptions = async () => {
    const options = await getPollOptions(props.poll.title)
    console.log('options', options)
    setOptions(options)
  }

  const proceedToPayment = async (values: any) => {
    console.log('values', values)
    navigate('/payment', { state: { message: 'Home', type: 'success' } })
  }

  let modOptions = options;
  if (options.length < props.poll.optionCount) {
    while (modOptions.length < props.poll.optionCount) {
      modOptions.push('');
    }
  }

  console.log('props.poll', props.poll);
  console.log('modOptions', modOptions);

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
                        <h3>{props.poll.title}</h3>
                        <p style={{fontSize: '1em'}}>
                          These are AI generated options.<br/>
                          Update as you see fit.
                        </p>
                      </span>
                      <Button
                        onClick={generateOptions}
                        color='success' size='large'
                      >
                        <UndoOutline />
                      </Button>
                    </Space>
                  </Form.Header>
                  <List>
                    {modOptions.map((item, index) =>
                      <Form.Item
                        name={item ? item : `Option ${index}`}
                        label={<EditSOutline />}
                        key={index}
                        initialValue={item ? item : `Option ${index}`}
                        layout="horizontal"
                        style={{
                          '--prefix-width': '25%'
                        }}
                        className='generated-option'
                      >
                        <Input onChange={console.log} placeholder={item ? item : `Option ${index}`} />
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