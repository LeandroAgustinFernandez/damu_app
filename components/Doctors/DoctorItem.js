import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { ItemStyles } from "../../styles";

const Doctor = ({ item, handlePress }) => (
  <TouchableOpacity style={ItemStyles.card} onPress={() => handlePress(item)}>
    <View style={ItemStyles.cardContent}>
      <MaterialIcons name="person" size={32} color="#ff7f00" />
      <Text style={ItemStyles.name}>
        {item.speciality}: {item.name} {item.surname}
      </Text>
    </View>
  </TouchableOpacity>
);


export default Doctor