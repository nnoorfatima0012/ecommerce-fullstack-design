//client/src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Breadcrumb from "../components/products/Breadcrumb";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductListTopBar from "../components/products/ProductListTopBar";
import ProductListCard from "../components/products/ProductListCard";
import ProductGridCard from "../components/products/ProductGridCard";
import ProductPagination from "../components/products/ProductPagination";
import MobileProductTop from "../components/products/MobileProductTop";
import API from "../api/api";
function ProductList() {
  const [searchParams] = useSearchParams();

  const urlCategory = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const deal = searchParams.get("deal") || "";
  const featured = searchParams.get("featured") || "";
  const recommended = searchParams.get("recommended") || "";
  const hotOffer = searchParams.get("hotOffer") || "";
  const giftBox = searchParams.get("giftBox") || "";
  const newArrival = searchParams.get("newArrival") || "";
  const topSelling = searchParams.get("topSelling") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    ratings: [5, 4, 3, 2],
    priceRange: { min: 0, max: 0 },
  });

  const [view, setView] = useState("list");
  const [sort, setSort] = useState("featured");

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  });

  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSelectedBrands([]);
    setSelectedRating("");
    setVerifiedOnly(false);
    setMinPrice("");
    setMaxPrice("");
    setPriceFilter({ min: "", max: "" });
  }, [urlCategory]);

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

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const params = new URLSearchParams();

        if (selectedCategory) {
          params.append("category", selectedCategory);
        }
        if (deal) params.append("deal", deal);
        if (featured) params.append("featured", featured);
        if (recommended) params.append("recommended", recommended);
        if (hotOffer) params.append("hotOffer", hotOffer);
        if (giftBox) params.append("giftBox", giftBox);
        if (newArrival) params.append("newArrival", newArrival);
        if (topSelling) params.append("topSelling", topSelling);

        const res = await API.get(
          `/products/filter-options?${params.toString()}`,
        );
        setFilterOptions(res.data.data);
      } catch (err) {
        console.log("Failed to load filter options");
      }
    };

    fetchFilterOptions();
  }, [selectedCategory]);

  useEffect(
    () => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          setError("");

          const params = new URLSearchParams();

          if (sort && sort !== "featured") params.append("sort", sort);
          if (selectedCategory) params.append("category", selectedCategory);
          if (priceFilter.min) params.append("minPrice", priceFilter.min);
          if (priceFilter.max) params.append("maxPrice", priceFilter.max);
          if (search) params.append("search", search);
          if (selectedBrands.length > 0) {
            params.append("brand", selectedBrands.join(","));
          }

          // if (selectedRating) params.append("rating", selectedRating);
          // if (verifiedOnly) params.append("verified", "true");
          // params.append("page", page);
          // params.append("limit", limit);

          if (selectedRating) params.append("rating", selectedRating);
          if (verifiedOnly) params.append("verified", "true");

          if (deal) params.append("deal", deal);
          if (featured) params.append("featured", featured);
          if (recommended) params.append("recommended", recommended);
          if (hotOffer) params.append("hotOffer", hotOffer);
          if (giftBox) params.append("giftBox", giftBox);
          if (newArrival) params.append("newArrival", newArrival);
          if (topSelling) params.append("topSelling", topSelling);

          params.append("page", page);
          params.append("limit", limit);

          const res = await API.get(`/products?${params.toString()}`);
          setProducts(res.data.data || []);
          setPagination(
            res.data.pagination || { total: 0, page: 1, limit: 10, pages: 1 },
          );
        } catch (err) {
          setError("Failed to load products.");
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    },
    // [
    //   sort,
    //   selectedCategory,
    //   priceFilter,
    //   search,
    //   selectedBrands,
    //   selectedRating,
    //   verifiedOnly,
    //   page,
    //   limit,
    // ]

    [
      sort,
      selectedCategory,
      priceFilter,
      search,
      selectedBrands,
      selectedRating,
      verifiedOnly,
      deal,
      featured,
      recommended,
      hotOffer,
      giftBox,
      newArrival,
      topSelling,
      page,
      limit,
    ],
  );

  const resetPageToOne = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    navigate(`/products/list?${params.toString()}`);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand],
    );

    resetPageToOne();
  };

  // const applyPriceFilter = () => {
  //   setPriceFilter({
  //     min: minPrice,
  //     max: maxPrice,
  //   });
  // };
  const applyPriceFilter = () => {
    setPriceFilter({
      min: minPrice,
      max: maxPrice,
    });

    resetPageToOne();
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setSelectedRating("");
    setVerifiedOnly(false);
    setMinPrice("");
    setMaxPrice("");
    setPriceFilter({ min: "", max: "" });
    setSort("featured");
    resetPageToOne();
  };

  // const removeBrandFilter = (brand) => {
  //   setSelectedBrands((prev) => prev.filter((item) => item !== brand));
  // };

  const removeBrandFilter = (brand) => {
    setSelectedBrands((prev) => prev.filter((item) => item !== brand));
    resetPageToOne();
  };
  const selectedCategoryName =
    categories.find((cat) => cat._id === selectedCategory)?.name || "";

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    navigate(`/products/list?${params.toString()}`);
  };

  const handleLimitChange = (newLimit) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit);
    params.set("page", 1);
    navigate(`/products/list?${params.toString()}`);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    const params = new URLSearchParams(searchParams);

    // remove navbar/special section filters when user chooses a category
    params.delete("hotOffer");
    params.delete("giftBox");
    params.delete("deal");
    params.delete("featured");
    params.delete("recommended");
    params.delete("newArrival");
    params.delete("topSelling");

    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    params.set("page", 1);

    navigate(`/products/list?${params.toString()}`);
  };

  const getPageTitle = () => {
    if (search) return `Search: ${search}`;
    if (selectedCategoryName) return selectedCategoryName;
    if (hotOffer === "true") return "Hot offers";
    if (giftBox === "true") return "Gift boxes";
    if (deal === "true") return "Deals and offers";
    if (featured === "true") return "Featured products";
    if (recommended === "true") return "Recommended items";
    if (newArrival === "true") return "New arrivals";
    if (topSelling === "true") return "Top selling";

    return "Products";
  };

  return (
    <div className="bg-[#f7fafc] min-h-screen pb-10">
      <div className="hidden md:block">
        <Header />
        <Navbar />
      </div>

      <MobileProductTop />

      <main className="max-w-[1180px] mx-auto px-3 md:px-4 py-3 md:py-5">
        <div className="hidden md:block">
          <Breadcrumb
            categoryId={selectedCategory}
            categoryName={selectedCategoryName}
            search={search}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
          {/* <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            filterOptions={filterOptions}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={setVerifiedOnly}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            applyPriceFilter={applyPriceFilter}
            clearFilters={clearFilters}
          /> */}

          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            filterOptions={filterOptions}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            selectedRating={selectedRating}
            setSelectedRating={(value) => {
              setSelectedRating(value);
              resetPageToOne();
            }}
            verifiedOnly={verifiedOnly}
            setVerifiedOnly={(value) => {
              setVerifiedOnly(value);
              resetPageToOne();
            }}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            applyPriceFilter={applyPriceFilter}
            clearFilters={clearFilters}
          />

          <section>
            <div className="hidden md:block">
              <ProductListTopBar
                view={view}
                setView={setView}
                productsCount={pagination.total}
                sort={sort}
                setSort={(value) => {
                  setSort(value);
                  resetPageToOne();
                }}
                verifiedOnly={verifiedOnly}
                setVerifiedOnly={(value) => {
                  setVerifiedOnly(value);
                  resetPageToOne();
                }}
                title={getPageTitle()}
              />
            </div>

            {(selectedBrands.length > 0 ||
              selectedRating ||
              verifiedOnly ||
              priceFilter.min ||
              priceFilter.max) && (
              <div className="bg-white border border-gray-200 rounded-md mb-3 px-3 py-2 flex flex-wrap items-center gap-2">
                {selectedBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => removeBrandFilter(brand)}
                    className="border border-blue-300 text-blue-600 rounded-md px-3 py-1 text-sm"
                  >
                    {brand} ×
                  </button>
                ))}

                {selectedRating && (
                  <button
                    onClick={() => {
                      setSelectedRating("");
                      resetPageToOne();
                    }}
                    className="border border-blue-300 text-blue-600 rounded-md px-3 py-1 text-sm"
                  >
                    {selectedRating}+ star ×
                  </button>
                )}

                {verifiedOnly && (
                  <button
                    onClick={() => {
                      setVerifiedOnly(false);
                      resetPageToOne();
                    }}
                    className="border border-blue-300 text-blue-600 rounded-md px-3 py-1 text-sm"
                  >
                    Verified only ×
                  </button>
                )}

                {(priceFilter.min || priceFilter.max) && (
                  <button
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                      setPriceFilter({ min: "", max: "" });
                      resetPageToOne();
                    }}
                    className="border border-blue-300 text-blue-600 rounded-md px-3 py-1 text-sm"
                  >
                    Price {priceFilter.min || 0} - {priceFilter.max || "∞"} ×
                  </button>
                )}

                <button
                  onClick={clearFilters}
                  className="text-blue-600 text-sm ml-2"
                >
                  Clear all filter
                </button>
              </div>
            )}

            {loading && (
              <div className="bg-white border rounded-md p-6 text-center text-gray-500">
                Loading products...
              </div>
            )}

            {error && (
              <div className="bg-white border rounded-md p-6 text-center text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="bg-white border rounded-md p-6 text-center text-gray-500">
                No products found.
              </div>
            )}

            {!loading && !error && products.length > 0 && view === "list" && (
              <div className="space-y-2 md:space-y-3">
                {products.map((product) => (
                  <ProductListCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {!loading && !error && products.length > 0 && view === "grid" && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {products.map((product) => (
                  <ProductGridCard key={product._id} product={product} />
                ))}
              </div>
            )}

            <div className="hidden md:block">
              <ProductPagination
                page={pagination.page}
                pages={pagination.pages}
                limit={pagination.limit}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              />
            </div>
          </section>
        </div>
      </main>

      <div className="hidden md:block">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}

export default ProductList;
