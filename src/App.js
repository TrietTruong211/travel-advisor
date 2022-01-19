import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import {getPlacesData} from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map'


const App = () => {
    // get and display places
    const [places, setPlaces] = useState([]); //expecting array, hence [], initial value

    // get coordinates from map
    // {lat: 0, lng: 0}
    const [coordinates, setCoordinates] = useState({}); //expecting an object, hence {}, initial value 0,0

    // get bounds from map
    const [bounds, setBounds] = useState({})

    // get child clicked from map to pass it to list
    const [childClicked, setChildClicked] = useState(null)

    // Initialize loading state to false
    const [isLoading, setIsLoading] = useState(false);

    // useEffect( call back function, dependency array), if leave array empty, the codes only happen at the start of the application
    useEffect(() => {
        //Use browser built in geolocation api
        navigator.geolocation.getCurrentPosition(( {coords : {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude});
        })
    }, []);


    // // useEffect runs everytime [coordinates, bounds] change
    useEffect (() => {
        // set loading state to true
        setIsLoading(true);

        getPlacesData(bounds.sw, bounds.ne) //passing bounds as parameters
            .then((data) => { //Because getPlacesData is async, we use .then
                setPlaces(data);
                // after fetching data, set loading back to false
                setIsLoading(false);
            });
    }, [coordinates, bounds]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={places}
                        childClicked={childClicked} 
                        isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;