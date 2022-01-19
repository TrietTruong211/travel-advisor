import React, { useState } from 'react';
import { useEffect, createRef } from 'react'; //for scrolling the list when clicked on map
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'; //circularprogress is used for loading

import PlaceDetails from '../PlaceDetails/PlaceDetails'

import useStyles from './styles.js'
// {places}
const List = ({places, childClicked, isLoading}) => {
    const classes = useStyles();
    const [type, setType] = useState('restaurants'); //restaurants is the default value for type, type = state, setType = function that modifies the state
    const [rating, setRating] = useState(''); 

    // use log on {childClicked} will give more info than childcliked alone
    // console.log({childClicked});


    //for scrolling the list when clicked on map
    const [elRefs, setElRefs] = useState([]); // element references, initialy empty array
    // call this useEffect everytime places change
    useEffect(() => {
        // Creating a ref for each place, we start by creating an array with a same length as places
        // Filling the array, then map over it
        // map(_,i) underscore is used when you're not intereted in the first parameter but need the second one
        // Access and return elRefs[i], reference to that place, or if not exist, create a new ref
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

        setElRefs(refs);
    }, [places]);

    return (
        <div className = {classes.container}>
            <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
            {/* if it's loading, show loading circle, otherwise show everything else */}
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                // Wrap everything in a single react fragment
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        {/* e is event, if clicked e.target populate the value of type */}
                        <Select value={type} onChange={(e) => setType(e.target.value)}> 
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}> 
                            <MenuItem value="0">All</MenuItem>
                            <MenuItem value="3">Above 3.0</MenuItem>
                            <MenuItem value="4">Above 4.0</MenuItem>
                            <MenuItem value="4.5">Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {/* places? = only when you have places, only then start mapping place to i (index) */}
                        {/* Map function always has 2 parameters */}
                        {places?.map((place, i) => (
                            // For each place, return a grid item
                            // key = {i} is not a good practice if you're going to delete item from the list
                            // xs = {12} means full width of the container
                            // Each place has a ref, so we can scroll the list to this ref
                            <Grid ref={elRefs[i]} item key={i} xs={12}> 
                                <PlaceDetails 
                                    place={place}
                                    selected={Number(childClicked) === i} //if this placedetails has been selected, it's a string so convert to number
                                    refProp={elRefs[i]} //passing the refProp to the placedetails
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
}

export default List;