import React from 'react';
import { EditForm } from './EditForm';

const PrepareToEdit = ({ match }) => (
  <div className="container main-container">
    <EditForm id={match.params.id} />
  </div>
);

export default PrepareToEdit;
