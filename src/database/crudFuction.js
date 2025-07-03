import { query, getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, where, setDoc, getDoc } from "firebase/firestore";
import Db from "./firebase";

const CrudFunction = {
    fetchDataCol: async (col) => {
        const q = query(
            collection(Db, col),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return data
    },

    fetchDataDoc: async (col, doc) => {
        const docRef = doc(Db, col, doc);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data()
            return userData
        } else {
            console.log('No such document!');
            return null;
        }
    },

    addDataCol: async (col, data) => {
        const itemRef = collection(Db, col)
        return await addDoc(itemRef, data);
    },

    addDataDoc: async (col1, doc1, col2, doc2, data) => {
        const itemRef = doc(Db, col1, doc1, col2, doc2);
        return await setDoc(itemRef, data);
    },

    updateData: async (col, id, data) => {
        const itemRef = doc(Db, col, id);
        return await updateDoc(itemRef, data);
    },

    deleteData: async (col, id) => {
        const itemRef = doc(Db, col, id);
        return await deleteDoc(itemRef);
    },

    search: async (col, field, keyword) => {
        const q = query(collection(Db, col), where(field, '==', keyword));
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return results;
    }
}

export default CrudFunction