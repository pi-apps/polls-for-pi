import {
  Button, Form, Input, Modal, Selector, Toast
} from 'antd-mobile';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pollsAPI from '../apis/pollsAPI';
import PollResponseProps from '../types/PollResponseProps';

const PollResponseForm = (props: PollResponseProps) => {
  const { responseUrl } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState('');

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  const getPollOptions = async (responseUrl: string) => {
    console.log("get poll responseUrl:", responseUrl);
    const result = await pollsAPI.get(`/v1/polls/${responseUrl}/poll`);
    setOptions(result.data.options)
    setTitle(result.data.title)
  }

  const submitResponse = async (pollResponse: any) => {
    console.log("submitResponse values:", pollResponse);
    const result = await pollsAPI.post(`/v1/polls/${responseUrl}/responses`, {
      username: props.user?.username,
      uid: props.user?.uid,
      response: pollResponse
    });
    return result.data;
  }

  const onFinish = async (values: any) => {
    if(props.user === null) {
      Modal.confirm({
        title: 'Signin',
        content: <span style={{ fontWeight: 'bold', justifyContent: 'center', display: 'flex' }}>Signin to to receive incentives.</span>,
        showCloseButton: true,
        onConfirm: props.onSignIn,
        confirmText: "Signin",
        cancelText: "Cancel",
      })
      return;
    }
    try {
      setLoading(true);
      const result = await submitResponse(values.options[0])
      setLoading(false);
      console.log('onFinish result', result)

      navigate(`/polls/${responseUrl}/complete`);
    } catch (err: any) {
      const msg = err.response.data.message;
      Toast.show({
        icon: 'fail',
        content: msg,
        position: 'top',
      })
      navigate(`/polls/${responseUrl}/error`);
    }
  }

  useEffect(() => {
    if (responseUrl) {
      getPollOptions(responseUrl);
    }
  }, []);

  console.log('options', options);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            {title ?
              <Form
                layout='horizontal'
                requiredMarkStyle='none'
                onFinish={onFinish}
                footer={
                  <Button
                    block
                    type='submit'
                    color='primary'
                    size='large'
                  >
                    Submit
                  </Button>
                }
              >
                <Form.Header>
                  <div style={{ overflowWrap: "break-word", width: "90%", justifyContent: "space-between" }}>
                    <span style={{width: "80%"}}>
                      <h3 style={{marginBottom: '10px'}}>
                        {title}
                      </h3>
                    </span>
                  </div>
                </Form.Header>
                {/* <Form.Item
                  name='title'
                  initialValue={title}
                  layout="vertical"
                  disabled={true}
                >
                  <Input
                    placeholder='Poll Title'
                  />
                </Form.Item> */}
                <Form.Item
                  name='options'
                  layout='vertical'
                  rules={[{ required: true, message: 'Please select one.' }]}
                >
                  <Selector
                    columns={1}
                    options={options.map((item, index) => {
                      return { label: item, value: item }
                    })}
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

export default PollResponseForm;