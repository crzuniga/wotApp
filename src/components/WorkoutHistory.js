import React from 'react';
import setupTime from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { getHistory } from '../utils/utils';
import WorkoutList from './WorkoutList';

export default class WorkoutHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [],
    };
  }

  componentWillMount() {
    setupTime.locale(en);
    getHistory()
      .then(
        (res) => {
          this.setState({ history: res });
        },
      );
  }

  render() {
    const { history } = this.state;
    return (
      <div className="container">
        <div className="mb-3">
          <div className="input-group">
            <div className="col-md-10" />
            <h3>
            Logs
            </h3>
          </div>
        </div>
        <WorkoutList history={history} historyList />
      </div>
    );
  }
}
