
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddEditWorkout from './AddEditView';
import MyWorkouts from './WorkoutView';
import PrepareWorkout from './PrepareWorkout';
import PrepareToEdit from './PrepareToEdit';
import WorkoutHistory from './WorkoutHistory';

const MyRoutes = () => (
  <Router>
    <div>
      <Route exact path="/" component={MyWorkouts} />
      <Route exact path="/currentwo/:id" component={PrepareWorkout} />
      <Route path="/addwo" component={AddEditWorkout} />
      <Route exact path="/edit/:id" component={PrepareToEdit} />
      <Route exact path="/history" component={WorkoutHistory} />
    </div>
  </Router>
);


export default MyRoutes;
