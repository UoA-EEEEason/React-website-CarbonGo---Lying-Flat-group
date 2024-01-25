import { auth, firestore, storage } from '../firebaseConfig';

export const getAllUsers = async () => {
    try {
        const docRef = firestore.collection('user');
        const docSnapshot = await docRef.get();

        if (!docSnapshot.empty) {
            // If there are documents in the collection
            const usersArray = [];

            // Using Promise.all to wait for all asynchronous operations to complete
            await Promise.all(docSnapshot.docs.map(async (doc) => {
                // For each document, add its data to the array
                if (!doc.data().hasOwnProperty('role')) {
                    const userData = {
                        id: doc.id,
                        name: doc.data().username,
                        email: doc.data().email ?? 'no@email.com',
                    };
                    // Fetch data from the "points" subcollection
                    const pointsSnapshot = await docRef.doc(doc.id).collection('points').orderBy('createdAt', 'desc').limit(1).get();
                    userData.points = pointsSnapshot.docs[0].data().points;

                    // Fetch data from the "certificate" subcollection
                    const certificateSnapshot = await docRef.doc(doc.id).collection('certificate').get();
                    userData.certificate = certificateSnapshot.size;
                    
                    usersArray.push(userData);
                }

            }));

            return usersArray;
        } else {
            console.log("No documents found in the 'user' collection.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching the user:", error);
        return [];
    }
};

export const getUserById = async (id) => {
    try {
      const docRef = firestore.collection('user').doc(id);
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        return docSnapshot.data();
      } else {
        console.log("Document not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching the user:", error);
      return 0;
    }
  };

  export const updateUser = async (id, username) => {
    const messageRef = firestore.collection('user').doc(id);
    try {
      messageRef.update({
        username: username,
      })
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  }
