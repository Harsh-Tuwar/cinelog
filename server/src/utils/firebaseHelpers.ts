import { db } from '../firebase';
import { collection } from 'firebase/firestore';

abstract class firebaseHelpers {
	private static getEnvCollection() {
		return process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
	}

	private static getEnvDocId(env: 'prod' | 'dev') {
		if (env === 'prod') {
			return 'P4x6Z94vsu005fHseORo';
		}
		
		return '1iHvd6EfDHXsqv0RZsAe';
	}

	static getCollectionRef(key: string) {
		const envCollection = this.getEnvCollection();
		const envDocId = this.getEnvDocId(envCollection);

		const collectionRef = collection(db, envCollection, envDocId, key);

		return collectionRef;
	}
}

export default firebaseHelpers;
