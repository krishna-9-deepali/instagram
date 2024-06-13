import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("user account ", userAccount);
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      // return await this.account.createEmailSession(email, password);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null; //in case if  catch block excuted then return null instesd of throw something error.
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
  async getUsers() {
    try {
      // return await this.account.createEmailSession(email, password);
      return await this.account.listIdentities();
    } catch (error) {
      throw error;
    }
  }
}
const authservice = new Authservice();
export default authservice;
