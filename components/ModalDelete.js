import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ModalDelete = ({
  title,
  icon,
  onClose,
  subtitle = false,
  label,
  onDelete,
}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#ff7f00" />
        </TouchableOpacity>
        <MaterialIcons name={icon} size={48} color="#ff7f00" />
        <Text style={styles.modalTitle}>{title}</Text>
        {subtitle && <Text style={styles.modalSubtitle}>{subtitle}</Text>}
        <Text style={styles.deleteWarningText}>{label}</Text>
        <TouchableOpacity style={styles.deleteConfirmButton} onPress={onDelete}>
          <Text style={styles.deleteConfirmButtonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff7f00",
    marginVertical: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  deleteModalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },
  deleteWarningText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  deleteConfirmButton: {
    backgroundColor: "#ff0000",
    padding: 12,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  deleteConfirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
  },
});

export default ModalDelete;