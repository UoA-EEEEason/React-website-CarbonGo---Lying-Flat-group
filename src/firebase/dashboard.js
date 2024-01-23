import { firestore } from '../firebaseConfig';

export const getTotalConsumption = async () => {
    try {
        const querySnapshot = await firestore
            .collection('totalEmissions')
            .orderBy('createdAt', 'desc') 
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            return latestDoc.data().totalConsumption;
        } else {
            console.log("No documents found in totalEmissions");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching latest total consumption:", error);
        return 0;
    }
};

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

export const getElectricityConsumption = async () => {
    try {
        const querySnapshot = await firestore
            .collection('totalEmissions')
            .orderBy('createdAt', 'desc') 
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            return latestDoc.data().electricityConsumption;
        } else {
            console.log("No documents found in electricityConsumption");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching latest electricityConsumption:", error);
        return 0;
    }
};

export const getFoodConsumption = async () => {
    try {
        const querySnapshot = await firestore
            .collection('totalEmissions')
            .orderBy('createdAt', 'desc') 
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            return latestDoc.data().foodConsumption;
        } else {
            console.log("No documents found in foodConsumption");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching latest foodConsumption:", error);
        return 0;
    }
};

export const getTrafficConsumption = async () => {
    try {
        const querySnapshot = await firestore
            .collection('totalEmissions')
            .orderBy('createdAt', 'desc') 
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            return latestDoc.data().trafficConsumption;
        } else {
            console.log("No documents found in trafficConsumption");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching latest trafficConsumption:", error);
        return 0;
    }
};

export const getWalkConsumption = async () => {
    try {
        const querySnapshot = await firestore
            .collection('totalEmissions')
            .orderBy('createdAt', 'desc') 
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            return latestDoc.data().walkConsumption;
        } else {
            console.log("No documents found in walkConsumption");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching latest walkConsumption:", error);
        return 0;
    }
};

export const getTotalPoints = async () => {
    try {
        const querySnapshot = await firestore
            .collection('totalEmissions')
            .orderBy('createdAt', 'desc') 
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            return latestDoc.data().totalPoints;
        } else {
            console.log("No documents found in totalPoints");
            return 0;
        }
    } catch (error) {
        console.error("Error fetching latest totalPoints:", error);
        return 0;
    }
};