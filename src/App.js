import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import {getPlacesData, getWeatherData} from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map'


const App = () => {
    // get and display places
    const [places, setPlaces] = useState([]); //expecting array, hence [], initial value
    const [weatherData, setWeatherData] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    // get coordinates from map
    // {lat: 0, lng: 0}
    const [coordinates, setCoordinates] = useState({}); //expecting an object, hence {}, initial value 0,0

    // get bounds from map
    const [bounds, setBounds] = useState({})

    // get child clicked from map to pass it to list
    const [childClicked, setChildClicked] = useState(null)

    // Initialize loading state to false
    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState('restaurants'); //restaurants is the default value for type, type = state, setType = function that modifies the state
    const [rating, setRating] = useState(''); 

    // useEffect( call back function, dependency array), if leave array empty, the codes only happen at the start of the application
    useEffect(() => {
        //Use browser built in geolocation api
        navigator.geolocation.getCurrentPosition(( {coords : {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);


    // useEffect runs everytime [coordinates, bounds] change
    useEffect (() => {
        if (bounds.sw && bounds.ne) {
            // set loading state to true
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => {
                    setWeatherData(data)
                })
    
            getPlacesData(type, bounds.sw, bounds.ne) //passing bounds as parameters
                .then((data) => { //Because getPlacesData is async, we use .then
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)); // filter out dummy places with no names
                    setFilteredPlaces([]);
                    // after fetching data, set loading back to false
                    setIsLoading(false);
                });
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header 
                setCoordinates={setCoordinates}
            />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked} 
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;