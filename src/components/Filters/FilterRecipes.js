import classes from './FilterRecipes.module.scss';

const FilterRecipes = () => {

    const Filters = ({ labelTxt, id }) => (
        <div>
            <input type={'checkbox'} id={id} className={classes['checkbox']} />
            <label htmlFor={id}>{labelTxt}</label>
        </div>

    );

    return (
        <div className={classes['filters']} >
            <h3>Фильтр по сложности приготовления</h3>
            <form>
                <Filters id='lite' labelTxt={'Легкий'} />
                <Filters id='hard' labelTxt={'Сложный'} />
            </form>
        </div> 
    );
};

export default FilterRecipes;