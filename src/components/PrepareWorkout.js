import React from 'react';
import {CurrentWorkout} from './CurrentWorkout'

const PrepareWorkout = ({ match }) => (
    <div>
        <CurrentWorkout id={match.params.id} />
  </div>
  )
export default PrepareWorkout