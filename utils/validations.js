export const validateField = (field, value) => {
  let error = "";
  if (field === "phone" || field === "address") {
    if (!value) return "";
  }
  switch (field) {
    case "name":
    case "surname":
    case "doctor_name":
    case "medication":
    case "dose_type":
    case "type":
      if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value)) {
        error = "Ingrese solo letras y espacios.";
      }
      break;
    case "dose":
    case "dosage":
      if (!/^[A-Za-z0-9\s]+$/.test(value)) {
        error = "Ingrese solo letras, números y espacios.";
      }
      break;
    case "frequency":
      if (value.length === 0) error = "Seleccione al menos un día.";
      break;
    case "schedule":
      if (!/^\d{2}:\d{2}(\s?-\s?\d{2}:\d{2})*$/.test(value)) {
        error = "Formato inválido (Ej: HH:MM - HH:MM)";
      }
      break;
    case "phone":
      if (!/^[0-9-]+$/.test(value)) {
        error = "Ingrese solo números y guiones.";
      }
      break;
    case "address":
    case "additional_info":
      if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ., ]+$/.test(value)) {
        error = "Existen caracteres que no son válidos.";
      }
      break;
    case "speciality_id":
      if (!value) error = "Seleccione una especialidad.";
      break;
    case "attention_days":
      if (value.length === 0) error = "Seleccione al menos un día.";
      break;
    case "file":
      if (!value) {
        errorMsg = "Es necesario cargar un archivo.";
      }
      break;
    default:
      break;
  }

  return error;
};
