// import { useMutation, useQueryClient } from "react-query";
// import * as apiClient from "../api-client";
// import { useAppContext } from "../contexts/AppContext";
// // import { useNavigate } from "react-router-dom";

// const SignOutButton = () => {
//   const queryCLient = useQueryClient();
//   const { showToast } = useAppContext();
//   //   const navigate = useNavigate();
//   const mutation = useMutation(apiClient.signOut, {
//     onSuccess: async () => {
//       await queryCLient.invalidateQueries("validateToken");
//       showToast({ message: "Logout Successfull!", type: "SUCCESS" });
//       //   navigate("/sign-in");
//     },
//     onError: async (err: Error) => {
//       showToast({ message: err.message, type: "ERROR" });
//     },
//   });

//   const handleClick = () => {
//     mutation.mutate();
//   };
//   return (
//     <button
//       onClick={handleClick}
//       className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
//     >
//       Sign Out
//     </button>
//   );
// };
// export default SignOutButton;
