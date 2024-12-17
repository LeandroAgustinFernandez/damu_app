import sql from './connection';

export const getDoctors = async (userId) => {
  try {
    const response = await sql`
      SELECT d.id, d.name, d.surname, d.phone, d.address, d.attention_day, d.schedule, s.name as speciality, s.id as speciality_id, d.additionale_info
      FROM doctors d
      JOIN medical_specialities s ON d.speciality_id = s.id
      WHERE d.user_id = ${userId}
      ORDER BY d.id ASC;
    `;
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
      VALUES (${data.user_id}, ${data.name}, ${data.surname}, ${data.phone}, ${data.address}, ${data.speciality_id}, ${data.attention_days}, ${data.schedule}, ${data.additional_info})
    `;
    return result;
  } catch (error) {
    console.error("Error saving doctor:", error);
    return false
  }
}

export const updateDoctor = async (doctorId, updatedData) => {
  try {
    const result = await sql`
      UPDATE doctors
      SET 
        name = ${updatedData.name},
        surname = ${updatedData.surname},
        phone = ${updatedData.phone},
        address = ${updatedData.address},
        speciality_id = ${updatedData.speciality_id},
        attention_day = ${updatedData.attention_days},
        schedule = ${updatedData.schedule}
      WHERE id = ${doctorId}
    `;
    return result;
  } catch (error) {
    console.error("Error updating doctor:", error);
    return false
    // throw error;
  }
};

export const deleteDoctor = async (doctorId) => {
  try {
    await sql`DELETE FROM doctors WHERE id = ${doctorId}`;
    return true;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};
