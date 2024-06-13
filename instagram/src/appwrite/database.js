import conf from "../conf/conf.js";
import { Client, ID, Databases, Query } from "appwrite";
export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }
  async createPost({ caption, featuredImage, userId, userName }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { caption, featuredImage, userId, userName }
      );
    } catch (error) {
      console.log("Appwrite Service::createPost::error", error);
    }
  }
  async updatePost(postId, { caption, featuredImage, userId, userName }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        { caption, featuredImage, userId, userName }
      );
    } catch (error) {
      console.log("Appwrite Service::updatePost::error", error);
    }
  }
  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service::deletePost::error", error);
      return false;
    }
  }
  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
    } catch (error) {
      console.log("Appwrite Service::getPost::error", error);
      return false;
    }
  }
  async getPosts(queries) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service::getPosts::error", error);
      return false;
    }
  }
}
const dbservice = new Service();
export default dbservice;
