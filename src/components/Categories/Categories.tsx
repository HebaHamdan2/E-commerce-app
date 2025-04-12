import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../types/categoryTypys";
import { useGetCategoriesQuery } from "../../features/api/categoryApi";

const itemsPerPage = 6;

const Categories = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState<number>(0);

  const { data, isLoading, isError } = useGetCategoriesQuery({ page: 1, limit: 12 });

  const allcatg: Category[] = data?.categories || [];

  const nextSlide = (): void => {
    if (startIndex + itemsPerPage < allcatg.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = (): void => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleCategory = (categoryId: string): void => {
    navigate(`/products/${categoryId}`);
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row items-center gap-4 mb-5">
        <img src="/assets/Rectangle 18 (1).svg" alt="header" />
        <h2 className="text-primary text-base font-semibold">Categories</h2>
      </div>
      <div className="flex flex-row justify-between mb-5">
        <h3 className="text-4xl font-semibold">Browse By Category</h3>
        <div className="flex flex-row gap-2">
          <img
            src="/assets/Fill With Left Arrow (1).svg"
            width="50%"
            className={`btn btn-ghost btn-circle ${startIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            alt="left"
            onClick={prevSlide}
          />
          <img
            src="/assets/Fill With Right Arrow (1).svg"
            width="50%"
            className={`btn btn-ghost btn-circle ${(startIndex + itemsPerPage >= allcatg.length) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            alt="right"
            onClick={nextSlide}
          />
        </div>
      </div>
      <div className="items-center grid grid-cols-3 md:grid-cols-6 gap-4">
        {allcatg.slice(startIndex, startIndex + itemsPerPage).map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded-md text-center cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
            onClick={() => handleCategory(category._id)}
          >
            <img src={category.image} alt={category.name} className="w-16 h-16 mx-auto mb-2" />
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
