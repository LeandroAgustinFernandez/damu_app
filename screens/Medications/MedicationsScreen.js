import React, { useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { deleteMedications, getMedicationsByUserId } from "../../services/api";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const MedicationsScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchMedications();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchMedications();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchMedications = async () => {
    try {
      setLoading(true);
      const userMedications = await getMedicationsByUserId(user.user_id);
      setMedications(userMedications);
    } catch (error) {
      console.error("Error fetching medications:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (medication) => {
    setSelectedMedication(medication);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMedication(null);
  };

  const openDeleteModal = () => {
    setdeleteModal(true);
  };

  const closeDeleteModal = () => {
    setdeleteModal(false);
  };

  const handleDeleteMedications = async () => {
    try {
      await deleteMedications(selectedMedication.id);
      setMedications(medications.filter((medication) => medication.id !== selectedMedication.id));
      setdeleteModal(false);
      closeModal();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleEditMedication = () => {
    closeModal();
    navigation.navigate("MedicationsForm", { medication: selectedMedication });
  };

  const renderMedication = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <View style={styles.cardContent}>
        <MaterialIcons name="medication" size={24} color="#ff7f00" />
        <View style={styles.medicationDetails}>
          <Text style={styles.name}>
            {item.name} {item.dose}
          </Text>
          <Text style={styles.info}>Tipo: {item.dose_type}</Text>
          <Text style={styles.info}>
            Frecuencia: {item.frequency.join(", ")}
          </Text>
          <Text style={styles.info}>Horario: {item.schedule}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Medicación"
        onClose={() => navigation.goBack()}
        bgColor="#F7931E"
      />
      {loading ? (
        <Text style={styles.loading}>Cargando medicación...</Text>
      ) : medications.length === 0 ? (
        <Text style={styles.noMedications}>
          No hay medicamentos registrados.
        </Text>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMedication}
          style={styles.list}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("MedicationsForm")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selectedMedication && (
        <Modal
          transparent={true}
          animationType="none"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {deleteModal ? (
            <View style={styles.modalContainer}>
              <View style={styles.deleteModalContent}>
                <TouchableOpacity
                  onPress={closeDeleteModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#ff7f00" />
                </TouchableOpacity>
                <MaterialIcons name="medication" size={24} color="#ff7f00" />
                <Text style={styles.modalName}>{selectedMedication.name}</Text>
                <Text style={styles.deleteWarningText}>
                  ¿Desea eliminar este medicamento?
                </Text>
                <TouchableOpacity
                  style={styles.deleteConfirmButton}
                  onPress={handleDeleteMedications}
                >
                  <Text style={styles.deleteConfirmButtonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closeDeleteModal}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#ff7f00" />
                </TouchableOpacity>
                <MaterialIcons name="medication" size={48} color="#ff7f00" />
                <Text style={styles.modalName}>{selectedMedication.name}</Text>
                <Text style={styles.modalInfo}>
                  Dosis: {selectedMedication.dose}
                </Text>
                <Text style={styles.modalInfo}>
                  Tipo: {selectedMedication.dose_type}
                </Text>
                <Text style={styles.modalInfo}>
                  Frecuencia: {selectedMedication.frequency.join(", ")}
                </Text>
                <Text style={styles.modalInfo}>
                  Horario: {selectedMedication.schedule}
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditMedication}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => openDeleteModal()}
                >
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  list: {
    padding: 16,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  noMedications: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  medicationDetails: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff7f00",
  },
  info: {
    fontSize: 14,
    color: "#333",
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff7f00",
    elevation: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#ff7f00",
    fontSize: 36,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
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
  modalName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff7f00",
    marginVertical: 5,
  },
  modalInfo: {
    fontSize: 18,
    marginVertical: 5,
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
  deleteButtonText: {
    color: "#ff7f00",
    fontSize: 18,
  },
  deleteModalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },
  deleteIconOverlay: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#ff0000",
    borderRadius: 50,
    padding: 5,
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

export default MedicationsScreen;
