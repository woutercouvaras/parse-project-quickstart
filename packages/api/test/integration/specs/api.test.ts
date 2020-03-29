import Parse from "parse/node";
import { ParseModels, Customer } from "@project/model";
import * as config from "../../../configuration";

beforeAll(() => {
    ParseModels.map(m => Parse.Object.registerSubclass(m.subclassName, m.class));
    Parse.initialize(config.parse.appId);
    (Parse as any).serverURL = config.parse.serverUrl;
});

describe("API Integration Tests", () => {
    test("User CRUD", async () => {
        expect.assertions(12);

        //
        // A: Confirm user does not exist
        // Find user by query, should return empty if no user found
        //
        const queryA = new Parse.Query(Customer);
        queryA.equalTo("username", "INVALID_USERNAME");

        const userListA = await queryA.find();
        expect(userListA.length).toEqual(0);

        //
        // B: Create user
        // Use the signup method on user to create new user
        //
        const customerB = new Parse.User({
            name: "Joe",
            surname: "Soap"
        });

        customerB.setUsername("joe");
        customerB.setPassword("blah");

        const userB = await customerB.signUp();
        expect(userB.id).toBeDefined();

        const USER_ID = userB.id;

        //
        // C: Confirm user exists - method 1
        // Fetch user by ID, should return valid user
        //
        const queryC = new Parse.Query(Customer);
        const userC = await queryC.get(USER_ID);

        expect(userC.id).toEqual(USER_ID);
        expect(userC.get("name")).toEqual("Joe");
        expect(userC.get("surname")).toEqual("Soap");

        //
        // D: Confirm user exists - method 2
        // Find user by query, should return result with 1 match
        //
        const queryD = new Parse.Query(Customer);
        queryD.equalTo("username", "joe");

        const userListD = await queryD.find();
        expect(userListD.length).toEqual(1);

        //
        // E: Call a cloud function
        // Find user by query, should return result with 1 match
        //
        const responseE = await Parse.Cloud.run("helloFromTheCloud");
        expect(responseE.data).toEqual("Hello from the cloud");

        //
        // F: Should not be able to register user with same username
        //
        const customerF = new Parse.User({
            name: "Joe",
            surname: "Soap"
        });

        customerF.setUsername("joe");
        customerF.setPassword("blah");

        try {
            await customerF.signUp();
        } catch (e) {
            expect(e.message).toEqual("Account already exists for this username.");
            expect(e.code).toEqual(202);
        }

        //
        // G: Delete user
        // For the unit test we have to use a cloud function in order to delete a user. By default,
        // only a logged in user can remove their own record, and one cannot easily perform a valid login
        // for a user in NodeJS environment. The only way is to use a cloud function, because they
        // support the option { useMasterKey: true }, which gives the privilege to delete user record.
        //
        const responseG = await Parse.Cloud.run("deleteUser", { userId: USER_ID });
        expect(responseG.data).toEqual(USER_ID);

        //
        // H: Confirm user does not exist
        // Fetch user by ID, should throw error if user ID does not exist
        //
        try {
            const queryH = new Parse.Query(Customer);
            await queryH.get(USER_ID);
        } catch (e) {
            expect(e.message).toEqual("Object not found.");
            expect(e.code).toEqual(101);
        }
    });
});
