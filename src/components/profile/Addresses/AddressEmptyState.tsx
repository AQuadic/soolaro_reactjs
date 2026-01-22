import { Link } from "react-router-dom"

const AddressEmptyState = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-6">
            <img
                src="/images/profile/location.gif"
                alt="order empty state"
            />
            <p className="text-[#3B3B3B] text-lg font-medium">
                You haven’t added any addresses yet.
            </p>

            <Link to='/' className="w-full h-14 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold flex items-center justify-center">
                Add New Address
            </Link>
        </section>
    )
}

export default AddressEmptyState
