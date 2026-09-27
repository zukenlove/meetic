// Inside your multi-step registration component (Step 2)
import { useState } from "react";
import { View, TextInput, Pressable, Text, Alert } from "react-native";
import { PhoneNumber } from "../domain/value-objects/PhoneNumber";

export default function PhoneStep({ onNext }: { onNext: (phoneVO: PhoneNumber) => void }) {
    const [phoneInput, setPhoneInput] = useState("");

    const handleContinue = () => {
        try {
            // Attempt to instantiate the Value Object
            const validatedPhone = PhoneNumber.create(phoneInput);
            
            // If valid, pass the Value Object up to your form state supervisor
            onNext(validatedPhone);
        } catch (error: any) {
            // Catches formatting errors and presents them gracefully to the user
            Alert.alert("Invalid Input", error.message);
        }
    };

    return (
        <View>
            <TextInput
                value={phoneInput}
                onChangeText={setPhoneInput}
                placeholder="Phone Number (e.g., +1 234 567 890)"
                keyboardType="phone-pad"
            />
            <Pressable onPress={handleContinue}>
                <Text>Continue</Text>
            </Pressable>
        </View>
    );
}
