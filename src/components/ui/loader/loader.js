import React from 'react'
import classes from './loader.module.css'

export default function Loader() {
  return (
    <div>
      <div className={classes.loaderWrapper}>
        <div className={classes.Loader}><div/><div/><div/><div/><div/><div/><div/><div/></div>
      </div>
    </div>
  )
}
