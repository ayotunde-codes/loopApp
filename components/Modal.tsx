import React, { FunctionComponent, ReactNode, useState } from "react";
import { StyleSheet, Text, View, Modal as DefaultModal } from "react-native";
import PressableText from "./PressableText";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
  children: ReactNode;
};
const Modal = ({ activator: Activator, children }: ModalProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <DefaultModal
        visible={isModalVisible}
        // transparent={true}
        animationType="fade"
      >
        <View style={styles.centerView}>
          <View style={styles.content}>{children}</View>
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
  content: {},
});

export default Modal;
