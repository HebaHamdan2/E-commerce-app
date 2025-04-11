import { CarouselComponent } from "../components/Carousel/CarouselComponent";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import ScrollToTop from "../components/ScrollUp/ScrollToTop";

const Home = () => {
    return (
      <div className="wrapper">
        <ScrollToTop/>
       <CarouselComponent/>
       <Categories/>
       <Products/>
      </div>
    );
}

export default Home;
