import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './StatsBox.css'

const StatsBox = ({title, cases, total, active ,...props}) => {
    return (
        <Card onClick={props.onClick} className={`statsBox ${active && 'statsBox--selected'}`}>
            <CardContent>
                {/* Title  */}
                <Typography className='statsBox__title' color='textSecondary'>
                    {title}
                </Typography>
                {/* no of Cases */}
                <h2 className='statsBox__cases'>{cases}</h2>
                {/* 1.2 mil cases Total */}
                <Typography className='statsBox__total' color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default StatsBox
