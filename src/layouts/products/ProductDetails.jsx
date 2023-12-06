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
    });
    const productDetailItem = {
        images: [
            {
                original:
                    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                original:
                    "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                original:
                    "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                original:
                    "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                thumbnail:
                    "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
                original:
                    "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
                thumbnail:
                    "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
        ],
        title: "BIG ITALIAN SOFA",
        reviews: "150",
        availability: true,
        brand: "apex",
        category: "Sofa",
        sku: "BE45VGTRK",
        price: 450,
        previousPrice: 599,
        description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
        size: ["XS", "S", "M", "L", "XL"],
        color: ["gray", "violet", "red"],
    };

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
                    <p className="mt-4 text-4xl font-bold text-violet-900">
                        ${productDetails.price}{" "}
                        <span className="text-xs text-gray-400 line-through">
                            ${productDetails?.previousPrice}
                        </span>
                    </p>
                    <p className="pt-5 text-sm leading-5 text-gray-500">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: productDetails.description,
                            }}
                        ></p>
                    </p>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default ProductDetails;
