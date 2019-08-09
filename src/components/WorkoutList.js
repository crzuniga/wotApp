import React from 'react';
import TimeAgo from 'react-time-ago';

const WorkoutList = (props) => {
  const { history, historyList, workouts } = props;
  if (historyList) {
    return (
      <table className="table table-striped">
        <thead className="">
          <tr>
            <th scope="col">Workout Name</th>
            <th scope="col">When</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          { history.map(workout => (
            <tr key={workout.id}>
              <td>
                {workout.name}
              </td>
              <td>
                <TimeAgo locale="en">
                  {workout.date}
                </TimeAgo>
              </td>
              <td>
                {workout.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Workout Name</th>
          <th scope="col">Laps</th>
          <th scope="col">Expected Time</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout, index) => (
          <tr key={workout.id}>
            <th scope="row">
              <a href={`/currentwo/${workout.id}`}>{workout.name}</a>
            </th>
            <td>
              {workout.total_laps}
            </td>
            <td>
              {
                `${props.totalWorkoutTime(index)} minutes`
              }
            </td>
            <td>
              <a href={`/edit/${workout.id}`}>
                <img alt="edit" src="/images/edit.png" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutList;
