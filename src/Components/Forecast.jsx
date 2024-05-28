import React from "react";
import { Image, TouchableOpacity, StyleSheet, Text, View, TouchableHighlight, Pressable } from "react-native";
import DayInfo from "./DayInfo";
import { useState, useEffect } from "react";
import { icons } from "../Icons/IconsJson";

const Forecast = ({ data, ActualDay }) => {
    const [hidden, setHidden] = useState(true);
    const [arrow, setArrow] = useState(icons[0].down_arrow)

    
    const toggleHidden = () => {
      setHidden(!hidden);
      hidden == true ? setArrow(icons[0].left_arrow): setArrow(icons[0].down_arrow)
    };

  let contador = 0;
  let media = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].dt_txt.substring(0, 10) == ActualDay) {
      break; // Rompe el bucle
    }
    contador++;
  }

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].dt_txt.substring(11, 20) == "18:00:00" &&
      data[i].dt_txt.substring(0, 10) == ActualDay
    ) {
      break; // Rompe el bucle
    } else if (
      data[i].dt_txt.substring(11, 20) == "21:00:00" &&
      data[i].dt_txt.substring(0, 10) == ActualDay
    ) {
      break;
    }
    media++;
  }

  //MAX, MIN E ICONOS
  const [icon, setIcon] = useState(0);

  const [Max, setMax] = useState(-80);
  const [Min, setMin] = useState(100);

  useEffect(() => {
    const setMaxMin = () => {
      data.forEach((item) => {
        const itemDate = item.dt_txt.substring(0, 10);
        if (itemDate === ActualDay) {
          const Maxima = parseFloat(item.main.temp_max);
          const Minima = parseFloat(item.main.temp_min);
          if (Maxima > Max) {
            setMax(Maxima);
          }
          if (Minima < Min) {
            setMin(Minima);
          }
        }
      });
    };

    const toggleIcon = () => {
      data[media].weather[0].main == "Rain" ? setIcon(1) : "";
      data[media].weather[0].main == "Clear" ? setIcon(2) : "";
      data[media].weather[0].main == "Clouds" ? setIcon(3) : "";
    };

    setMaxMin();
    toggleIcon();
  }, [data, Max, Min, ActualDay]);

  const getDayOfWeek = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Crear objeto Date

    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    return daysOfWeek[date.getDay()]; // Obtener el día de la semana
  };

  const Today = getDayOfWeek(ActualDay);

  return (
    <View>
      <View style={styles.header__container}>
        <Text style={styles.date}>{Today}</Text>
        <View style={styles.info__container}>
          <View style={styles.maxMin}>
            <Text style={styles.max}>
              {Max.toFixed(1).toString().substring(0, 2)}°
            </Text>
            <Text>/</Text>
            <Text style={styles.min}>
              {Min.toFixed(1).toString().substring(0, 2)}°
            </Text>
          </View>
          <Image style={styles.icon} source={{ uri: icons[icon].src }} />
          <TouchableOpacity onPress={toggleHidden}>
            <Image style={styles.arrow} source={{ uri: arrow}} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={hidden ? styles.info__hidden : styles.info__noHidden}>
        <DayInfo data={data} ActualDay={ActualDay}></DayInfo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  header__container: {
    flexDirection: "row",
    alignSelf: "center",
    width: "95%",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  info__container: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    gap: 25,
  },
  date: {
    fontSize: 20,
    color: '#1a4389'
  },
  max: {
    color: "#ff5757",
    fontSize: 15,
  },
  min: {
    fontSize: 15,
    color: "#1f76f1",
  },
  maxMin: {
    flexDirection: "row",
    gap: 2,
  },

  info__hidden: {
    left: 1000,
    opacity: 0,
    position: "absolute",
  },
  info__noHidden: {
    opacity: 1,
    position: "relative",
  },
});

export default Forecast;
