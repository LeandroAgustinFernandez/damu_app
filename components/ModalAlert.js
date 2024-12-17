import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ModalStyles } from "../styles";

const ModalAlert = ({
  visible,
  onClose,
  message,
  iconName = "person",
  iconColor = "#ff7f00",
  iconStatus = "check-circle",
  iconStatusColor = "#4CAF50",
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={ModalStyles.modalContainer}>
        <View style={ModalStyles.modalContent}>
          
            <MaterialIcons
              name={iconName}
              size={80}
              color={iconColor}
              style={ModalStyles.icon}
            />
            <MaterialIcons
              name={iconStatus}
              size={40}
              color={iconStatusColor}
              style={ModalStyles.iconStatus}
            />
          <Text style={ModalStyles.messageText}>{message}</Text>
          <TouchableOpacity style={[ModalStyles.button, ModalStyles.closeAlertButton]} onPress={onClose}>
            <Text style={ModalStyles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
