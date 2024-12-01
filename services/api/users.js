import sql from './connection';

export const saveUserDb = async (clerkId, name, email) => {
  try {
    const response = await sql`
      INSERT INTO users (clerk_id, name, email)
      VALUES (${clerkId}, ${name}, ${email})
      ON CONFLICT (clerk_id) DO NOTHING;
    `;
    return response;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

export const getUserDb = async (email) => {
  try {
    const response = await sql`
      SELECT * FROM users WHERE email=${email};
    `;
    return response[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};