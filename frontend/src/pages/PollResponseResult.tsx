
import { Result } from 'antd-mobile';
import PollResponseHeader from '../partials/PollResponseHeader';
import PollResponseProps from '../types/PollResponseProps';

const PollResponseResult = (props: PollResponseProps) => {
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
              <Result
                status='success'
                title='Complete'
                description='Response successfully submitted!'
              />
            </div>
          </div>
        </div>
        </section>
      </main>

    </div>
  );
}

export default PollResponseResult;