import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { UserContext } from "../../context/UserContext";
import { getStudies, deleteStudy } from "../../services/api";
import { Header, Study, ModalDelete, ModalShow } from "../../components";

const StudiesScreen = ({ navigation }) => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) fetchStudies();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (user) fetchStudies();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchStudies = async () => {
    try {
      setLoading(true);
      const userStudies = await getStudies(user.user_id);
      setStudies(userStudies);
    } catch (error) {
      console.error("Error fetching studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (study) => {
    setSelectedStudy(study);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStudy(null);
  };

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const handleDeleteStudy = async () => {
    try {
      await deleteStudy(selectedStudy.id);
      setStudies(
        studies.filter((study) => study.id !== selectedStudy.id)
      );
      setDeleteModal(false);
      closeModal();
    } catch (error) {
      console.error("Error deleting study:", error);
    }
  };

  const handleEditStudy = () => {
    closeModal();
    navigation.navigate("StudiesForm", { study: selectedStudy });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Estudios Médicos"
        onClose={() => navigation.goBack()}
        bgColor="#F7931E"
      />
      {loading ? (
        <Text style={styles.loading}>Cargando estudios...</Text>
      ) : studies.length === 0 ? (
        <Text style={styles.noStudies}>No hay estudios registrados.</Text>
      ) : (
        <FlatList
          data={studies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Study item={item} handlePress={openModal} />
          )}
          style={styles.list}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("StudiesForm")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selectedStudy && (
        <Modal
          transparent={true}
          animationType="none"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {deleteModal ? (
            <ModalDelete
              title={selectedStudy.name}
              icon="file-medical"
              onClose={closeDeleteModal}
              label="¿Desea eliminar este estudio?"
              onDelete={handleDeleteStudy}
            />
          ) : (
            <ModalShow
              title={selectedStudy.name}
              icon="file-medical"
              onClose={closeModal}
              data={{
                Fecha: selectedStudy.date,
                Tipo: selectedStudy.type,
                Descripción: selectedStudy.description,
              }}
              onEdit={handleEditStudy}
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
  noStudies: {
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

export default StudiesScreen;
