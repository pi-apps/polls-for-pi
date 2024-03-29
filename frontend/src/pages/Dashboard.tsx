import { useEffect } from 'react';
import BottomBar from '../partials/BottomBar';

import Header from '../partials/Header';
import HOCProps from '../types/HOCProps';

import './demo2.css';

const Dashboard = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Poll Dashboard';
  }, []);

  return (
    <>
      {/*  Site header */}
      <div className={"app"}>
        <div className={"top"}>
          <Header {...props} />
        </div>
        {props.user &&
          <BottomBar {...props} />
        }
      </div>
    </>
  );
}

export default Dashboard;