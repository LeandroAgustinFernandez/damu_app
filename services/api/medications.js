import sql from './connection';

export const getMedications = async (userId) => {
    try {
      const response = await sql`
          SELECT m.id, m.name, m.dose, m.dose_type, m.frequency, m.schedule
          FROM medications m
          WHERE m.user_id = ${userId}
        `;
      return response;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  };

  export const saveMedication = async (data)=> {
    try {
      const result = await sql`
      INSERT INTO medications (user_id, name, dose, dose_type, frequency, schedule)
      VALUES (${data.user_id}, ${data.name}, ${data.dosage}, ${data.type}, ${data.frequency}, ${data.schedule})
    `;
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching medications:", error);
      throw error;
    }
   }
  

  export const updateMedications = async (medicationsId, updatedData) => {
    try {
      await sql`
        UPDATE medications
        SET 
        name = ${updatedData.name},
        dose = ${updatedData.dosage},
        dose_type = ${updatedData.type},
        frequency = ${updatedData.frequency},
        schedule = ${updatedData.schedule}
        WHERE id = ${medicationsId}
      `;
      return true;
    } catch (error) {
      console.error("Error updating medications:", error);
      throw error;
    }
  };

  export const deleteMedications = async (medicationsId) => {
    try {
      await sql`DELETE FROM medications WHERE id = ${medicationsId}`;
      return true;
    } catch (error) {
      console.error("Error deleting medications:", error);
      throw error;
    }
  };