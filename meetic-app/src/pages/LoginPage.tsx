import { useState } from "react";
import { View , Text, Pressable, TextInput, StyleSheet} from "react-native";

type loginProps = {
    showScreen : ()=> void;
}

export default function LoginPage({showScreen} : loginProps){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <View style={styles.container}>
            <Text  style={styles.title}>Welcome Meettick !</Text>
        
            <View>
                <View>
                    <Text  style={styles.textStyle}>E-Mail</Text>
                    <TextInput 
                        placeholder="Email"
                        placeholderTextColor="#94a3b8"
                        value = {email}
                        onChangeText={(text) =>setEmail(text)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.inputStyle}
                    />
                </View>
                <View>
                    <Text  style={styles.textStyle}>Password</Text>
                    <TextInput 
                        placeholder="***********"
                        placeholderTextColor="#94a3b8"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.inputStyle}

                    />
                </View>
            </View>
            <Pressable onPress={showScreen} style = {styles.buttonCont}>
                <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <Pressable onPress={showScreen}>
                <Text style={styles.registerText}>Have an account? Register</Text>
            </Pressable>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent:"center", 
        borderWidth: 1,
        padding:30,
        borderRadius: 8,
    },
    title:{
        fontWeight : "800",
        letterSpacing : 0.8,
        fontSize : 20,
        marginBottom : 20,
        padding:10
    },
    textStyle :{
        fontWeight: "bold"
    },
    inputStyle : {
        height: 50,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: "#ffffff",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    buttonText:{
        textAlign : "center",
        color :"white",
        fontWeight: "bold",
        letterSpacing: 0.7
    },
    buttonCont : {
        backgroundColor : "blue",
        padding: 6,
        borderWidth : 1,
        borderRadius: 6,
        marginTop: 5
    },
    registerText : {
        marginTop: 20,
        fontSize: 14,
        textAlign:"center",
        color: "blue",
        fontWeight: "bold"
    }
});