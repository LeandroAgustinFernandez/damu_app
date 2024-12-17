import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { UserContext } from "../../context/UserContext";
import { getStudies, deleteStudy } from "../../services";
import { Header, Study, ModalDelete, ModalShow } from "../../components";
import { ScreenStyles } from "../../styles";

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
    <SafeAreaView style={ScreenStyles.container}>
      <Header
        title="Estudios Médicos"
        onClose={() => navigation.goBack()}
        bgColor="#F7931E"
      />
      {loading ? (
        <Text style={ScreenStyles.loading}>Cargando estudios...</Text>
      ) : studies.length === 0 ? (
        <Text style={ScreenStyles.noItems}>No hay estudios registrados.</Text>
      ) : (
        <FlatList
          data={studies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Study item={item} handlePress={openModal} />
          )}
          style={ScreenStyles.list}
        />
      )}
      <TouchableOpacity
        style={ScreenStyles.addButton}
        onPress={() => navigation.navigate("StudiesForm")}
      >
        <Text style={ScreenStyles.addButtonText}>+</Text>
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
              icon="assignment"
              onClose={closeDeleteModal}
              label="¿Desea eliminar este estudio?"
              onDelete={handleDeleteStudy}
            />
          ) : (
            <ModalShow
              title={selectedStudy.name}
              icon="assignment"
              onClose={closeModal}
              data={{
                "Indicado por": selectedStudy.doctor_name,
                Archivo: selectedStudy.file_name
              }}
              onEdit={handleEditStudy}
              onDelete={openDeleteModal}
              subtitle={selectedStudy.date.toLocaleDateString()}
              file={{uri: selectedStudy.file_url, name: selectedStudy.file_name}}
            />
          )}
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default StudiesScreen;
