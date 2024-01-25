import { firestore } from '../firebaseConfig';

const getLatestField = async (fieldName) => {
    try {
        const querySnapshot = await firestore
            .collection('totalEmissions')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0].data();
            return latestDoc[fieldName] || 0;
        } else {
            console.log(`No documents found for ${fieldName}`);
            return 0;
        }
    } catch (error) {
        console.error(`Error fetching latest ${fieldName}:`, error);
        return 0;
    }
};

export const getTotalConsumption = () => getLatestField('totalConsumption');
export const getElectricityConsumption = () => getLatestField('electricityConsumption');
export const getFoodConsumption = () => getLatestField('foodConsumption');
export const getTrafficConsumption = () => getLatestField('trafficConsumption');
export const getWalkConsumption = () => getLatestField('walkConsumption');
export const getTotalPoints = () => getLatestField('totalPoints');

export const getTotalUsers = async () => {
    const snapshot = await firestore.collection('user').get();
    return snapshot.docs.length;
};

export const getTotalTreesPlanted = async () => {
    const snapshot = await firestore.collection('tree').get();
    return snapshot.docs.length;
};

export const getTotalNewsPosted = async () => {
    const snapshot = await firestore.collection('news').get();
    return snapshot.docs.length;
};

export const getTotalMessagePosted = async () => {
    const snapshot = await firestore.collection('message').get();
    return snapshot.docs.length;
};

export const getNewsData = async () => {
    const newsData = [];
    const querySnapshot = await firestore
        .collection('news')
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get();
    querySnapshot.forEach(doc => {
        const data = doc.data();
        newsData.push({
            id: doc.id,
            title: data.title,
            content: data.content,
            image: data.image,
            createdAt: data.createdAt,
        });
    });
    return newsData;
};