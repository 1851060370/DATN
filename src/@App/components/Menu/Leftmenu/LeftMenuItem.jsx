import React from 'react';
import {useMatches, useNavigate} from 'react-router-dom'
import { Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';

const isMenuSelected = (matches = [], item) => {
	return matches.find(i => i.pathname === item?.path) ?? null
}

const LeftMenuItem = ({ item }) => {
    const navigate = useNavigate()
    const matches = useMatches()
	const match = isMenuSelected(matches, item)

    return (
        <>
            <ListItem disablePadding selected={Boolean(match)} onClick={() => navigate(item?.path)}>
                <ListItemButton>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    );
};

export default LeftMenuItem;
