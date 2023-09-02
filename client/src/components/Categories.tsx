import { Autocomplete, TextField } from '@mui/material';
import { styled, lighten, darken } from '@mui/system';
import { useContext } from 'react';
import { AllCardsContext } from '../context/Cards';
import { useCategories } from '../hooks/useCategories';
import { isTextExist } from '../utils/helpers';

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
        theme.palette.mode === 'light'
            ? lighten(theme.palette.primary.light, 0.85)
            : darken(theme.palette.primary.main, 0.8)
}));

const GroupItems = styled('ul')({ padding: 0 });

export default function Categories() {
    const { categoryFilter, cardsFiltered } = useContext(AllCardsContext)
    const { categories, changeCategory } = useCategories()

    function onChangeFunc(event: React.ChangeEvent<{}>, newValue: any) {
        changeCategory(event, newValue)
        categoryFilter(event, newValue)
    }

    return (
        <Autocomplete
            id="categories"
            value={categories}
            disabled={isTextExist('searchField')}
            onChange={onChangeFunc}
            options={cardsFiltered().sort((a, b) => -b.city.localeCompare(a.city))}
            groupBy={(option) => option.city}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Sort by city" />}
            renderGroup={(params) => (
                <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
        />
    );
}

