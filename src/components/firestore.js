import { initializeApp } from 'firebase/app'
import { getFirestore, writeBatch, doc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAPJGF_GCAp5dOUa4TAAqsBMl7tyqvbDbQ',
  authDomain: 'la-duree-est-ecoulee-2.firebaseapp.com',
  projectId: 'la-duree-est-ecoulee-2',
  storageBucket: 'la-duree-est-ecoulee-2.appspot.com',
  messagingSenderId: '340354158542',
  appId: '1:340354158542:web:7189cdcf604088b0d3259f'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

/**
 * Send words to the firestore database
 * @param {string[]} words to send
 */
export const addWordsToDB = async (words) => {
  const batch = writeBatch(db)
  words.forEach((word) => {
    const wordRef = doc(db, 'word-ideas', word)
    batch.set(wordRef, {})
  })
  await batch.commit()
}
