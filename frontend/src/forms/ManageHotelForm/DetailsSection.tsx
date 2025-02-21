import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: "This field is required!" })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            placeholder="Enter your city"
            {...register("city", { required: "This field is required!" })}
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            placeholder="Enter your country"
            {...register("country", { required: "This field is required!" })}
          />
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required!" })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          type="number"
          placeholder="Enter your price"
          {...register("pricePerNight", {
            required: "This field is required!",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500 text-sm">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          min={1}
          className="border rounded w-full p-2 text-gray-700 font-normal"
          {...register("starRating", {
            required: "This field is required!",
          })}
        >
          <option value="" className="text-sm font-bold" selected disabled>
            Select your ratting
          </option>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        {errors.starRating && (
          <span className="text-red-500 text-sm">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};
export default DetailsSection;
