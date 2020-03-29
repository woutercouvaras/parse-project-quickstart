import { helloFromCloud, deleteUser } from "./service";

Parse.Cloud.define("helloFromTheCloud", helloFromCloud);
Parse.Cloud.define("deleteUser", deleteUser);
