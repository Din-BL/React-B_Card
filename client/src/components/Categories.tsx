import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { getData } from '../utils/localStorage';
import { BusinessCard } from '../utils/types';
import { useContext } from 'react';
import { AllCardsContext } from '../context/Cards';

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
        theme.palette.mode === 'light'
            ? lighten(theme.palette.primary.light, 0.85)
            : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
    padding: 0,
});

export default function Categories() {
    const { categoryFilter } = useContext(AllCardsContext)

    return (
        <Autocomplete
            id="categories"
            onChange={categoryFilter}
            options={storedCards.sort((a, b) => -b.city.localeCompare(a.city))}
            groupBy={(option) => option.city}
            getOptionLabel={(option) => option.title}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Categories" />}
            renderGroup={(params) => (
                <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
        />
    );
}

const storedCards: BusinessCard[] = getData("*defaultCards*")
