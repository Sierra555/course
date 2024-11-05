import { Children } from "react";

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <p className={`notification ${type}`}>
        {message}
      </p>
    )
  }
export default Notification;