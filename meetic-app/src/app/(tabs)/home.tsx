import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Import hooks for native tracking
import { useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // Grabs the exact pixel height of the top notch/bar
    
    return (
        <View style={styles.container}>
            {/* Custom Spacer Box: Adds the native status bar height PLUS extra custom padding */}
            <View style={[
                styles.customTopSpacer, 
                { paddingTop: insets.top + 50 } // Increase '20' to expand the top spacing as much as you like
            ]}>
                <Text style={styles.headerSpacerText}>Meetic Connected</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Welcome Home!</Text>
                
                <Pressable style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </Pressable>
            </View>
            
            <StatusBar style="dark" /> 
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customTopSpacer: {
    backgroundColor: '#f1f5f9', // Light gray banner color to anchor the top space
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerSpacerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});
