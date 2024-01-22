import { firestore } from '../firebaseConfig';
import { serverTimestamp } from "firebase/firestore";

export const handleNewMessage = async (title, content) => {
    const messageRef = firestore.collection('message');
    try {
        messageRef.add({
            title: title,
            content: content,
            createdAt: serverTimestamp(),
        })
        alert('Message added successfully');
      } catch (error) {
        console.error('Error adding message: ', error);
      }
}

export const handleNewNews = async (title, content) => {
    const messageRef = firestore.collection('news');
    try {
        messageRef.add({
            title: title,
            content: content,
            createdAt: serverTimestamp(),
        })
        alert('News added successfully');
      } catch (error) {
        console.error('Error adding news: ', error);
      }
}