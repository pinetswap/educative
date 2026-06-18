import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

function Dashboard() {
  const [phrases, setPhrases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "fire"), orderBy("created_at", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to Date if it exists
          created_at: doc.data().created_at?.toDate() || new Date(),
        }));
        setPhrases(data);
      } catch (error) {
        console.error("Error fetching from Firebase:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "fire", id));
      setPhrases(phrases.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting from Firebase:", error.message);
    }
  };

  // Filtered list
  const filteredPhrases = phrases.filter((p) =>
    p.passphrase.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Passphrase Dashboard</h1>

      {/* 🔍 Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search passphrases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table view for desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Passphrase</th>
              <th className="p-3 text-left">Created At</th>
              {/* <th className="p-3 text-left">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredPhrases.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{p.passphrase}</td>
                <td className="p-3">
                  {new Date(p.created_at).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredPhrases.length === 0 && (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-500">
                  No matching passphrases
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {filteredPhrases.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p>
              <span className="font-semibold">Passphrase:</span>{" "}
              {p.passphrase}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Created:</span>{" "}
              {new Date(p.created_at).toLocaleString()}
            </p>

             <div className="mt-3">
              <button
                onClick={() => handleDelete(p.id)}
                className="w-full px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div> 
          </div>
        ))}
        {filteredPhrases.length === 0 && (
          <p className="text-center text-gray-500">No matching passphrases</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
