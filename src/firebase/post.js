import { firestore,storage } from '../firebaseConfig';
import { serverTimestamp } from "firebase/firestore";

export const handleNewMessage = async (title, content) => {
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

export const handleNewNews = async (title, content, imageUrl) => {
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