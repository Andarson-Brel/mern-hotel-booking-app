import { Link } from "react-router-dom";
import { UseAppContext } from "../contexts/AppContexts";
import SignOutButton from "./SignOuButton";

const Header = () => {
  const { isLoggedIn } = UseAppContext();
  return (
    <div className=" bg-blue-800 py-6 w-full ">
      <div className="container mx-auto flex  justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Holiday Reserve</Link>
        </span>
        <span className="flex  space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to={"my-bookings"}
                className="flex
               items-center px-3 font-bold text-white hover:bg-blue-600"
              >
                My Bookings
              </Link>
              <Link
                to={"my-hotels"}
                className="flex
               items-center px-3 font-bold text-white hover:bg-blue-600 "
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100  bg-gray-200"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
