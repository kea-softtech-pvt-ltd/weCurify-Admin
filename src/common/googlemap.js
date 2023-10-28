import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

//for google map api autocomplete    
const handleSelect=(address)=> {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  }
 
export {handleSelect }
