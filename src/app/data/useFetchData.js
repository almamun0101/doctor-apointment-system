"use client";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useFetchData = (collection) => {
  const db = getDatabase();
  const [List, setList] = useState([]);
  

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
        setList(array);
      } else {
        setList([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return List;
};

export default useFetchData;
