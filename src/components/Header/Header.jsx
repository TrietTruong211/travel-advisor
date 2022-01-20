import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles.js'

const Header = ({setCoordinates}) => {
    // Calling a hook
    const classes = useStyles();

    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autoC) => {
        setAutocomplete(autoC);
    }

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat(); //on google map documentation
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng })
    }

    return (
        // <h1>Header</h1>
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                {/* typography is all text element, we choose which one by selecting variant */}
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                {/* box is a div, but we can choose the style */}
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                    </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;