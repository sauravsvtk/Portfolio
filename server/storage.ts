import { users, type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";

/**
 * Storage interface defining all CRUD operations needed for the application
 * This abstraction allows for easy switching between storage implementations (memory, database, etc.)
 */
export interface IStorage {
  // User management methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContact(contact: InsertContact): Promise<Contact>;
}

/**
 * In-memory storage implementation for development and testing
 * Stores all data in memory - data will be lost when server restarts
 */
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
  }

  // User management methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact form methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    console.log(`New contact message received from: ${contact.email}`);
    return contact;
  }
}

export const storage = new MemStorage();
