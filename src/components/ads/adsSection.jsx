import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {ads} from "../../constants/index"
import "./ads.css"
/**
 * @module RenderAds
 * @returns {JSX}
 */
export const Ads = () => {
    return (
        <div className='ads-sections'>
            {
                ads.map(ad => (<Card className="" sx={{ minWidth: 275, maxWidth:300 }}>
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
