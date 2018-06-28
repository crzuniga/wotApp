import React from 'react'
import logo from "./../images/trash.png"

export class ExerciseList extends React.Component{
    click = (id) => {
        this.props.onClick(id);
    }

    render(){
        return(
            <table className='table'>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Exercise Name</th>
                    <th scope="col">Lap</th>
                    <th scope="col">Time</th>
                    <th scope="col">Video</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.laps.map((exercise, index) => (
                      <tr key={exercise.id}>
                        <th scope="row">
                          {exercise.name}
                        </th>
                        <td> {exercise.lap} </td>
                        <td> {exercise.time} </td>
                        <td> {exercise.url} </td>
                        <td>
                         <a type="submit" href='#remove' onClick={() => { this.click(exercise.id) }} > 
                            <img alt='trash' src={logo} />
                          </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
        )
    }
}