// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

// const initialAppointmentList = [
//   {
//     id: uuidv4(),
//     title: 'Dentist',
//     date: '20 July, Tuesday',
//     isStarred: false,
//   },
//   {
//     id: uuidv4(),
//     title: 'AI-ML Session',
//     date: '20 July, Tuesday',
//     isStarred: true,
//   },
// ]

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  getFilteredAppointments = () => {
    const {isActive, appointmentList} = this.state
    const filteredAppointments = isActive
      ? appointmentList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        )
      : appointmentList

    return filteredAppointments
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      title,
      date,
      id: uuidv4(),
      isStarred: false,
    }

    if (title !== '' && date !== '') {
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  renderInputAppointmentForm = () => {
    const {title, date} = this.state
    return (
      <form className="input-form" onSubmit={this.onAddAppointment}>
        <label className="title" htmlFor="title">
          TITLE
        </label>
        <br />
        <input
          type="text"
          className="title-input"
          placeholder="Title"
          onChange={this.onChangeTitle}
          value={title}
          id="title"
        />
        <br />
        <label className="title" htmlFor="date">
          DATE
        </label>
        <br />
        <input
          className="title-input"
          type="date"
          onChange={this.onChangeDate}
          value={date}
          id="date"
        />
        <br />
        <button type="submit" className="appointment-button">
          Add
        </button>
      </form>
    )
  }

  renderAppointments = () => {
    const filteredAppointments = this.getFilteredAppointments()
    return (
      <ul className="appointments-container">
        {filteredAppointments.map(eachAppointment => (
          <AppointmentItem
            appointmentDetails={eachAppointment}
            key={eachAppointment.id}
            toggleIsStarred={this.toggleIsStarred}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isActive} = this.state
    const starredBtnClassName = isActive ? 'active-btn' : ''

    return (
      <div className="appointments-app-container">
        <div className="app-responsive-container">
          <div className="card-content">
            <h1 className="main-heading">Add Appointment</h1>
            <div className="appointment-section">
              {this.renderInputAppointmentForm()}
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="separator" />
            <div className="title-and-starred-btn">
              <h1 className="appointments">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${starredBtnClassName}`}
                onClick={this.onClickStarredButton}
              >
                Starred
              </button>
            </div>
          </div>
          {this.renderAppointments()}
        </div>
      </div>
    )
  }
}

export default Appointments
