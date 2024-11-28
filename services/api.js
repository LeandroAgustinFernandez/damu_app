import Constants from "expo-constants";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${Constants.expoConfig.extra.DATABASE_URL}`);

export async function GET() {
  try {
    const response = await sql`SELECT NOW();`;
    console.log(response[0].now);
  } catch (err) {
    console.error(err);
  }
}

export const saveUserToDatabase = async (clerkId, name, email) => {
  try {
    let response = await sql`
        INSERT INTO users (clerk_id, name, email)
        VALUES (${clerkId},${name},${email})
        ON CONFLICT (clerk_id) DO NOTHING;
        `;
    console.log(response);

    return true;
  } catch (error) {
    console.error("Error saving user:", error);
    return false;
  }
};

export const getUserToDatabase = async (email) => {
  try {
    let response = await sql`
          SELECT * FROM users WHERE email=${email};
          `;
    return response[0];
  } catch (error) {
    console.error("Error saving user:", error);
    return false;
  }
};

export const getDoctorsByUserId = async (userId) => {
  try {
    const response = await sql`
        SELECT d.id, d.name, d.surname, d.phone, s.name as speciality
        FROM doctors d
        JOIN medical_specialities s ON d.speciality_id = s.id
        WHERE d.user_id = ${userId}
      `;

    if (response.length == 0) {
        return response
    }
    return response;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const saveDoctor = async (data) => {
    try {
      const result = await sql`
      INSERT INTO doctors (user_id, name, surname, phone, address, speciality_id, attention_day, schedule, additionale_info)
      VALUES (${data.user_id}, ${data.name}, ${data.surname}, ${data.phone}, ${data.address}, ${data.speciality}, ${data.attention_days}, ${data.schedule}, ${data.additional_info})
    `;
      return result;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  };


  export const getSpecialties = async () => {
    try {
      const result = await sql`SELECT id, name FROM medical_specialities;`;
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  };
  