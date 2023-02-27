import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';
import HOCProps from '../types/HOCProps';
import { Poll } from '../types/Poll';
import ListItemPollForm from './ListItemPollForm';

import './PollStarter.css';

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
console.log('_window.__ENV', _window.__ENV)
console.log('backendURL', backendURL)

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const PollEditForm = (props: HOCProps) => {
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
  });

  const getPoll = async (pollId: string | undefined) => {
    console.log("get poll id", pollId);
    const resp = await axiosClient.get(`/v1/polls/${pollId}`);
    console.log('resp', resp);
    setPoll(resp.data.data)
  }

  useEffect(() => {
    getPoll(_id);
  }, []);
  console.log('poll', poll);

  const navigateToDashboard = () => {
    navigate("/dashboard/polls")
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-10 pb-10 md:pt-10 md:pb-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-10 md:pb-10">
            <ListItemPollForm
              poll={poll} setDisplayPopup={() => {}}
              buttonTxt="Done" callback={navigateToDashboard}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollEditForm;