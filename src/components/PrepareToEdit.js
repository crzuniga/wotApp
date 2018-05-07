import React from 'react';
import {EditForm} from './EditForm'

const PrepareToEdit = ({ match }) => (
    <div>
        <EditForm id={match.params.id} />
  </div>
  )
export default PrepareToEdit