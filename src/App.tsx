import { useState } from "react";
import { fetchUsers } from "./service/userService";
import type { User } from "./types/userTypes";
import { groupByDepartment } from "./utils/userGroupByDepartment";



function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getUserByDepartment = async () => {
    setLoading(true);

    try {
      const users: User[] = await fetchUsers();
      const grouped = groupByDepartment(users);
      const jsonResult = JSON.stringify(grouped, null, 2); // pretty-print
      setResult(jsonResult);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline mb-4">
        Group Users by Department
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 hover:cursor-pointer"
        onClick={getUserByDepartment}
      >
        {loading ? "Loading..." : "Click to load data"}
      </button>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[600px]">
        {result || "No data yet. Please click to load data."}
      </pre>
    </>
  );
}

export default App;
