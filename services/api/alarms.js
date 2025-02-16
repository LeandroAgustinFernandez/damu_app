import sql from './connection';

export const getAlarms = async (userId) => {
  try {
    const response = await sql`
      SELECT a.id, a.medication, a.dose, a.dose_type, a.schedule
      FROM alarms a
      WHERE a.user_id = ${userId}
      ORDER BY a.id ASC;
    `;
    return response;
  } catch (error) {
    console.error("Error fetching alarms:", error);
    throw error;
  }
};

export const saveAlarm = async (data) => {
  try {
    const result = await sql`
      INSERT INTO alarms (user_id, medication, dose, dose_type, schedule)
      VALUES (${data.user_id}, ${data.medication}, ${data.dose}, ${data.dose_type}, ${data.schedule})
    `;
    return result;
  } catch (error) {
    console.error("Error saving alarm:", error);
    return false;
  }
};

export const updateAlarm = async (alarmId, updatedData) => {
  try {
    const result = await sql`
      UPDATE alarms
      SET 
        medication = ${updatedData.medication},
        dose = ${updatedData.dose},
        dose_type = ${updatedData.dose_type},
        schedule = ${updatedData.schedule}
      WHERE id = ${alarmId}
    `;
    return result;
  } catch (error) {
    console.error("Error updating alarm:", error);
    return false;
  }
};

export const deleteAlarm = async (alarmId) => {
  try {
    await sql`DELETE FROM alarms WHERE id = ${alarmId}`;
    return true;
  } catch (error) {
    console.error("Error deleting alarm:", error);
    throw error;
  }
};
