import React, { Component } from 'react'
import { Link as RoutedLink } from 'react-router-dom'

const Link = ({ to, children, ...rest }) => {
  // if (/^https?:\/\//.test(to)) {
  if (to.indexOf('://') === -1) {
    return (<a href={to} {...rest}>{children}</a>)
  } else {
    return (<Link to={to} {...rest}>{children}</Link>)
  }
}

export default Link
