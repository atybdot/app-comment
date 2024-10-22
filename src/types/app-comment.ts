export type user = {
	email: string;
	password: string;
};
export type createUser = user & {
	name: string;
	userId: string;
};
export type allUserParams = {
	query?: Array<string>;
	search?: string;
};

export type document = {
	databaseId: string | undefined;
	collectionId: string | undefined;
};

export type createDoc = document & {
	data: object;
	userId: string;
};
export type listDocs = document & {
	query?: Array<string>;
};
export type documentId = document & {
	documentId: string;
};
export type updateDoc = document & documentId & createDoc;

export type attribute = document & {
	options: options;
};

export type options = {
	name: string;
	type: string;
	isRequired: boolean;
	isArray: boolean;
};
export type stringOpt = attribute & {
	options: options & {
		defaultValue: string;
		size?: number;
		isEncrypted?: boolean;
	};
};

export type boolOpt = attribute & {
	options: options & {
		defaultValue?: boolean;
	};
};
export type IntergerOpt = attribute & {
	options: options & {
		defaultValue: number;
		minValue: number | 0;
		maxValue: number | 1000;
	};
};
