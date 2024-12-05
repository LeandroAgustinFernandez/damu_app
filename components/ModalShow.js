import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ModalShow = ({
  title,
  icon,
  onClose,
  subtitle = false,
  data,
  onEdit,
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
        {Object.entries(data).map(([key, value]) => (
          <Text key={key} style={styles.modalText}>
            {key}: {value}
          </Text>
        ))}
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete()}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
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
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff7f00",
    marginVertical: 5,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 2,
  },
  editButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  deleteButton: {
    borderColor: "#ff7f00",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#ff7f00",
    fontSize: 18,
  },
});

export default ModalShow;