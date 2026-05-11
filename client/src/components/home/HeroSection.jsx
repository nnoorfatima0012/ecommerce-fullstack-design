import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const heroSlides = [
  {
    id: 1,
    smallTitle: "Latest trending",
    title: "Electronic items",
    buttonText: "Learn more",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    categoryName: "Consumer electronics",
  },
  {
    id: 2,
    smallTitle: "Best deals",
    title: "Tools and equipment",
    buttonText: "Shop deals",
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=900&q=80",
    categoryName: "Tools and equipment",
  },
  {
    id: 3,
    smallTitle: "New arrivals",
    title: "Home essentials",
    buttonText: "Explore now",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80",
    categoryName: "Home Essentials",
  },
];

function HeroSection() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleSlideClick = (slide) => {
    const matchedCategory = categories.find(
      (category) =>
        category.name?.toLowerCase() === slide.categoryName.toLowerCase(),
    );

    if (matchedCategory?._id) {
      navigate(`/products/list?category=${matchedCategory._id}`);
    } else {
      navigate("/products/list");
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.log("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/list?category=${categoryId}`);
  };

  return (
    <section className="max-w-[1180px] mx-auto px-4 py-5 max-md:px-3 max-md:py-3">
      <div className="bg-white border border-gray-200 rounded-md p-4 grid grid-cols-1 lg:grid-cols-[250px_1fr_200px] gap-4 max-md:bg-transparent max-md:border-0 max-md:p-0">
        <div className="hidden lg:block">
          {categories.slice(0, 9).map((item, index) => (
            <button
              type="button"
              key={item._id}
              onClick={() => handleCategoryClick(item._id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-[15px] ${
                index === 0
                  ? "bg-blue-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </button>
          ))}

          <button
            type="button"
            onClick={() => navigate("/products/list")}
            className="block w-full text-left px-3 py-2 rounded-md text-[15px] text-gray-700 hover:bg-gray-100"
          >
            More category
          </button>
        </div>
        <div
          onClick={() => handleSlideClick(heroSlides[activeSlide])}
          className="group relative min-h-[250px] max-md:min-h-[205px] cursor-pointer overflow-hidden rounded-sm bg-[#9be3cf] max-md:rounded-md"
        >
          <img
            src={heroSlides[activeSlide].image}
            alt={heroSlides[activeSlide].title}
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#9be3cf] via-[#9be3cf]/80 to-transparent"></div>

          <div className="relative z-10 p-10 max-md:p-6">
            <p className="text-3xl leading-tight text-gray-900 max-md:text-[22px]">
              {heroSlides[activeSlide].smallTitle}
            </p>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 max-md:text-[26px]">
              {heroSlides[activeSlide].title}
            </h2>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSlideClick(heroSlides[activeSlide]);
              }}
              className="mt-6 rounded-md bg-white px-6 py-3 text-base font-medium text-gray-800 shadow-sm transition hover:bg-blue-600 hover:text-white max-md:mt-5 max-md:px-5 max-md:py-2 max-md:text-sm"
            >
              {heroSlides[activeSlide].buttonText}
            </button>
          </div>

          <div className="absolute bottom-4 left-10 z-20 flex gap-2 max-md:left-6">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(index);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index
                    ? "w-7 bg-blue-600"
                    : "w-2.5 bg-white/80 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-3">
          <div className="bg-blue-50 rounded-md p-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-200 flex items-center justify-center text-white font-bold">
                U
              </div>

              <p className="text-[15px] leading-tight text-gray-800">
                Hi, user <br />
                let's get stated
              </p>
            </div>

            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md text-sm">
              Join now
            </button>

            <button className="w-full mt-2 bg-white border border-gray-200 text-blue-600 py-2 rounded-md text-sm">
              Log in
            </button>
          </div>

          <div className="bg-orange-500 text-white rounded-md p-4 min-h-[90px] flex items-center">
            <p className="text-lg leading-tight">
              Get US $10 off <br />
              with a new <br />
              supplier
            </p>
          </div>

          <div className="bg-teal-500 text-white rounded-md p-4 min-h-[90px] flex items-center">
            <p className="text-lg leading-tight">
              Send quotes with <br />
              supplier <br />
              preferences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
