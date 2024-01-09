import React from 'react'

const RecentData = (props) => {
  return (
    <div className="recent">
        <div>{props.title}</div>
        <div>{props.amount}</div>
        <div>{props.type}</div>
        <div>{props.date}</div>
    </div>
  )
}

export default RecentData