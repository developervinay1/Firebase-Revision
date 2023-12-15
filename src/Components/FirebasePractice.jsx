import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function FirebasePractice() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Add Data to Firebase using addDoc
  const adddata = async () => {
    const colRef = collection(db, "Books");

    addDoc(colRef, {
      Title: title,
      Author: author,
    })
      .then(() => {
        alert("Data Added");
      })
      .catch((error) => {
        alert(error);
      });
  };

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

      <input
        type="text"
        onChange={(text) => setTitle(text.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        onChange={(text) => setAuthor(text.target.value)}
        placeholder="Author Name"
      />
      <button onClick={() => adddata()}>Add Data</button>
    </div>
  );
}
