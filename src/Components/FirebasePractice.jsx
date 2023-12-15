import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../firebase";

export default function FirebasePractice() {
  useEffect(() => {
    // To get data from firebase firestore collection
    const getData = () => {
      const colRef = collection(db, "Books");
      getDocs(colRef)
        .then((snapshot) => {
          let books = [];
          snapshot.docs.map((data) => {
            return books.push({ ...data.data(), id: data.id });
          });
          console.log(books);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Firebase</h1>

      {/* Get Collection Ref */}
    </div>
  );
}
