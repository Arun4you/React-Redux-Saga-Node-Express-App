import React from 'react'
import { Route, Switch } from 'react-router'
import {Home, ImageDetail} from './containers'

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/:image_id' component={ImageDetail} />
        </Switch>
    )
}

export default Routes
