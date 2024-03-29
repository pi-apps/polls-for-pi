import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pollsAPI from '../apis/pollsAPI';
import HOCProps from '../types/HOCProps';
import { Poll } from '../types/Poll';
import ListItemLinksForm from './ListItemLinksForm';

import './PollStarter.css';

const PollLinksForm = (props: HOCProps) => {
  const { _id } = useParams();
  const navigate = useNavigate()
  const [poll, setPoll] = useState<Poll>({
    title: '',
    optionCount: 2,
    distribution: '',
    isLimitResponse: true,
    responseLimit: 100,
    durationDays: 30,
    perResponseReward: 0,
    responses: [],
    responseUrl: '',
    accessType: 'unlisted',
  });

  const getPoll = async (pollId: string | undefined) => {
    console.log("get poll id", pollId);
    const resp = await pollsAPI.get(`/v1/polls/${pollId}`);
    setPoll(resp.data.data)
  }

  useEffect(() => {
    getPoll(_id);
  }, []);

  const navigateToDashboard = () => {
    navigate("/dashboard/polls")
  }

  return (
    <section>
      <div className="max-w-6xl relative">
        {/* Hero content */}
        <div className="relative pt-10 pb-10 md:pt-10 md:pb-10">
          {/* Section header */}
          <div className="max-w-3xl pb-10 md:pb-10">
            <ListItemLinksForm
              poll={poll} setDisplayPopup={() => {}}
              buttonTxt="Done" callback={navigateToDashboard}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollLinksForm;