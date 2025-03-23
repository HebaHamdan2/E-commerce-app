import { CarouselComponent } from "../components/Carousel/CarouselComponent";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";

const Home = () => {
    return (
      <div className="wrapper">
       <CarouselComponent/>
       <Categories/>
       <Products/>
      </div>
    );
}

export default Home;
