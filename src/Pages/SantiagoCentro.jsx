import React from "react";
import { useState, useEffect } from "react"; 
import { View, Text, Image } from "react-native";  
import Footer from "../Components/Footer";
import RancaguaWeather from "../Components/RancaguaWeather";
const SantiagoCentro = () =>{
    const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);

  const lat = "-33.449752976287655";
  const lon = "-70.6469945024144";

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
      <View style={{justifyContent: 'center'}}>
        <Image style={{width: 200, height: 200}} source={{uri: 'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700'}}/>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 , width: '100%',  backgroundColor: '#c8ddef', paddingTop: 30}}>
      {datos && datos.list.length > 0 && (
        <RancaguaWeather city={datos.city.name} daylist={datos.list} />
      )}
      <Footer/>
    </View>
  );
}
export default SantiagoCentro;