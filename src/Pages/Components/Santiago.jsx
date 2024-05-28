import React from "react";
import { useState, useEffect } from "react"; 
import { View, Text, Image } from "react-native";  
import Footer from "../../Components/Footer";
import LasCondes from "./LasCondesWeather";

const Santiago = () =>{
    const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);

  const lat = "-33.390519239334026";
  const lon = "-70.5061500256685";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const ApiKey = "73bfa95758e39275028ce9f37366bffd";
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setDatos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather(); // Llamada a la función para obtener los datos al montar el componente
  }, []);

  if (loading) {
    return (
      <View >
        <Image style={{width: 200, height: 200}} source={{uri: 'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700'}}/>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 , width: '100%',  backgroundColor: '#f8d6f5', paddingTop: 30}}>
      {datos && datos.list.length > 0 && (
        <LasCondes city={datos.city.name} daylist={datos.list} />
      )}
      <Footer/>
    </View>
  );
}
export default Santiago;