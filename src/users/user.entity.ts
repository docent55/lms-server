import { compare, hash } from 'bcryptjs';

export class UserEntity {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email() {
		return this._email;
	}

	get name() {
		return this._name;
	}

	get password() {
		return this._password;
	}

	public async setPassword(pass: string, salt: number) {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string) {
		return compare(pass, this._password);
	}
}
