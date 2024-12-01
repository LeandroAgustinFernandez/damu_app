import sql from './connection';

export const getStudies = async (userId) => {
  try {
    const response = await sql`
      SELECT s.id, s.name, s.date, s.doctor_name, s.file_name, s.additionale_info
      FROM medical_studies s
      WHERE s.user_id = ${userId}
    `;
    return response;
  } catch (error) {
    console.error("Error fetching studies:", error);
    throw error;
  }
};

export const saveStudy = async (data) => {
  try {
    const result = await sql`
      INSERT INTO medical_studies (user_id, name, date, doctor_name, file_name, additionale_info)
      VALUES (${data.user_id}, ${data.name}, ${data.date}, ${data.doctor_name}, ${data.file_name}, ${data.additionale_info})
    `;
    return result;
  } catch (error) {
    console.error("Error saving study:", error);
    throw error;
  }
};

export const updateStudy = async (studyId, updatedData) => {
  try {
    await sql`
      UPDATE medical_studies
      SET 
        name = ${updatedData.name},
        date = ${updatedData.date},
        doctor_name = ${updatedData.doctor_name},
        file_name = ${updatedData.file_name},
        additionale_info = ${updatedData.additionale_info}
      WHERE id = ${studyId}
    `;
    return true;
  } catch (error) {
    console.error("Error updating study:", error);
    throw error;
  }
};

export const deleteStudy = async (studyId) => {
  try {
    await sql`DELETE FROM medical_studies WHERE id = ${studyId}`;
    return true;
  } catch (error) {
    console.error("Error deleting study:", error);
    throw error;
  }
};
