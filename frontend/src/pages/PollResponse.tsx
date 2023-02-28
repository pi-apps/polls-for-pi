
import PollResponseForm from '../partials/PollResponseForm';
import PollResponseHeader from '../partials/PollResponseHeader';
import PollResponseProps from '../types/PollResponseProps';

const PollResponse = (props: PollResponseProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <PollResponseHeader {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollResponseForm {...props} />
      </main>

    </div>
  );
}

export default PollResponse;