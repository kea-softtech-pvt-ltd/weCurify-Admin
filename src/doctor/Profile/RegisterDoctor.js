import { API } from "../../config";
import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import { handleSelect } from '../googlemap';
import { useForm } from "react-hook-form";
import { StyledRadio } from "../radiobutton";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from "react-router-dom";
//not using
export default function RegisterDoctor() {
    let navigate = useNavigate();
    let { doctorId } = useParams();
    //insert
    const [input, setInput] = useState({});

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const updateData = {
            name: data.name,
            lname: data.lname,
            specialization: data.specialization,
            address: data.address,
            email: data.email,
        }
        axios.post(`${API}/update/${doctorId}`, updateData)
        navigate(`edit`);
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    //for google map api autocomplete
    function handleChangeAddress(address) {
        setInput(prevInput => {
            return {
                ...prevInput,
                ['address']: address,
            }
        })
    }

    return (
        <div>
            <main>
                <div id="hero_register">
                    <div className="container margin_120_95">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1>It's time to find you!</h1>
                                <div className="lead">Te pri adhuc simul. No eros errem mea. Diam mandamus has ad. Invenire senserit ad has, has ei quis iudico, ad mei nonumes periculis.</div>
                                <div className="box_feat_2">
                                    <i className="pe-7s-map-2"></i>
                                    <h3>Let patients to Find you!</h3>
                                    <div>Ut nam graece accumsan cotidieque. Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet.</div>
                                </div>
                                <div className="box_feat_2">
                                    <i className="pe-7s-date"></i>
                                    <h3>Easly manage Bookings</h3>
                                    <div>Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet. Eum no atqui putant democritum, velit nusquam sententiae vis no.</div>
                                </div>
                                <div className="box_feat_2">
                                    <i className="pe-7s-phone"></i>
                                    <h3>Instantly via Mobile</h3>
                                    <div>Eos eu epicuri eleifend suavitate, te primis placerat suavitate his. Nam ut dico intellegat reprehendunt, everti audiam diceret in pri, id has clita consequat suscipiantur.</div>
                                </div>
                            </div>

                            <div className="col-lg-5 ml-auto">
                                <div className="box_form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="name" onInput={handleChange} value={input.name} placeholder="Name" {...register("name", { required: true })} />
                                                    {errors.name && <span className="validation">Please enter your first name</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="lname" onInput={handleChange} value={input.lname} placeholder="Last Name" {...register("lname", { required: true })} />
                                                    {errors.lname && <span className="validation">Please enter your last name</span>}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label><b>Gender</b></label>
                                        </div> */}
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col-6">
                                                    <FormControl component="fieldset">
                                                        <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios" {...register("gender", { required: true })}>
                                                            <FormControlLabel name="gender" value="female" onInput={handleChange} control={<StyledRadio />} label="Female" />
                                                            <FormControlLabel name="gender" value="male" onInput={handleChange} control={<StyledRadio />} label="Male" />
                                                            <FormControlLabel name="gender" value="other" onInput={handleChange} control={<StyledRadio />} label="Other" />
                                                        </RadioGroup>
                                                        {errors.gender && <span className="validation">Please Select your gender</span>}
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" onInput={handleChange} name="specialization" value={input.specialization} placeholder="Specialization" {...register("specialization", { required: true })} />
                                                    {errors.specialization && <span className="validation">Please enter your specialization </span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group" >
                                                    <PlacesAutocomplete
                                                        value={input.address}
                                                        onChange={handleChangeAddress}
                                                    >
                                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                            <div {...register("address", { required: true })}>
                                                                <input
                                                                    onSelect={handleSelect}
                                                                    {...getInputProps({
                                                                        placeholder: 'Search Places......',
                                                                        className: "form-control",
                                                                        name: "address"
                                                                    })} />
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
                                                    {errors.address && <span className="validation">Please enter location</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" onInput={handleChange} name="mobile" value={input.mobile} placeholder="Mobile Phone" {...register("mobile", {
                                                        required: true, maxLength: {
                                                            value: 10
                                                        }
                                                    })} />
                                                    {errors.mobile && <span className="validation">Please enter your  mobile Number</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" onInput={handleChange} name="email" value={input.email} placeholder="Email Address" {...register("email", { required: true })} />
                                                    {errors.email && <span className="validation">Please enter your email Address</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center add_top_30"><input type="submit" className="btn_1" value="Submit" /></div>
                                        <div className="text-center"><small>Ut nam graece accumsan cotidieque. Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet.</small></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}