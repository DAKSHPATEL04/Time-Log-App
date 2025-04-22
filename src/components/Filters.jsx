import { useDispatch } from "react-redux";
import { setFilter, clearFilter } from "../redux/dataSlice";

const Filters = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Filter by Month</label>
        <input
          type="month"
          name="month"
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Filter by Time</label>
        <input
          type="time"
          name="timeRange"
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={() => dispatch(clearFilter())}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
