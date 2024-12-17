import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { ModalStyles } from "../styles";

const ModalDelete = ({
  title,
  icon,
  onClose,
  subtitle = false,
  label,
  onDelete,
}) => {
  return (
    <View style={ModalStyles.modalContainer}>
      <View style={ModalStyles.modalContent}>
        <TouchableOpacity onPress={onClose} style={ModalStyles.closeButton}>
          <MaterialIcons name="close" size={24} color="#ff7f00" />
        </TouchableOpacity>
        <MaterialIcons name={icon} size={80} color="#ff7f00" />
        <Text style={ModalStyles.modalTitle}>{title}</Text>
        {subtitle && <Text style={ModalStyles.modalSubtitle}>{subtitle}</Text>}
        <Text style={ModalStyles.deleteWarningText}>{label}</Text>
        <TouchableOpacity style={[ModalStyles.deleteConfirmButton, ModalStyles.button]} onPress={onDelete}>
          <Text style={ModalStyles.deleteConfirmButtonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ModalStyles.cancelButton, ModalStyles.button]} onPress={onClose}>
          <Text style={ModalStyles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalDelete;
