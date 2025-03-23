import { CarouselComponent } from "../components/Carousel/CarouselComponent";
import Categories from "../components/Categories/Categories";

const Home = () => {
    return (
      <div className="wrapper">
       <CarouselComponent/>
       <Categories/>
      </div>
    );
}

export default Home;
