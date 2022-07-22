import React, { FunctionComponent, useState } from "react";
import { StyleSheet, Text, View, Modal as DefaultModal } from "react-native";
import PressableText from "./PressableText";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
};
const Modal = ({ activator: Activator }: ModalProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <DefaultModal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.centerView}>
          <Text>Modal</Text>
          <PressableText text="Close" onPress={() => setModalVisible(false)} />
        </View>
      </DefaultModal>
      {Activator ? (
        <Activator handleOpen={() => setModalVisible(true)} />
      ) : (
        <PressableText text="Open" onPress={() => setModalVisible(true)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Modal;
