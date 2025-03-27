import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
    const { categoryId } = useParams();
    return (
        <div>
            {categoryId}
        </div>
    );
}

export default CategoryProducts;
