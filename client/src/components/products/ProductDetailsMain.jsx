// // // client/src/components/products/ProductDetailsMain.jsx
// import { useState } from "react";
// import {
//   Heart,
//   ShieldCheck,
//   Truck,
//   MessageCircle,
//   ChevronLeft,
//   ChevronRight,
//   ShoppingCart,
//   User,
// } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import toast from "react-hot-toast";

// const getImageSrc = (image) => {
//   if (!image) return "";
//   if (typeof image === "string") return image;
//   if (image.url) return image.url;
//   return "";
// };

// function ProductDetailsMain({ product }) {
//   const { addToCart, toggleSavedForLater, isSavedForLater } = useCart();

//   const productId = product?._id || product?.id || product?.productId;
//   const saved = isSavedForLater(productId);

//   const images = (product.images?.length ? product.images : [product.image])
//     .map(getImageSrc)
//     .filter(Boolean);

//   const fallbackImage =
//     "https://placehold.co/600x600/e5e7eb/64748b?text=Product";

//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [currentImage, setCurrentImage] = useState(
//     images[0] || getImageSrc(product.image) || fallbackImage
//   );

//   const supplier = product.supplier || {};
//   const shipping = product.shipping || {};
//   const categoryName = product.category?.name || product.category || "N/A";

//   const handleAddToCart = () => {
//     addToCart(product, 1);
//     toast.success("Added to cart");
//   };

//   const handleSaveForLater = () => {
//     toggleSavedForLater(product);
//     toast.success(saved ? "Removed from saved" : "Saved for later");
//   };

//   const handleImageChange = (index) => {
//     setCarouselIndex(index);
//     setCurrentImage(images[index] || fallbackImage);
//   };

//   const prevImage = () => {
//     if (!images.length) return;
//     const newIndex = (carouselIndex - 1 + images.length) % images.length;
//     handleImageChange(newIndex);
//   };

//   const nextImage = () => {
//     if (!images.length) return;
//     const newIndex = (carouselIndex + 1) % images.length;
//     handleImageChange(newIndex);
//   };

//   return (
//     <section className="grid grid-cols-1 gap-0 bg-white sm:gap-5 sm:rounded-md sm:border sm:border-gray-200 sm:p-5 lg:grid-cols-[380px_1fr_280px]">
//       <div className="flex h-[56px] items-center justify-between bg-white px-4 sm:hidden">
//         <ChevronLeft size={24} />
//         <div className="flex items-center gap-5">
//           <ShoppingCart size={22} />
//           <User size={22} />
//         </div>
//       </div>

//       <div>
//         <div className="relative flex h-[305px] items-center justify-center bg-[#f7f7f7] sm:h-[360px] sm:rounded-md sm:border sm:border-gray-200 sm:bg-white">
//           <img
//             src={currentImage}
//             alt={product.title}
//             className="max-h-[260px] object-contain transition-all duration-300 sm:max-h-[320px]"
//             onError={(e) => {
//               e.currentTarget.src = fallbackImage;
//             }}
//           />

//           <div className="absolute bottom-3 right-4 flex gap-3 rounded-full bg-gray-400/80 px-3 py-2 text-white sm:hidden">
//             <button type="button" onClick={prevImage}>
//               <ChevronLeft size={18} />
//             </button>

//             <button type="button" onClick={nextImage}>
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>

//         <div className="mt-3 hidden grid-cols-6 gap-2 sm:grid">
//           {images.map((img, index) => (
//             <button
//               type="button"
//               key={index}
//               onClick={() => handleImageChange(index)}
//               className={`flex h-[55px] cursor-pointer items-center justify-center rounded-md border transition-transform duration-200 ${
//                 currentImage === img
//                   ? "scale-105 border-blue-600"
//                   : "border-gray-200"
//               }`}
//             >
//               <img
//                 src={img}
//                 alt={product.title}
//                 className="h-[45px] object-contain"
//                 onError={(e) => {
//                   e.currentTarget.src = fallbackImage;
//                 }}
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="px-4 py-4 sm:px-0 sm:py-0">
//         <p className="hidden text-[15px] text-green-600 sm:block">
//           {product.inStock ? "✓ In stock" : "Out of stock"}
//         </p>

//         <div className="mt-1 flex items-center gap-2 text-[14px] sm:text-[15px]">
//           <span className="text-orange-400">★★★★☆</span>
//           <span className="text-orange-500">{product.rating || 0}</span>
//           <span className="text-gray-300">•</span>
//           <span className="flex items-center gap-1 text-gray-400">
//             <MessageCircle size={16} /> {product.reviewsCount || 0} reviews
//           </span>
//           <span className="text-gray-300">•</span>
//           <span className="text-gray-400">{product.sold || 0} sold</span>
//         </div>

//         <h1 className="mt-2 text-[17px] font-semibold leading-snug text-gray-900 sm:text-[22px]">
//           {product.title}
//         </h1>

//         <div className="mt-2 sm:hidden">
//           <span className="text-[18px] font-semibold text-red-600">
//             ${Number(product.price).toFixed(2)}
//           </span>
//           <span className="ml-2 text-[14px] text-gray-400">
//             ({product.minOrder || 1}+ {product.unit || "pcs"})
//           </span>
//         </div>

//         <div className="mt-5 hidden grid-cols-3 bg-[#fff0df] p-4 sm:grid">
//           <div>
//             <p className="font-semibold text-red-600">
//               ${Number(product.price).toFixed(2)}
//             </p>
//             <p className="text-sm text-gray-500">
//               {product.minOrder || 1}-100 {product.unit || "pcs"}
//             </p>
//           </div>

//           <div>
//             <p className="font-semibold">
//               ${Math.max(product.price - 5, 1).toFixed(2)}
//             </p>
//             <p className="text-sm text-gray-500">
//               100-700 {product.unit || "pcs"}
//             </p>
//           </div>

//           <div>
//             <p className="font-semibold">
//               ${Math.max(product.price - 10, 1).toFixed(2)}
//             </p>
//             <p className="text-sm text-gray-500">
//               700+ {product.unit || "pcs"}
//             </p>
//           </div>
//         </div>

//         <div className="mt-4 flex gap-2 sm:hidden">
//           <button className="h-[40px] flex-1 rounded-md bg-blue-600 text-white">
//             Send inquiry
//           </button>

//           <button
//             onClick={handleAddToCart}
//             className="h-[40px] flex-1 rounded-md bg-green-600 text-white"
//           >
//             Add to cart
//           </button>

//           <button
//             type="button"
//             onClick={handleSaveForLater}
//             className={`flex h-[40px] w-[48px] items-center justify-center rounded-md border ${
//               saved
//                 ? "border-blue-100 bg-blue-50 text-blue-600"
//                 : "border-gray-200 text-blue-600"
//             }`}
//             title={saved ? "Saved for later" : "Save for later"}
//           >
//             <Heart size={22} className={saved ? "fill-blue-600" : ""} />
//           </button>
//         </div>

//         <div className="mt-5 space-y-2 text-[15px] sm:space-y-3">
//           <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Condition</span>
//             <span>{product.condition || "Brand new"}</span>
//           </div>

//           <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Brand</span>
//             <span>{product.brand || "N/A"}</span>
//           </div>

//           <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Category</span>
//             <span>{categoryName}</span>
//           </div>

//           <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Stock</span>
//             <span>{product.stock || 0} available</span>
//           </div>
//         </div>

//         <p className="mt-3 leading-snug text-gray-600 sm:hidden">
//           {product.description}
//         </p>

//         <button className="mt-2 font-medium text-blue-600 sm:hidden">
//           Read more
//         </button>
//       </div>

//       <aside className="mx-3 mb-4 h-fit rounded-md border border-gray-200 p-3 sm:mx-0 sm:mb-0 sm:p-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-100 text-[22px] font-semibold text-teal-700">
//             {supplier.name?.charAt(0) || "S"}
//           </div>

//           <div className="flex-1">
//             <p className="text-sm text-gray-500">Supplier</p>
//             <p className="font-medium">{supplier.name || "Unknown Supplier"}</p>
//           </div>

//           <ChevronRight className="text-gray-400 sm:hidden" size={22} />
//         </div>

//         <div className="mt-3 flex items-center gap-4 border-t border-gray-200 pt-3 text-[14px] text-gray-600 sm:block sm:space-y-3 sm:text-[15px]">
//           <p>{supplier.country || shipping.shipsFrom || "N/A"}</p>

//           <p className="flex items-center gap-1 sm:gap-2">
//             <ShieldCheck size={17} />
//             {supplier.verified ? "Verified" : "Not verified"}
//           </p>

//           <p className="flex items-center gap-1 sm:gap-2">
//             <Truck size={17} />
//             {shipping.freeShipping ? "Free Shipping" : "Shipping available"}
//           </p>
//         </div>

//         <button className="mt-4 hidden h-[40px] w-full rounded-md bg-blue-600 text-white sm:block">
//           Send inquiry
//         </button>

//         <button
//           onClick={handleAddToCart}
//           className="mt-2 hidden h-[40px] w-full rounded-md bg-green-600 text-white sm:block"
//         >
//           Add to cart
//         </button>

//         <button className="mt-2 hidden h-[40px] w-full rounded-md border border-gray-200 text-blue-600 sm:block">
//           Seller’s profile
//         </button>

//         <button
//           type="button"
//           onClick={handleSaveForLater}
//           disabled={!productId}
//           className={`mt-4 hidden w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition sm:flex ${
//             saved
//               ? "border-blue-100 bg-blue-50 text-blue-600"
//               : "border-gray-200 bg-white text-blue-600 hover:border-blue-200 hover:bg-blue-50"
//           } disabled:cursor-not-allowed disabled:opacity-60`}
//         >
//           <Heart size={18} className={saved ? "fill-blue-600" : ""} />
//           {saved ? "Saved for later" : "Save for later"}
//         </button>
//       </aside>
//     </section>
//   );
// }

// export default ProductDetailsMain;

// client/src/components/products/ProductDetailsMain.jsx
import { useEffect, useState } from "react";
import {
  Heart,
  ShieldCheck,
  Truck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  User,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const fallbackImage =
  "https://placehold.co/600x600/e5e7eb/64748b?text=Product";

const getImageSrc = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (image.url) return image.url;
  return "";
};

function ProductDetailsMain({ product }) {
  const { addToCart, toggleSavedForLater, isSavedForLater } = useCart();

  const productId = product?._id || product?.id || product?.productId;
  const saved = productId ? isSavedForLater(productId) : false;

  const images = (product?.images?.length ? product.images : [product?.image])
    .map(getImageSrc)
    .filter(Boolean);

  const galleryImages = images.length ? images : [fallbackImage];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(galleryImages[0]);

  const supplier = product?.supplier || {};
  const shipping = product?.shipping || {};
  const categoryName = product?.category?.name || product?.category || "N/A";

  useEffect(() => {
    setCarouselIndex(0);
    setCurrentImage(galleryImages[0]);
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success("Added to cart");
  };

  const handleSaveForLater = () => {
    if (!productId) return;

    toggleSavedForLater(product);
    toast.success(saved ? "Removed from saved" : "Saved for later");
  };

  const handleImageChange = (index) => {
    setCarouselIndex(index);
    setCurrentImage(galleryImages[index] || fallbackImage);
  };

  const prevImage = () => {
    if (galleryImages.length <= 1) return;

    const newIndex =
      (carouselIndex - 1 + galleryImages.length) % galleryImages.length;

    handleImageChange(newIndex);
  };

  const nextImage = () => {
    if (galleryImages.length <= 1) return;

    const newIndex = (carouselIndex + 1) % galleryImages.length;

    handleImageChange(newIndex);
  };

  if (!product) return null;

  return (
    <section className="grid grid-cols-1 gap-0 bg-white shadow-sm sm:gap-5 sm:rounded-xl sm:border sm:border-gray-200 sm:p-5 lg:grid-cols-[380px_minmax(0,1fr)_280px]">
      {/* Mobile top bar */}
      <div className="flex h-[56px] items-center justify-between bg-white px-4 sm:hidden">
        <ChevronLeft size={24} />

        <div className="flex items-center gap-5 text-gray-700">
          <ShoppingCart size={22} />
          <User size={22} />
        </div>
      </div>

      {/* Product gallery */}
      <div>
        <div className="group relative flex h-[320px] items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white sm:h-[390px] sm:rounded-xl sm:border sm:border-gray-200 sm:shadow-sm">
          <img
            src={currentImage}
            alt={product.title}
            className="max-h-[285px] max-w-full object-contain p-5 transition duration-300 group-hover:scale-[1.03] sm:max-h-[350px]"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
          />

          {galleryImages.length > 1 && (
            <>
              {/* Desktop left arrow */}
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white hover:text-blue-600 group-hover:flex sm:flex sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Desktop right arrow */}
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white hover:text-blue-600 group-hover:flex sm:flex sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>

              {/* Mobile arrows */}
              <div className="absolute bottom-3 right-4 flex gap-3 rounded-full bg-black/55 px-3 py-2 text-white shadow-sm sm:hidden">
                <button type="button" onClick={prevImage} aria-label="Previous image">
                  <ChevronLeft size={18} />
                </button>

                <button type="button" onClick={nextImage} aria-label="Next image">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white sm:block">
                {carouselIndex + 1} / {galleryImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="mt-4 hidden grid-cols-6 gap-3 sm:grid">
          {galleryImages.map((img, index) => (
            <button
              type="button"
              key={`${img}-${index}`}
              onClick={() => handleImageChange(index)}
              className={`flex h-[64px] cursor-pointer items-center justify-center rounded-xl border bg-white transition-all duration-200 ${
                carouselIndex === index
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <img
                src={img}
                alt={`${product.title} ${index + 1}`}
                className="max-h-[52px] max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="px-4 py-4 sm:px-0 sm:py-0">
        <p className="hidden text-[15px] font-medium text-green-600 sm:block">
          {product.inStock ? "✓ In stock" : "Out of stock"}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-[14px] sm:text-[15px]">
          <span className="text-orange-400">★★★★☆</span>

          <span className="font-medium text-orange-500">
            {product.rating || 0}
          </span>

          <span className="text-gray-300">•</span>

          <span className="flex items-center gap-1 text-gray-400">
            <MessageCircle size={16} />
            {product.reviewsCount || 0} reviews
          </span>

          <span className="text-gray-300">•</span>

          <span className="text-gray-400">{product.sold || 0} sold</span>
        </div>

        <h1 className="mt-2 text-[18px] font-semibold leading-snug text-gray-900 sm:text-[22px]">
          {product.title}
        </h1>

        {/* Mobile price */}
        <div className="mt-2 sm:hidden">
          <span className="text-[19px] font-bold text-red-600">
            ${Number(product.price || 0).toFixed(2)}
          </span>

          <span className="ml-2 text-[14px] text-gray-400">
            ({product.minOrder || 1}+ {product.unit || "pcs"})
          </span>
        </div>

        {/* Desktop price tiers */}
        <div className="mt-5 hidden grid-cols-3 rounded-md bg-[#fff0df] p-4 sm:grid">
          <div>
            <p className="font-bold text-red-600">
              ${Number(product.price || 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {product.minOrder || 1}-100 {product.unit || "pcs"}
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-900">
              ${Math.max(Number(product.price || 0) - 5, 1).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              100-700 {product.unit || "pcs"}
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-900">
              ${Math.max(Number(product.price || 0) - 10, 1).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              700+ {product.unit || "pcs"}
            </p>
          </div>
        </div>

        {/* Mobile buttons */}
        <div className="mt-4 flex gap-2 sm:hidden">
          <button className="h-[40px] flex-1 rounded-md bg-blue-600 text-white">
            Send inquiry
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="h-[40px] flex-1 rounded-md bg-green-600 text-white"
          >
            Add to cart
          </button>

          <button
            type="button"
            onClick={handleSaveForLater}
            disabled={!productId}
            className={`flex h-[40px] w-[48px] items-center justify-center rounded-md border ${
              saved
                ? "border-blue-100 bg-blue-50 text-blue-600"
                : "border-gray-200 text-blue-600"
            } disabled:cursor-not-allowed disabled:opacity-60`}
            title={saved ? "Saved for later" : "Save for later"}
          >
            <Heart size={22} className={saved ? "fill-blue-600" : ""} />
          </button>
        </div>

        {/* Product specs */}
        <div className="mt-5 space-y-2 text-[15px] sm:space-y-3">
          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Condition</span>
            <span className="text-gray-900">
              {product.condition || "Brand new"}
            </span>
          </div>

          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Brand</span>
            <span className="text-gray-900">{product.brand || "N/A"}</span>
          </div>

          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Category</span>
            <span className="text-gray-900">{categoryName}</span>
          </div>

          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Stock</span>
            <span className="text-gray-900">{product.stock || 0} available</span>
          </div>
        </div>

        <p className="mt-3 leading-snug text-gray-600 sm:hidden">
          {product.description}
        </p>

        <button className="mt-2 font-medium text-blue-600 sm:hidden">
          Read more
        </button>
      </div>

      {/* Supplier card */}
      <aside className="mx-3 mb-4 h-fit rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mx-0 sm:mb-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-[22px] font-semibold text-teal-700">
            {supplier.name?.charAt(0) || "S"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Supplier</p>
            <p className="truncate font-medium text-gray-900">
              {supplier.name || "Unknown Supplier"}
            </p>
          </div>

          <ChevronRight className="text-gray-400 sm:hidden" size={22} />
        </div>

        <div className="mt-4 space-y-3 border-t border-gray-200 pt-4 text-[15px] text-gray-600">
          <p>{supplier.country || shipping.shipsFrom || "N/A"}</p>

          <p className="flex items-center gap-2">
            <ShieldCheck size={17} />
            {supplier.verified ? "Verified" : "Not verified"}
          </p>

          <p className="flex items-center gap-2">
            <Truck size={17} />
            {shipping.freeShipping ? "Free Shipping" : "Shipping available"}
          </p>
        </div>

        <button className="mt-4 hidden h-[42px] w-full rounded-md bg-blue-600 font-medium text-white transition hover:bg-blue-700 sm:block">
          Send inquiry
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-2 hidden h-[42px] w-full rounded-md bg-green-600 font-medium text-white transition hover:bg-green-700 sm:block"
        >
          Add to cart
        </button>

        <button className="mt-2 hidden h-[42px] w-full rounded-md border border-gray-200 bg-white font-medium text-blue-600 transition hover:bg-blue-50 sm:block">
          Seller’s profile
        </button>

        <button
          type="button"
          onClick={handleSaveForLater}
          disabled={!productId}
          className={`mt-4 hidden w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition sm:flex ${
            saved
              ? "border-blue-100 bg-blue-50 text-blue-600"
              : "border-gray-200 bg-white text-blue-600 hover:border-blue-200 hover:bg-blue-50"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <Heart size={18} className={saved ? "fill-blue-600" : ""} />
          {saved ? "Saved for later" : "Save for later"}
        </button>
      </aside>
    </section>
  );
}

export default ProductDetailsMain;