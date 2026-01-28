import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private dbPath = path.resolve(process.cwd(), 'db.json');
  private data: { [key: string]: any[] } = {
    user: [],
    program: [],
    module: [],
    lesson: [],
    event: [],
    meetingLink: [],
  };

  async onModuleInit() {
    console.log('JSON DB: Initializing...');
    if (fs.existsSync(this.dbPath)) {
      const content = fs.readFileSync(this.dbPath, 'utf8');
      if (content) {
        this.data = JSON.parse(content);
      }
    } else {
      this.save();
    }
    console.log(`JSON DB: Ready. Path: ${this.dbPath}`);
    console.log(`JSON DB: Users loaded: ${this.data.user.length}`);
  }

  async onModuleDestroy() {
    this.save();
  }

  private save() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }

  // --- Helpers ---
  private generateId(collection: any[]) {
    return collection.length > 0 ? Math.max(...collection.map(i => i.id)) + 1 : 1;
  }

  // --- Model Proxies ---

  public user = {
    findUnique: async (args) => {
      return this.data.user.find(u => 
        (args.where.email && u.email === args.where.email) ||
        (args.where.username && u.username === args.where.username) ||
        (args.where.id && u.id === args.where.id)
      ) || null;
    },
    findFirst: async (args) => {
       if (args.where.OR) {
           for (const cond of args.where.OR) {
               const found = this.data.user.find(u => 
                   (cond.email && u.email === cond.email) || 
                   (cond.username && u.username === cond.username)
               );
               if (found) return found;
           }
       }
       return this.data.user[0] || null; // simplified
    },
    create: async (args) => {
      const newItem = { id: this.generateId(this.data.user), ...args.data, createdAt: new Date(), updatedAt: new Date() };
      this.data.user.push(newItem);
      this.save();
      return newItem;
    },
    findMany: async () => this.data.user,
  };

  public program = {
    findMany: async () => this.data.program,
    findUnique: async (args) => this.data.program.find(p => p.id === args.where.id) || null,
    create: async (args) => {
         const newItem = { id: this.generateId(this.data.program), ...args.data };
         this.data.program.push(newItem);
         this.save();
         return newItem;
    }
  };
  
  public module = { findMany: async () => [], findUnique: async () => null, create: async() => null };
  public lesson = { findMany: async () => [], findUnique: async () => null, create: async() => null };
  // Add others as needed
}
