import { db } from "../../db/index.ts";
import { user } from "../../db/schema/user.ts";
import type { UserInsertData } from "../../db/schema/user.ts";
import { eq } from "drizzle-orm";

export class UserRepository {
  async findByEmail(email: string) {
    const [userRecord] = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    return userRecord || null;
  }

  async registerUser(UserData:UserInsertData){
    const [userRegister]= await db.insert(user).values(UserData).returning()
    return userRegister || null 
  }
}


export const userRepository= new UserRepository()