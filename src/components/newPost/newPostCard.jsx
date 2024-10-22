import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export const NewPost = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };
    return (
        <Card sx={{ minWidth: 275, width: '100%' }}>
            <CardContent>
                <Typography variant="h4" component="div">
                    New Post
                </Typography>

                <div>
                    <textarea
                        className='add-post-input'
                        value={text}
                        onChange={handleChange}
                        placeholder="Type something... 😊"
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={{backgroundColor:"#978695",padding:"16px"}} startIcon={<AddIcon />}>
                    Add
                </Button>
            </CardActions>
        </Card>
    );
}