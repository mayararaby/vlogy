import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export const PostCard = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    // return (
    //     <Card sx={{ minWidth: 275, width: '100%', maxHeight: isExpanded ? 'none' : '150px', overflow: 'hidden' }}>
    //         <CardHeader title={post.title} />
    //         <CardContent>
    //             <Typography variant="body2" sx={{ color: 'text.secondary', height: isExpanded ? 'auto' : '80px', overflow: 'hidden' }}>
    //                 {post.body}
    //             </Typography>
    //             {!isExpanded && (
    //                 <Button onClick={toggleExpand} sx={{ mt: 1 }}>
    //                     Read More
    //                 </Button>
    //             )}
    //             {isExpanded && (
    //                 <Button onClick={toggleExpand} sx={{ mt: 1 }}>
    //                     Show Less
    //                 </Button>
    //             )}
    //         </CardContent>
    //     </Card>
    // );
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };
    return (
        <Card sx={{ minWidth: 275, width: '100%', maxWidth: 1000 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {post.title}
                </Typography>

                <Typography variant="h6" component="div">
                    {isExpanded ? post.body : post.body.slice(0, 20) + "..."}
                </Typography>
            </CardContent>
            <CardActions>
                
                {isExpanded? <Button size="small" onClick={toggleExpand} >Read Less</Button>:
               <Button size="small" onClick={toggleExpand} >Read More</Button>}

            </CardActions>
        </Card>
    );
};
