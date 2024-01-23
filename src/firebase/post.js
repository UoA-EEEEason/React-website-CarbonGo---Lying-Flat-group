import { firestore,storage } from '../firebaseConfig';
import { serverTimestamp } from "firebase/firestore";

export const postNewMessage = async (title, content) => {
    const messageRef = firestore.collection('message');
    try {
        messageRef.add({
            title: title,
            content: content,
            createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error('Error adding message: ', error);
      }
}

export const postNews = async (title, content, imageUrl) => {
    const messageRef = firestore.collection('news');
    try {
        messageRef.add({
            title: title,
            content: content,
            image: imageUrl,
            createdAt: serverTimestamp(),
        })
      } catch (error) {
        console.error('Error adding news: ', error);
      }
}

export const updateNews = async (id, title, content, imageUrl) => {
  const messageRef = firestore.collection('news').doc(id);
  try {
      messageRef.update({
          title: title,
          content: content,
          image: imageUrl,
      })
    } catch (error) {
      console.error('Error updating news: ', error);
    }
}

export const updateMessage = async (id, title, content) => {
  const messageRef = firestore.collection('message').doc(id);
  try {
      messageRef.update({
          title: title,
          content: content,
      })
    } catch (error) {
      console.error('Error updating message: ', error);
    }
}

export const handleUpload = (file, callback) => {
  if (file) {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Handle upload progress
      },
      (error) => {
        // Optional: Handle upload errors
        console.error("Upload error:", error);
      },
      () => {
        //Operation after upload is completed
        storage.ref("images").child(file.name).getDownloadURL().then(url => {
          console.log("File available at", url);
          callback(url);
          // You can save the URL here, or perform other operations
        });
      }
    );
  }
};

export const getNewsById = async ( id ) => {
  try {
    const docRef = firestore.collection('news').doc(id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      // console.log(docSnapshot.data())
      return docSnapshot.data();
    } else {
      console.log("Document not found!");
      return null;
    }
  } catch (error) {
      console.error("Error fetching the news:", error);
      return 0;
  }
};

export const getMessageById = async ( id ) => {
  try {
    const docRef = firestore.collection('message').doc(id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      return docSnapshot.data();
    } else {
      console.log("Document not found!");
      return null;
    }
  } catch (error) {
      console.error("Error fetching the message:", error);
      return 0;
  }
};

export const getAllNews = async () => {
  try {
    const docRef = firestore.collection('news');
    const docSnapshot = await docRef.get();

    if (!docSnapshot.empty) {
      // If there are documents in the collection
      const newsArray = [];
      docSnapshot.forEach((doc) => {
        // For each document, add its data to the array
        newsArray.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          role: 'News',
        });
      });
      // console.log('newsArray:',newsArray)
      return newsArray;
    } else {
      console.log("No documents found in the 'news' collection.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching the news:", error);
    return [];
  }
};

export const getAllMessage = async () => {
  try {
    const docRef = firestore.collection('message');
    const docSnapshot = await docRef.get();

    if (!docSnapshot.empty) {
      // If there are documents in the collection
      const newsArray = [];
      docSnapshot.forEach((doc) => {
        // For each document, add its data to the array
        newsArray.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          role: 'Message',
        });
      });
      // console.log('newsArray:',newsArray)
      return newsArray;
    } else {
      console.log("No documents found in the 'message' collection.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching the message:", error);
    return [];
  }
};