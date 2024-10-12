// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {title, date, isStarred, id} = appointmentDetails

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const dateString = new Date(date)

  const formattedDate = format(dateString, 'dd MMMM yyyy, EEEE')

  const starIcons = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div>
        <p className="item-title">{title}</p>
        <p className="date">Date: {formattedDate}</p>
      </div>
      <button
        type="button"
        className="star-button"
        onClick={onClickStar}
        data-testid="star"
      >
        <img src={starIcons} alt="star" className="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
