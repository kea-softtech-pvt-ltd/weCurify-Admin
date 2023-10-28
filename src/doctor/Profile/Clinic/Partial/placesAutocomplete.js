import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { handleSelect } from '../../../../common/googlemap';

const PlacesAutocompleteInput = (props) =>{
    return(
        <div className="form-group">
        <label>{props.children}</label>
            <PlacesAutocomplete 
                value={props.value}
                onChange={props.onChange}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    onSelect={handleSelect}
                    {...getInputProps({
                        placeholder: 'Search Places......',
                        className:"form-control",
                        name: "address"
                    })}/>
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            key={suggestion.description}
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
            )}
            </PlacesAutocomplete>
        </div>    
    )
}
export {PlacesAutocompleteInput}