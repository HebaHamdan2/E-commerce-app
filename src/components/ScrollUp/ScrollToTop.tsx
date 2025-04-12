import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-red-800 transition"
        >
          <img
            src="/assets/Fill with Up Arrow.svg"
            alt="Scroll to top"
            className="w-6 h-6"  
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
