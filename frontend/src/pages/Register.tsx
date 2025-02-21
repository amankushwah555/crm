import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
// import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  designation: string;
};

const Register = () => {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {

      showToast({ message: "Guest Detaials captured successfully! A greeting email has been sent.", type: "SUCCESS" });
      // await queryClient.invalidateQueries("validateToken");
      reset({name: "",
        email: "",
        phone: "",
        company_name: "",
        designation: ""})
      // navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Guest Details</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          placeholder="Enter your name"
          {...register("name")}
        />
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Phone
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          placeholder="Enter guest phone number"
          {...register("phone")}
        />
      </label>{" "}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Company Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          placeholder="Enter guest company name"
          {...register("company_name")}
        />
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Desgination
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          placeholder="Enter guest desgination"
          {...register("designation")}
        />
      </label>
      <span>
        <button
          type="submit"
          className={`bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl ${
            mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Submit"}
        </button>
      </span>
    </form>
  );
};

export default Register;
