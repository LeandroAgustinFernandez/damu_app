import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { deleteMedications, getMedications } from "../../services/api";
import { Header, Medication, ModalDelete, ModalShow } from "../../components";

const MedicationsScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) fetchMedications();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (user) fetchMedications();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchMedications = async () => {
    try {
      setLoading(true);
      const userMedications = await getMedications(user.user_id);
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

  const openDeleteModal = () => setdeleteModal(true);
  const closeDeleteModal = () => setdeleteModal(false);

  const handleDeleteMedications = async () => {
    try {
      await deleteMedications(selectedMedication.id);
      setMedications(
        medications.filter(
          (medication) => medication.id !== selectedMedication.id
        )
      );
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
          renderItem={({ item }) => (
            <Medication item={item} handlePress={openModal} />
          )}
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
            <ModalDelete
              title={selectedMedication.name}
              icon="medication"
              onClose={closeDeleteModal}
              label="¿Desea eliminar este medicamento?"
              onDelete={handleDeleteMedications}
            />
          ) : (
            <ModalShow
              title={selectedMedication.name}
              icon="medication"
              onClose={closeModal}
              data={{
                Dosis: selectedMedication.dose,
                Tipo: selectedMedication.dose_type,
                Frecuencia: selectedMedication.frequency.join(", "),
                Horario: selectedMedication.schedule,
              }}
              onEdit={handleEditMedication}
              onDelete={openDeleteModal}
            />
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
});

export default MedicationsScreen;
