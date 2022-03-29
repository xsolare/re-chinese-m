import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useTypesSelector } from "../hooks/store/useTypesSelector";

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const dispatch = useDispatch();

  const { currentWord } = useTypesSelector((store) => store.words);

  const [res, useRes] = useState([{ id: "nice" }]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/index")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log("json", json[0]);

  //       useRes(json);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {res.map((x: any) => {
          return <Text key={x.id}> {x.id} </Text>;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
