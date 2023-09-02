import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { ChangeEvent, useContext } from 'react';
import { AllCardsContext, CardsContext, FavoriteContext } from '../context/Cards';
import { LoginInfoContext } from '../context/LoginInfo';
import { useSearch } from '../hooks/useSearch';
import { isTextExist } from '../utils/helpers';

const SearchInput = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': { width: '20ch' }
        }
    }
}));

function Search() {
    const { searchDefaultCards } = useContext(AllCardsContext)
    const { searchData } = useContext(CardsContext)
    const { searchFavorite } = useContext(FavoriteContext)
    const { loginInfo } = useContext(LoginInfoContext)
    const { business, logged } = loginInfo
    const { searchValue, changeSearch } = useSearch()

    function searchCards(e: ChangeEvent<HTMLInputElement>) {
        searchDefaultCards(e)
        business && searchData(e)
        logged && searchFavorite(e)
    }

    return (
        <SearchInput onChange={searchCards} >
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                value={searchValue}
                disabled={isTextExist('category')}
                onChange={changeSearch}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </SearchInput>
    );
}

export default Search;