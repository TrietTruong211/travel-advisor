import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';
// { setCoordinates, setBounds, coordinates}
const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');
    

    // const coordinates = { lat: 20, lng: 20 };

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDFNYpV3X13qBZTN9i-o4UXR1Zpq5arf4M' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={50, 50, 50, 50}
                options={''}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng});
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                // Get the child clicked through parameter then send it through setChilClicked funtion from props, send to app.js
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div 
                        className={classes.markerContainer} 
                        lat={Number(place.latitude)} //setting position of this div to be at this lat and lng
                        lng={Number(place.longitude)} //possible thanks to googlemap react
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="larger"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>

        </div>
    );
}

export default Map;