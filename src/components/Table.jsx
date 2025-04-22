import { useSelector, useDispatch } from "react-redux";
import { deleteEntry } from "../redux/dataSlice";

const Table = ({ setEditId }) => {
  const { data, filter } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const filteredData = data.filter((item) => {
    if (filter.month && !item.startTime.startsWith(filter.month)) return false;
    if (filter.timeRange && item.startTime < filter.timeRange) return false;
    return true;
  });

  const getTimeDiff = (start, end) => {
    const diff =
      (new Date(`1970-01-01T${end}`) - new Date(`1970-01-01T${start}`)) / 60000;
    return `${diff} mins`;
  };

  return (
    <div className="overflow-x-auto mt-6 rounded-2xl shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-indigo-100 text-indigo-700 font-semibold">
          <tr>
            <th className="px-4 py-3 text-left">Check</th>
            <th className="px-4 py-3 text-left">Start</th>
            <th className="px-4 py-3 text-left">End</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No data found
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="h-4 w-4 accent-indigo-600"
                  />
                </td>
                <td className="px-4 py-3 text-gray-700">{item.startTime}</td>
                <td className="px-4 py-3 text-gray-700">{item.endTime}</td>
                <td className="px-4 py-3 text-gray-700">
                  {getTimeDiff(item.startTime, item.endTime)}
                </td>
                <td className="px-4 py-3 capitalize text-gray-700">
                  {item.dropdown}
                </td>
                <td className="px-4 py-3 text-gray-700">{item.description}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditId(item.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteEntry(item.id))}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
