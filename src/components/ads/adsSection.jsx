import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {ads} from "../../constants/index"
import "./ads.css"
export const Ads = () => {
    return (
        <div className='ads-sections'>
            {
                ads.map(ad => (<Card className="" sx={{ minWidth: 275 }}>
                    <CardContent>
                        <div className='ad-title'>{ad.title}</div>
                        <div className=''>
                            {ad.body}
                        </div>
                    </CardContent>
                </Card>))
            }
        </div>
    );
};
