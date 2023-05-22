import {
  Button,  Space, Result
} from 'antd-mobile';
import { useLocation, useParams } from 'react-router-dom';
import PollResponseHeader from '../partials/PollResponseHeader';
import PollResponseProps from '../types/PollResponseProps';

import UrlPattern from 'url-pattern';
import PieChart from '../partials/charts/PieChart';
import pollsAPI from '../apis/pollsAPI';
import { Poll } from '../types/Poll';
import { useEffect, useState } from 'react';

const getPathname = () => {
  const location = useLocation();
  return location.pathname;
}

const PollResponseResult = (props: PollResponseProps) => {
  const pathname = getPathname();
  const isSuccessPattern = new UrlPattern('/polls/:responseUrl/complete');
  const isSuccess = isSuccessPattern.match(pathname);
  const { responseUrl } = useParams();
  const [poll, setPoll] = useState<Poll>();

  const getPoll = async (responseUrl: string | undefined) => {
    const resp = await pollsAPI.get(`/v1/polls?responseUrl=${responseUrl}`);
    const poll = resp.data.data[0];
    setPoll(poll);
  }

  useEffect(() => {
    document.title = 'Poll Response Result';
  }, []);

  useEffect(() => {
    getPoll(responseUrl);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <PollResponseHeader {...props} />

      {/*  Page content */}
      <main className="grow">
        <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Hero content */}
          <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
            {/* Section header */}
            <div className="max-w-3xl mx-auto pb-12 md:pb-16">
              {isSuccess ?
                <>
                  <Space block justify="between">
                    <span>
                      <h3 style={{marginBottom: '10px'}}>
                        {poll?.title}
                      </h3>
                    </span>
                  </Space>
                  <Result
                    status='success'
                    title='Complete'
                    description='Response successfully submitted!'
                  />
                  <PieChart responseUrl={responseUrl} />
                </>
                :
                <Result
                  status='error'
                  title='Error'
                  description='There was a problem in submitting your response.'
                />
              }
            </div>
          </div>
        </div>
        </section>
      </main>

    </div>
  );
}

export default PollResponseResult;