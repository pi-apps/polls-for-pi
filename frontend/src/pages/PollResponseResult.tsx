
import { Result } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import PollResponseHeader from '../partials/PollResponseHeader';
import PollResponseProps from '../types/PollResponseProps';

import UrlPattern from 'url-pattern';

const getPathname = () => {
  const location = useLocation();
  return location.pathname;
}

const PollResponseResult = (props: PollResponseProps) => {
  const pathname = getPathname();
  const isSuccessPattern = new UrlPattern('/polls/:responseUrl/complete');
  const isSuccess = isSuccessPattern.match(pathname);

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
                <Result
                  status='success'
                  title='Complete'
                  description='Response successfully submitted!'
                />
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