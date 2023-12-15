import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function FirebasePractice() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [docId, setDocId] = useState("");

  // Add Data to Firebase using addDoc
  const adddata = async () => {
    const colRef = collection(db, "Books");

    addDoc(colRef, {
      Title: title,
      Author: author,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        alert("Data Added");
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Delete Doc from firebase Firestore

  const deleleDoc = async () => {
    const docRef = doc(db, "Books", docId);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    // To get data from firebase firestore collection
    // const getData = () => {
    //   const colRef = collection(db, "Books");
    //   getDocs(colRef)
    //     .then((snapshot) => {
    //       let books = [];
    //       snapshot.docs.map((data) => {
    //         return books.push({ ...data.data(), id: data.id });
    //       });
    //       console.log(books);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    // getData();

    // Get Realtime Data using onSnapshot function in firebase

    const getData = () => {
      const colRef = collection(db, "Books");

      // query specific data in firebase using query function

      const q = query(
        colRef,
        where("Author", "==", "Vinay"),
        orderBy("Title", "asc")
      );

      onSnapshot(q, (snapshot) => {
        let books = [];
        snapshot.docs.map((doc) => {
          return books.push({ ...doc.data(), id: doc.id });
        });
        console.log(books);
      });
    };

    getData();

    const getSingleData = () => {
      const singleDocRef = doc(db, "Books", "GU6MtIpVExVjCDrJist8");

      onSnapshot(singleDocRef, (doc) => {
        console.log("Single Document Data", doc.data(), doc.id);
      });
    };

    getSingleData();
  }, []);

  return (
    <div>
      <h1>Firebase</h1>

      {/* Get Collection Ref */}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input
          type="text"
          onChange={(text) => setTitle(text.target.value)}
          style={{ padding: "10px" }}
          placeholder="Title"
        />
        <input
          type="text"
          onChange={(text) => setAuthor(text.target.value)}
          style={{ padding: "10px" }}
          placeholder="Author Name"
        />
        <button onClick={() => adddata()}>Add Data</button>

        <input
          type="text"
          onChange={(text) => setDocId(text.target.value)}
          style={{ padding: "10px" }}
          placeholder="Document Id"
        />
        <button onClick={() => deleleDoc()}>Delete Doc</button>
      </div>
    </div>
  );
}
