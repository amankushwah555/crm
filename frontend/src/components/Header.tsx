import fullLogog from "../assets/fulllogo.png"

const Header = () => {
  return (
    <div className="py-6">
      <div className="container mx-auto flex justify-center">
        <img src={fullLogog} alt="C9Lab (Pinak Infosec Pvt. Ltd.)" height={450} width={450} />
        {/* <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">C9Lab (Pinak Infosec Pvt. Ltd.)</Link>
        </span> */}
        {/* <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
           
          )}
        </span> */}
         {/* <Link
              to="/list"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              All User List
            </Link> */}
      </div>
    </div>
  );
};

export default Header;
