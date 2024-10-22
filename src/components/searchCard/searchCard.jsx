import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

export const SearchCard = ({ searchOptions, setSearchOptions }) => {

    const handleChange = (event) => {
        const { name, value } = event.target
        setSearchOptions((prev) => ({ ...prev, [name]: value }));
    }


    return (
        <Card sx={{ minWidth: 275 }}>
            <Typography  className="pl-7 py-5"variant="h5" component="div">
                Search
            </Typography>
            <CardContent>
                <div>
                    <input type='text' name='title' value={searchOptions.title} placeholder='Title' className='add-post-input add-post-heading ' onChange={handleChange} />
                    <textarea
                        name='body'
                        className='add-post-input'
                        value={searchOptions.body}
                        onChange={handleChange}
                        placeholder="Body"
                    />
                </div>

            </CardContent>


        </Card>
    );
};
