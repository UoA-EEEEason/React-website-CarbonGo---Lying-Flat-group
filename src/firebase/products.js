import { auth, firestore, storage } from '../firebaseConfig';
import { serverTimestamp } from "firebase/firestore";

export const getAllProducts = async () => {
  try {
    const docRef = firestore.collection('tree');
    const docSnapshot = await docRef.get();

    if (!docSnapshot.empty) {
      // If there are documents in the collection
      const treeArray = [];
      docSnapshot.forEach((doc) => {
        // For each document, add its data to the array
        treeArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return treeArray;
    } else {
      console.log("No documents found in the 'tree' collection.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching the tree:", error);
    return [];
  }
};

export const postTree = async (name, price, description, imageUrl) => {
  const messageRef = firestore.collection('tree');
  try {
    messageRef.add({
      name: name,
      price: price,
      desc: description,
      image: imageUrl,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error adding news: ', error);
  }
}


export const getTreeById = async (id) => {
  try {
    const docRef = firestore.collection('tree').doc(id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      // console.log(docSnapshot.data())
      return docSnapshot.data();
    } else {
      console.log("Document not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching the tree:", error);
    return 0;
  }
};

export const updateTree = async (id, name, price, description, imageUrl) => {
  const messageRef = firestore.collection('tree').doc(id);
  try {
    messageRef.update({
      name: name,
      price: price,
      desc: description,
    })
  } catch (error) {
    console.error('Error updating tree: ', error);
  }
}

export const deleteTreeById = async (id) => {
  try {
    const docRef = firestore.collection('tree').doc(id);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      await docRef.delete();
      console.log("Document deleted successfully!");
      return true;
    } else {
      console.log("Document not found!");
      return false;
    }
  } catch (error) {
    console.error("Error deleting the tree:", error);
    return false;
  }
};

export const deleteSelected = async (selected) => {
  const batch = firestore.batch();

  selected.forEach((docId) => {
    const docRef = firestore.collection('tree').doc(docId.id);
    batch.delete(docRef);
  });
  batch.commit().then(() => {
    console.log('Batch deletion successful!');
  }).catch((error) => {
    console.error('Error deleting documents: ', error);
  });

}