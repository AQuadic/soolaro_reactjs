import Logo from "@/components/icons/header/Logo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link } from "react-router-dom";
import MobileBackHeader from "@/components/general/MobileBackHeader";

const OtpForm = () => {
  return (
    <section className="container md:py-12">
      <Link to="/" className="md:block hidden">
        <Logo />
      </Link>

      <div className="md:mt-34 mt-8">
        <MobileBackHeader />
        <h2 className="text-[#0B0B0B] md:text-[40px] text-2xl font-bold md:font-semibold leading-[100%] mx-auto text-center">
          Verify Your Account
        </h2>

        <p className="text-[#3B3B3B] md:text-base text-sm font-medium md:mt-6 mt-4 text-center">
          We’ve sent a 6-digit code to your email, Please enter it below to
          continue.
        </p>

        <div className="md:mt-20 mt-12 flex items-center justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup className="flex space-x-4 overflow-visible">
              <InputOTPSlot
                index={0}
                className="md:w-20 w-10 md:h-20 h-10 rounded-4xl"
              />
              <InputOTPSlot
                index={1}
                className="md:w-20 w-10 md:h-20 h-10 rounded-4xl"
              />
              <InputOTPSlot
                index={2}
                className="md:w-20 w-10 md:h-20 h-10 rounded-4xl"
              />
              <InputOTPSlot
                index={3}
                className="md:w-20 w-10 md:h-20 h-10 rounded-4xl"
              />
              <InputOTPSlot
                index={4}
                className="md:w-20 w-10 md:h-20 h-10 rounded-4xl"
              />
              <InputOTPSlot
                index={5}
                className="md:w-20 w-10 md:h-20 h-10 rounded-4xl"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Dialog>
          <DialogTrigger className="w-full">
            <button className="md:mt-10 mt-6 w-full md:h-14 h-12 bg-[#018884] rounded-4xl text-[#FEFEFE] text-lg font-bold">
              Verify
            </button>
          </DialogTrigger>
          <DialogContent className="md:w-[655px] w-full md:h-121.25 h-80 flex flex-col items-center justify-end">
            <DialogHeader>
              <DialogTitle className="text-[#0B0B0B] text-2xl font-semibold text-center">
                OTP verified successfully
              </DialogTitle>
              <DialogDescription className="text-[#0B0B0B] text-base font-medium mt-3 text-center">
                Please create your new password to <br /> continue
              </DialogDescription>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Link to='/new_password'
                    type="button"
                    className="md:w-112.5 h-14 bg-[#018884] rounded-4xl mt-10 text-[#FEFEFE] text-base font-bold flex items-center justify-center"
                  >
                    Create New Password
                  </Link>
                </DialogClose>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <p className="text-[#3B3B3B] md:text-base text-xs font-medium md:mt-6 mt-3 text-center">
          Didn't receive the code? Resend code in 30s
        </p>
      </div>
    </section>
  );
};

export default OtpForm;
