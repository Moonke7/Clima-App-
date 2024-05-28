import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, LogBox } from "react-native";
import { icons } from "../Icons/IconsJson";

const DayInfo = ({ data, ActualDay}) => {
  if (!data || data.length === 0) {
    return null; // Manejar el caso donde no hay datos
  }
  LogBox.ignoreLogs(['source.uri should not   be an empty string']);

  const [Max, setMax] = useState(-80);
  const [Min, setMin] = useState(100);

  useEffect(() => {
    const setMaxMin = () => {
      let newMax = -80;
      let newMin = 100;

      data.forEach((item) => {
        const itemDate = item.dt_txt.substring(0, 10);
        if (itemDate === ActualDay) {
          const Maxima = parseFloat(item.main.temp_max);
          const Minima = parseFloat(item.main.temp_min);
          if (Maxima > newMax) {
            newMax = Maxima;
          }
          if (Minima < newMin) {
            newMin = Minima;
          }
        }
      });

      setMax(newMax);
      setMin(newMin);
    };

    setMaxMin();
  }, [data, ActualDay]);
  
  const toggleIcon = (e) => {
    if (e === "Rain") {
      return 1;
    } else if (e === "Clear") {
      return 2;
    } else if (e === "Clouds") {
      return 3;
    } else {
      return 0; // Default case
    }
  };

  const HourCorrection = (dateString) => {
    const date = new Date(dateString);
    if (date.toTimeString().substring(0, 8) === "03:00:00") {
      date.setHours(date.getHours() - 3);
      return date.toTimeString().substring(0, 5);
    }
    if (date.toTimeString().substring(0, 8) === "00:00:00") {
      return null;
    }
    date.setHours(date.getHours() - 4);
    return date.toTimeString().substring(0, 5); // Obtén la hora corregida
  };

  return (
    <View style={styles.info__container}>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignSelf: "start",
          paddingVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.min}>
          Min: {Min.toFixed(1).toString().substring(0, 2)}C°
        </Text>
        <Text style={styles.max}>
          Max: {Max.toFixed(1).toString().substring(0, 2)}C°
        </Text>
      </View>
      {data.map((list) =>
        list.dt_txt.substring(0, 10) === ActualDay &&
        HourCorrection(list.dt_txt) != null ? (
          <View key={list.dt} style={styles.hour__container}>
            <Text style={styles.hour}>{HourCorrection(list.dt_txt)}</Text>
            <View style={styles.info}>
              {<Image source={{ uri: icons[0].rain }} style={styles.icons} />}
              <Text>{list.pop}%</Text>
            </View>
            <View style={styles.info}>
              {<Image source={{ uri: icons[0].wind }} style={styles.icons} />}
              <Text>
                {(list.wind.speed * 3.6).toFixed(1).toString().substring(0, 3)}{" "}
                Km/h
              </Text>
            </View>
            <View style={styles.info}>
              {
                <Image
                  source={{ uri: icons[0].humidity }}
                  style={styles.icons}
                />
              }
              <Text>{list.main.humidity}%</Text>
            </View>
            <View style={styles.info}>
              <Image
                style={styles.icons}
                source={{ uri: icons[toggleIcon(list.weather[0].main)].src }}
              />
              <Text style={styles.temp}>{list.main.temp}°</Text>
            </View>
          </View>
        ) : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  info__container: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "#000", // Color del borde
    width: "95%",
  },
  hour__container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 30,
    borderTopWidth: 1,
    borderColor: "#888",
  },
  hour: {
    marginRight: 60,
    color: "#152a56",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 7,
  },
  icons: {
    width: 16,
    height: 16,
  },
  max: {
    fontSize: 18,
    color: "#ff5757",
  },
  min: {
    fontSize: 18,
    color: "#1f76f1",
  },
});

export default DayInfo;
