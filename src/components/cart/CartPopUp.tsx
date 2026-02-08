import { Link } from "react-router-dom";
import Check from "../icons/cart/Check";

interface CartPopUpProps {
  productName: string;
  productImage: string;
  productPrice: number;
  onClose: () => void;
}

const CartPopUp = ({ productName, productImage, productPrice, onClose }: CartPopUpProps) => {
    return (
        <>
            <div 
                className="fixed inset-0 bg-[#000000B2] z-40"
                onClick={onClose}
            />
            
            <section className="fixed bottom-6 md:left-6 z-50 w-[350px] md:w-[719px] bg-[#FEFEFE] rounded-[32px] shadow-lg p-6 animate-slide-in">
                <div className='w-full p-2 bg-[#1255001A] flex items-center justify-center gap-3'>
                    <Check />
                    <p className='text-[#125500] text-lg font-semibold'>
                        Item added to your cart
                    </p>
                </div>

                <div className='mt-8 flex items-center gap-4'>
                    <div className="w-[133px] h-[133px] bg-[#F6F6F6] rounded-lg flex items-center justify-center overflow-hidden">
                        <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className='text-[#0B0B0B] text-lg font-semibold'>
                            {productName}
                        </h2>
                        <div className='flex items-center gap-1'>
                            <p className='text-[#025D5B] text-xl font-medium'>
                                {productPrice.toFixed(2)}
                            </p>
                            <img
                                src='/images/c_currency.png'
                                alt='currency'
                                className='w-[22.5px] h-5'
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-8 flex justify-between gap-6'>
                    <Link to='/cart' className='w-full h-14 border border-[#018884] rounded-[20px] text-[#018884] text-lg font-bold flex items-center justify-center'>
                        View Cart
                    </Link>

                    <Link to='/checkout' className='w-full h-14 border bg-[#018884] rounded-[20px] text-[#FEFEFE] text-lg font-bold flex items-center justify-center'>
                        Check Out
                    </Link>
                </div>
            </section>
        </>
    )
}

export default CartPopUp