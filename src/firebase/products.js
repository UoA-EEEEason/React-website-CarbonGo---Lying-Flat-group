import { auth, firestore, storage } from '../firebaseConfig';

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