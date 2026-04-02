import { useSelector } from "react-redux";

export default function TransactionFilters({ filters, setFilters }) {
    const darkMode = useSelector((state) => state.ui.darkMode);

    const handleChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className={`p-4 rounded-xl shadow mb-4 grid grid-cols-2 md:grid-cols-3 gap-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}>
            <input type="date" className={`p-2 border rounded ${darkMode
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
                }`}
                value={filters.startDate || ""}
                onChange={(e) => handleChange("startDate", e.target.value)}
            />

            <input type="date" className={`p-2 border rounded ${darkMode
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
                }`}
                value={filters.endDate || ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
            />

            <select
                className={`p-2 border rounded ${darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                    }`}
                value={filters.category}
                onChange={(e) => handleChange("category", e.target.value)}
            >
                <option value="all">All Categories</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Entertainment</option>
                <option>Bills</option>
                <option>Medical</option>
                <option>Education</option>
                <option>Amenities</option>
                <option>Salary</option>
            </select>

            <select
                className={`p-2 border rounded ${darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                    }`}
                value={filters.type}
                onChange={(e) => handleChange("type", e.target.value)}
            >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <input type="number" placeholder="Min Amount" className={`p-2 border rounded ${darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                }`}
                value={filters.minAmount}
                onChange={(e) => handleChange("minAmount", e.target.value)}
            />

            <input type="number" placeholder="Max Amount" className={`p-2 border rounded ${darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                }`}
                value={filters.maxAmount}
                onChange={(e) => handleChange("maxAmount", e.target.value)}
            />

            <select
                className={`p-2 border rounded ${darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                    }`}
                value={filters.sort}
                onChange={(e) => handleChange("sort", e.target.value)}
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
            </select>
        </div>
    );
}