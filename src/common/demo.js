// import React from 'react';

// import { usePlacesWidget } from "react-google-autocomplete";

// export default function SearchLocationInput(){
//   const { ref } = usePlacesWidget({
//     apiKey: 'AIzaSyDMWmv0f93yIsepr4PqAVC8Yts5yzOnLd4',
//     onPlaceSelected: (place) => {
//       console.log(place);
//     },
//     // options: {
//     //   types: ["(regions)"],
//      // componentRestrictions: { country: "ru"},
//     //},
//   });

//   return (
//   <div className="box_form">
//     <div className="box_form">
//     <div className="box_form">
//   <input ref={ref} style={{ width: "20%" }} defaultValue="india" />
//   </div>
//   </div>
//   </div>
//   )
// };

// import React from "react";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import  { useState } from "react";
// import Checkbox from "@material-ui/core/Checkbox";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import { MenuProps, useStyles, options } from "./utils";

// export default function SearchLocationInput() {
//   const classes = useStyles();
//   const [selected, setSelected] = useState([]);
//   const isAllSelected =
//     options.length > 0 && selected.length === options.length;

//   const handleChange = (event) => {
//     const value = event.target.value;
//     if (value[value.length - 1] === "all") {
//       setSelected(selected.length === options.length ? [] : options);
//       return;
//     }
//     setSelected(value);
//   };

//   return (
//     <div className="box_form">
//    <div className="box_form">
//     <FormControl className={classes.formControl}>
//       <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
//       <Select
//         labelId="mutiple-select-label"
//         multiple
//         value={selected}
//         onChange={handleChange}
//         renderValue={(selected) => selected.join(", ")}
//         MenuProps={MenuProps}
//       >
//         <MenuItem
//           value="all"
//           classes={{
//             root: isAllSelected ? classes.selectedAll : ""
//           }}
//         >
//           <ListItemIcon>
//             <Checkbox
//               classes={{ indeterminate: classes.indeterminateColor }}
//               checked={isAllSelected}
//               indeterminate={
//                 selected.length > 0 && selected.length < options.length
//               }
//             />
//           </ListItemIcon>
//           <ListItemText
//             classes={{ primary: classes.selectAllText }}
//             primary="Select All"
//           />
//         </MenuItem>
//         {options.map((option) => (
//           <MenuItem key={option} value={option}>
//             <ListItemIcon>
//               <Checkbox checked={selected.indexOf(option) > -1} />
//             </ListItemIcon>
//             <ListItemText primary={option} />
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//     </div>
//     </div>
//   );
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  // return (
  //   <div>
  //     <div className="box_form">
  //   <div className="box_form">
  //     <FormControl variant="outlined">
  //       <InputLabel>Age</InputLabel>
  //       <Select
  //         id="demo-simple-select-outlined"
  //         value={age}
  //         onChange={handleChange}
  //         label="Age"
  //       >
  //         <MenuItem value="">
  //           <em>None</em>
  //         </MenuItem>
  //         <MenuItem value={10}>Ten</MenuItem>
  //         <MenuItem value={20}>Twenty</MenuItem>
  //         <MenuItem value={30}>Thirty</MenuItem>
  //       </Select>
  //     </FormControl>
  //     </div>
  //     </div>
  //   </div>
  // );
// }

// import React, { useState } from "react";
// import { Modal, Button} from "react-bootstrap";
// import {AddClinic} from "./addclinic"


// export default function SearchLocationInput() {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const onLoginFormSubmit = (e) => {
//     e.preventDefault();
//     handleClose();
//   };

//   return (
//     <>
//       <div
//         className="d-flex align-items-center justify-content-center"
//         style={{ height: "100vh" }}
//       >
//         <Button variant="primary" onClick={handleShow}>
//           Add Cliniv
//         </Button>
//       </div>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add As Owned Clinic</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <AddClinic onSubmit={onLoginFormSubmit} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close 
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

import React, { useState } from 'react';

const Demo = () => {

   const [name, setName] = useState('');
   const [pwd, setPwd] = useState('');

   const handle = () => {
      localStorage.setItem('Name', name);
      localStorage.setItem('Password', pwd);
   };
   const remove = () => {
      localStorage.removeItem('Name');
      localStorage.removeItem('Password');
   };

  return (
      <div className="App">
         <h1>Name of the user:</h1>
         <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
         />
         <div>
            <button onClick={handle}>Done</button>
         </div>
         {localStorage.getItem('Name') && (
            <div>
               Name: <p>{localStorage.getItem('Name')}</p>
            </div>
         )}
         {localStorage.getItem('Password') && (
            <div>
               Password: <p>{localStorage.getItem('Password')}</p>
            </div>
         )}
         <div>
            <button onClick={remove}>Remove</button>
         </div>
      </div>
   );
};
export default Demo;

