import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";

type loginProps = {
    showScreen : ()=> void;
}

export default function RegisterPage({showScreen}: loginProps) {

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  const nextStep = () => {

    if (step === 1 && (!email.includes("@") || password.length < 8)) {
       Alert.alert("Error", "Please enter a valid email and 8+ character password.");
      return;
    }
    if (step === 2 && phone.trim().length < 8) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async () => {
    if (fullName.trim() === "") {
      Alert.alert("Error", "Please enter your full name.");
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stepIndicator}>Step {step} of 3</Text>

      {step === 1 && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Create your login credentials</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password (Min 6 Characters)"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>What is your phone number?</Text>
          <TextInput
            style={styles.input}
            placeholder="+(1)000-000-0000"
            placeholderTextColor="#94a3b8"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      )}

      {/* STEP 3: Personal Details */}
      {step === 3 && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Finally, tell us your full name</Text>
          <TextInput
            style={styles.input}
            placeholder="First and Last Name"
            placeholderTextColor="#94a3b8"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      )}

      <View style={styles.buttonRow}>
        {step > 1 && (
          <Pressable style={[styles.button, styles.backButton]} onPress={prevStep}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        )}

        {step < 3 ? (
          <Pressable style={[styles.button, styles.nextButton]} onPress={nextStep}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.button, styles.submitButton]} onPress={handleFinalSubmit}>
            <Text style={styles.buttonText}>Submit Form</Text>
          </Pressable>
        )}
      </View>

      <Pressable onPress={showScreen}>
                      <Text style={styles.registerText}>Have an account? Log In</Text>
                  </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
        justifyContent:"center", 
        padding:30,
        borderRadius: 8,
    },
  stepIndicator: { 
    fontSize: 14, 
    fontWeight: "600", 
    color: "#64748b", 
    textTransform: "uppercase", 
    letterSpacing: 1, 
    marginBottom: 12 },
  formContainer: {
     minHeight: 180 },
  label: { 
    fontSize: 18, 
    fontWeight: "500", 
    marginBottom: 16 
   },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#ffffff",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
    buttonRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginTop: 16 },
    button: { flex: 1, height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center" },
    nextButton: { backgroundColor: "#3b82f6" },
    submitButton: { backgroundColor: "#10b981" }, 
    backButton: { backgroundColor: "#cbd5e1" },
    buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
    backButtonText: { color: "#334155", fontSize: 16, fontWeight: "600" },
    registerText : {
        marginTop: 20,
        fontSize: 14,
        textAlign:"center",
        color: "blue",
        fontWeight: "bold"
    }
});
