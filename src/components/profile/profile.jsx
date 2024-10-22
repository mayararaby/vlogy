import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import profile from "../../assets/profile.jpg"
import "./index.css"
export const Profile = () => {

    return (
        <>
            <Card className="" sx={{ minWidth: 275 }}>
                <CardContent className='profile-container'>
                    <img className='profile-image' src={profile} alt='profile' />
                    <div className='profile-name'>Amara Williams</div>
                </CardContent>
            </Card>

        </>
    );
};
