import * as Parse from "parse";

export class Customer extends Parse.User {
    constructor(attributes) {
        super(attributes);
    }

    getName(): string {
        return this.get("name");
    }

    setName(name: string): boolean | this {
        return this.set("name", name);
    }

    getSurname(): string {
        return this.get("surname");
    }

    setSurname(surname: string): boolean | this {
        return this.set("surname", surname);
    }
}

export interface ParseModelInfo {
    subclassName: string;
    class: any;
}

export const ParseModels: [ParseModelInfo] = [
    {
        subclassName: "_User",
        class: Customer
    }
];
