import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useParams } from "react-router-dom";
import axios from "../../Axios";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const { prodId } = useParams();
    const [productDetails, setProductDetails] = useState({
        id: "",
        title: "",
        price: "",
        description: "",
        image: [],
        discount: {},
    });

    const getProductDetails = async () => {
        try {
            const product = await axios.get(`/products/${prodId}`);

            if (product.data.success) {
                const data = product.data.result;

                const images = data.images.map((image) => {
                    return {
                        original: `${process.env.REACT_APP_API_URL}/images?imageUrl=${image}`,
                        thumbnail: `${process.env.REACT_APP_API_URL}/images?imageUrl=${image}`,
                    };
                });

                setProductDetails({
                    id: data._id,
                    title: data.name,
                    price: data.amount,
                    description: data.description,
                    image: images,
                    discount: data.discount,
                });
            }
        } catch (error) {
            console.error(error, "<<-- Error in getting product details");
        }
    };

    useEffect(() => {
        getProductDetails();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
                {/* image gallery */}
                <div className="container mx-auto px-4">
                    <ReactImageGallery
                        // thumbnailPosition={"left"}
                        showBullets={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        items={productDetails.image}
                    />

                    {/* /image gallery  */}
                </div>
                {/* description  */}

                <div className="mx-auto px-5 lg:px-5">
                    <h2 className="pt-3 text-2xl font-bold lg:pt-0">
                        {productDetails.title}
                    </h2>
                    <p className="mt-4 text-4xl font-bold text-green-600">
                        $
                        {productDetails.discount.type === "percentage"
                            ? (
                                  productDetails.price -
                                  (productDetails.price *
                                      productDetails.discount.discount) /
                                      100
                              )?.toFixed(2)
                            : (
                                  productDetails.price -
                                  productDetails.discount.discount
                              )?.toFixed(2)}
                        <span className="ml-4 text-base text-red-600 line-through">
                            ${productDetails?.price}
                        </span>
                    </p>
                    <p className="pt-5 text-sm leading-5 text-gray-500">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: productDetails.description,
                            }}
                        ></div>
                    </p>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default ProductDetails;
