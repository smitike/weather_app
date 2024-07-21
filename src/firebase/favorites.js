import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, getDoc, deleteDoc, doc  } from 'firebase/firestore';

export const saveFavoriteLocation = async (userId, location) => {
  try {
    await addDoc(collection(db, `users/${userId}/favorites`), {
      location: location,
      timestamp: new Date()
    });
    console.log('Favorite location saved!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// reading
export const getFavoriteLocations = async (userId) => {
    const querySnapshot = await getDocs(collection(db, `users/${userId}/favorites`));
    const favorites = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return favorites;
  };

  export const removeFavoriteLocation = async (userId, location) => {
    try {
      const q = query(collection(db, `users/${userId}/favorites`), where("location", "==", location));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log('Favorite location removed!');
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  };
