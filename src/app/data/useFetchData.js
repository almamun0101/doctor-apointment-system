"use client";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useFetchData = (collection) => {
  const db = getDatabase();
  const [data, setData] = useState([]);
  const [loading, setLoading ] = useState(true)

  useEffect(() => {
    if (!collection) return;

    const starCountRef = ref(db, `${collection}/`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const array = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setData(array);
      } else {
        setData([]);
      }
      setLoading(false)
    });

    return () => {
      off(starCountRef); // remove listener
    };
  }, []);

  return {data,loading};
};

export default useFetchData;
