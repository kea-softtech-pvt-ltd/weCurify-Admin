// import React, { useState } from 'react';
// import axios from 'axios';

// const User = () => {
//     const [newUser, setNewUser] = useState(
//         {
//             birthdate: '',
//             photo: '',
//         }
//     );

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('photo', newUser.photo);
//         formData.append('birthdate', newUser.birthdate);

//         axios.post('add/', formData)
//              .then(res => {
//                 console.log(res);
//              })
//              .catch(err => {
//                 console.log(err);
//              });
//     }

//     const handleChange = (e) => {
//         setNewUser({...newUser, [e.target.name]: e.target.value});
//     }

//     const handlePhoto = (e) => {
//         setNewUser({...newUser, photo: e.target.files[0]});
//     }

//     return (
//         <div className="box_form">
//         <div className="box_form">
//         <form onSubmit={handleSubmit} encType='multipart/form-data'>
//             <input 
//                 type="file" 
//                 accept=".png, .jpg, .jpeg"
//                 name="photo"
//                 onChange={handlePhoto}
//             />

//             <input 
//                 type="date"
//                 name="birthdate"
//                 value={newUser.date}
//                 onChange={handleChange}
//             />

//             <input 
//                 type="submit"
//             />
//         </form>
//         </div>
//         </div>
//     );
// }

// export default User;
import React from 'react';
import { Card } from '@mui/material';
import {  makeStyles } from '@mui/styles';

export default function CarouselSlide(props) {
    const { backgroundColor, title } = props.content;

    const useStyles = makeStyles(() => ({
        card: {
            backgroundColor,
            borderRadius: 5,
            padding: '75px 50px',
            margin: '0px 25px',
            width: '500px',
            boxShadow: '20px 20px 20px black',
            display: 'flex',
            justifyContent: 'center',
        }
    }));

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <h1>{title}</h1>
        </Card>
    );
}