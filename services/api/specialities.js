import sql from "./connection";

export const getSpecialties = async () => {
  try {
    const result = await sql`SELECT id, name FROM medical_specialities;`;
    return result;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};
