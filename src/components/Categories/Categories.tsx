import { useState } from "react";

const categories :string[]= [
    "Category 7"
    , "Category 8"
    , "Category 8"
    , "Category 9", 
    "Category 10", 
    "Category 11",
     "Category 12"

];

const Categories = () => {
    const [startIndex, setStartIndex] = useState<number>(0);
    const itemsPerPage = 6;

    const nextSlide = (): void => {
        if (startIndex + itemsPerPage < categories.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const prevSlide = (): void =>  {
        if (startIndex - itemsPerPage >= 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    return (
        <div className="flex flex-col mt-10">
            <div className="flex flex-row items-center gap-4 mb-5">
                <img src="../../../src/assets/Rectangle 18 (1).svg" alt="header" />
                <h2 className="text-primary text-base font-semibold">Categories</h2>
            </div>
            <div className="flex flex-row justify-between mb-5">
                <h3 className="text-4xl font-semibold">Browse By Category</h3>
                <div className="flex flex-row gap-2">
                    {/* Left Arrow */}
                    <img 
                        src="../../../src/assets/Fill With Left Arrow (1).svg" 
                        width="50%"
                        className={`btn btn-ghost btn-circle ${startIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        alt="left"
                        onClick={prevSlide}
                    />
                    {/* Right Arrow */}
                    <img 
                        src="../../../src/assets/Fill With Right Arrow (1).svg" 
                        width="50%"
                        className={`btn btn-ghost btn-circle ${(startIndex + itemsPerPage >= categories.length) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        alt="right"
                        onClick={nextSlide}
                    />
                </div>
            </div>
            <div className="items-center grid grid-cols-3 md:grid-cols-6 gap-4">
                {categories.slice(startIndex, startIndex + itemsPerPage).map((category, index) => (
                    <div key={index} className="p-4 border rounded-md text-center">
                        {category}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
