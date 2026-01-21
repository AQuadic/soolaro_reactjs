import ForgetPassForm from "@/components/auth/forget_password/ForgetPassForm"

const ForgetPasswordPage = () => {
    return (
        <div className="flex h-full">
        <div className="flex-1 flex items-center justify-center">
            <ForgetPassForm />
        </div>

        <div className="hidden lg:block lg:flex-1">
            <img
            src="/images/auth/auth_bg.jpg"
            alt="bg"
            className=" w-full object-cover"
            />
        </div>
        </div>
    )
}

export default ForgetPasswordPage
