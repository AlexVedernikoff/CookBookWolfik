import { useDispatch, useSelector } from 'react-redux';

import { setFilters } from '../../store/userSlice';

import classes from './FilterRecipes.module.scss';

const FilterRecipes = () => {
    const dispath = useDispatch();

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };

    const Filters = ({ labelTxt, id }) => {
        const { filters } = useStateUser();
        const newFilters = { ...filters };
        return (
            <div>
                <input
                    type={'checkbox'}
                    id={id}
                    className={classes['checkbox']}
                    defaultChecked={filters[id]}
                    onChange={(event) => {
                        newFilters[event.target.id] = !filters[event.target.id];
                        dispath(
                            setFilters({
                                filters: newFilters
                            })
                        );
                    }}
                />
                <label htmlFor={id}>{labelTxt}</label>
            </div>
        );
    };

    return (
        <div className={classes['filters']}>
            <h3>Фильтр по сложности приготовления</h3>
            <form>
                <Filters id="lite" labelTxt={'Легкий'} />
                <Filters id="hard" labelTxt={'Сложный'} />
            </form>
        </div>
    );
};

export default FilterRecipes;